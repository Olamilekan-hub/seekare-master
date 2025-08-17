const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const lunr = require('lunr');
const Pusher = require('pusher');
const axios = require('axios');

const MapQuestionTag = require('../models/MapQuestionTag');
const Question = require('../models/Question');
const WikiQuestion = require('../models/WikiQuestion');
const User = require('../models/User');
const { JWT_SECRET } = require('../misc/keys');
const UserLikeQuestion = require('../models/UserLikeQuestion');
const Tag = require('../models/Tag');
const SearchQuery = require('../models/SearchQuery');
const QueryKeyword = require('../models/QueryKeyword');

/*
Utils
*/

const openAIKey = process.env.OPENAI_API_KEY;

async function getEmbedding(query) {
  const url = 'https://api.openai.com/v1/embeddings';
  const openai_key = openAIKey;

  let response = await axios.post(
    url,
    {
      input: query,
      model: 'text-embedding-ada-002'
    },
    {
      headers: {
        Authorization: `Bearer ${openai_key}`,
        'Content-Type': 'application/json'
      }
    }
  );

  if (response.status === 200) {
    return response.data.data[0].embedding;
  } else {
    throw new Error(`Failed to get embedding. Status code: ${response.status}`);
  }
}

/**
 * Get Questions
 */

const getUserId = (token) => {
  return new Promise((resolve, reject) => {
    if (token !== null) {
      jwt.verify(token, JWT_SECRET, async (err, user) => {
        if (!err && user && user.id) {
          resolve(user.id);
          return;
        }
        resolve(null);
      });
      return;
    }
    resolve(null);
  });
};

exports.getQuestions = async (req, res) => {
  const tags = req.query.tags ? JSON.parse(req.query.tags) : null;

  const userID = req.query.userID ? req.query.userID : null;
  const recents = req.query.recents ? req.query.recents : false;
  const searchQuery = req.query.q ? req.query.q : '';
  if (searchQuery && searchQuery !== '') {
    const authHeader = req.headers['x-mdhelp-token'];
    const token = authHeader && authHeader.split(' ')[1];
    const user_id = await getUserId(token);
    await QueryKeyword.addSearchHistory(searchQuery, user_id);
  }

  const sortingSlug = req.query.slug || 'latest';
  const sortBy = req.query.sortBy;
  const dir = req.query.dir;
  const search_queries = searchQuery.split(' ');
  const pageOptions = {
    page: parseInt(req.query.page, 10) || 1,
    perpage: parseInt(req.query.perpage, 10) || 50
  };

  let sortQuery = { date: -1 };

  if (sortingSlug === 'latest') {
    sortQuery = { id: 1 };
  } else if (sortingSlug === 'ranking') {
    sortQuery = { likes: -1 };
  }

  if (sortBy && sortBy !== 'undefined') {
    sortQuery = { [sortBy]: dir === 'true' ? 0 : -1 };
  }

  const titleSettings = search_queries.map((e) => ({
    title: new RegExp(e, 'i')
  }));

  const contentSettings = search_queries.map((e) => ({
    content: new RegExp(e, 'i')
  }));

  try {
    let totalMatches,
      resQs = [];

    if (recents === 'true') {
      totalMatches = await Question.find().sort({ _id: 1 }).limit(20);

      resQs = await Question.find().sort({ _id: 1 }).limit(20);
    } else if (tags && tags.length > 0) {
      const tagIDs = tags.map((tagItem) =>
        mongoose.Types.ObjectId(tagItem._id)
      );
      totalMatches = await Question.getByTags(tagIDs);
      // TODO: Pagination
      resQs = await Question.getByTags(tagIDs);
      // .sort(sortQuery)
      // .limit(pageOptions.perpage)
      // .skip((pageOptions.page - 1) * pageOptions.perpage);
    } else {
      const andQuery = [
        { $or: [{ $or: titleSettings }, { $or: contentSettings }] }
      ];

      if (userID) {
        andQuery.push({ userID });
      }

      totalMatches = await Question.find({
        $and: andQuery
      });

      resQs = await Question.find({
        $and: andQuery
      })
        .sort(sortQuery)
        .limit(pageOptions.perpage)
        .skip((pageOptions.page - 1) * pageOptions.perpage);
    }

    const totalQs = totalMatches.length;

    const total =
      totalQs % pageOptions.perpage > 0
        ? parseInt(totalQs / pageOptions.perpage, 10) + 1
        : parseInt(totalQs / pageOptions.perpage, 10);

    let questions = [];

    for (const qItem of resQs) {
      const tags = await qItem.getTags();
      const answers = await qItem.getAnswers();
      const user = await User.findById(qItem.userID);

      questions.push({
        ...qItem.toJSON(),
        tags,
        answers: answers.length,
        user: {
          userID: user._id,
          username: user.username
        }
      });
    }

    res.status(200).json({
      questions,
      ...pageOptions,
      totalQs,
      total: total === 0 ? 1 : total,
      sorting: sortingSlug,
      queries: search_queries
    });
  } catch (error) {
    res.status(403).json({
      error: 'Cannot Fetch questions from DB'
    });
  }
};

/**
 * Get Questions
 *
 * @param {Request} req
 * @param {Response} res
 */
exports.getQuestionsSorted = async (req, res) => {
  const {
    slug,
    tab,
    q: searchQuery,
    perpage,
    page,
    userID,
    tags,
    activeWikiId
  } = req.query;

  let sortBy = null;
  if (!slug || slug === 'latest') {
    sortBy = { date: -1 };
  } else if (slug === 'ranking') {
    sortBy = { likes: -1 };
  }

  try {
    // Base Aggregate Query
    let query = [
      {
        $lookup: {
          from: 'users',
          localField: 'userID',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $unwind: '$user'
      },
      {
        $lookup: {
          from: 'answers',
          localField: '_id',
          foreignField: 'questionID',
          as: 'answers'
        }
      },
      {
        $lookup: {
          from: 'mapquestiontags',
          localField: '_id',
          foreignField: 'questionID',
          as: 'mapTags'
        }
      },
      {
        $project: {
          _id: 1,
          userID: 1,
          title: 1,
          content: 1,
          likes: 1,
          dislikes: 1,
          date: 1,
          banned: 1,
          mdReviewed: 1,
          imageUrl: 1,
          mapTags: { tagID: 1 },
          user: { _id: 1, username: 1, email: 1 },
          answers: { _id: 1 },
          question_embedding: 1,
          score: 1,
          wikiSearch: { $objectToArray: '$referencedBooks' }
        }
      },
      {
        $sort: sortBy
      }
    ];

    // Handle Vector Search
    if (searchQuery && searchQuery.trim() !== '') {
      const embedding = await getEmbedding(searchQuery);
      query = [
        {
          $vectorSearch: {
            queryVector: embedding,
            path: 'question_embedding',
            index: 'question_index',
            numCandidates: 100,
            limit: 100
          }
        },
        {
          $addFields: { score: { $meta: 'vectorSearchScore' } }
        },
        {
          $match: { score: { $gte: 0.89 } } // Adjust threshold as needed
        },
        {
          $sort: { score: -1 }
        },
        {
          $project: { question_embedding: 0 }
        },
        ...query
      ];
    }

    // Handle Tabs
    if (tab === 'recents') {
      const index = query.findIndex((item) => '$sort' in item);
      if (index !== -1) {
        query[index] = { $sort: { ...query[index].$sort, _id: 1 } };
      }
    } else if (tab === 'asked') {
      query.push({
        $match: {
          userID: mongoose.Types.ObjectId(userID)
        }
      });
    } else if (tab === 'answered') {
      query.push(
        {
          $lookup: {
            from: 'answers',
            let: { qId: '$_id' },
            pipeline: [
              { $addFields: { questionID: { $toObjectId: '$questionID' } } },
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$userID', mongoose.Types.ObjectId(userID)] },
                      { $eq: ['$questionID', '$$qId'] }
                    ]
                  }
                }
              }
            ],
            as: 'ans'
          }
        },
        {
          $match: {
            ans: { $ne: [] }
          }
        }
      );
    }

    // Handle Tags Filtering
    if (tags && tags !== '') {
      const searchTags = tags.split('+');
      const searchedTags = await Tag.find({ title: searchTags });
      const ids = searchedTags.map((tagItem) => tagItem._id);
      const questionsTagged = await MapQuestionTag.find({
        tagID: { $in: ids }
      });
      const questionIDs = questionsTagged.map((item) =>
        mongoose.Types.ObjectId(item.questionID)
      );

      query.push({
        $match: {
          _id: { $in: questionIDs }
        }
      });
    }

    // Handle Active Wiki ID Filtering
    if (
      activeWikiId != undefined &&
      activeWikiId !== 'undefined' &&
      searchQuery.length <= 1
    ) {
      query.push(
        { $unwind: '$wikiSearch' },
        {
          $match: {
            $and: [
              { 'wikiSearch.v': { $type: 'array' } },
              { 'wikiSearch.v': { $in: [activeWikiId] } }
            ]
          }
        }
      );
    }

    // Group Results
    query.push(
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          data: { $push: '$$ROOT' }
        }
      },
      {
        $project: {
          total: 1,
          data: {
            $slice: [
              '$data',
              page ? parseInt(page) * perpage : 0,
              perpage ? parseInt(perpage) : 10
            ]
          }
        }
      }
    );
    console.log(query)
    const questions = await Question.aggregate(query);

    const totalQuestions =
      questions && questions[0]?.total ? questions[0]?.total : 0;
    const total = Math.ceil(totalQuestions / (perpage || 10));

    res.status(200).json({
      questions,
      perpage: perpage ? parseInt(perpage) : 10,
      page: page ? parseInt(page) : 0,
      totalQs: totalQuestions,
      total
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Unknown Error'
    });
  }
};

/**
 * Post A Question
 */
exports.postQuestion = async (req, res) => {
  // const files = [];
  // const url = req.protocol + "://" + req.get("host");
  // for (var i = 0; i < req.files.length; i++) {
  //   files.push(url + "/uploads/" + req.files[i].filename);
  // }

  const { userID, title, content, tags, imageUrl } = req.body;

  try {
    // const newQuestion = new Question({ title, content, userID, files });
    const newQuestion = new Question({ title, content, userID, imageUrl });
    const result = await newQuestion.save().then((result) => result);

    const tagsToInsert = tags.map((_item) => ({
      questionID: result._id,
      tagID: _item._id
    }));

    MapQuestionTag.insertMany(tagsToInsert);

    res.status(200).json({
      question: result
    });
  } catch (error) {
    res.status(403).json({
      error: 'Cannot Create Question'
    });
  }
};

/**
 * Get Single Question by ID
 */
exports.getSingleQuestion = async (req, res) => {
  const { questionID } = req.params;

  try {
    const qInstance = await Question.findById(questionID);
    const tags = await qInstance.getTags();
    const user = await User.findById(qInstance.userID);
    const mdResponded = await User.findById(qInstance.mdAssigned);

    const question = { ...qInstance.toJSON(), tags, user, mdResponded };

    res.status(200).json({
      question
    });
  } catch (error) {
    res.status(403).json({
      error: 'Can not fetch data'
    });
  }
};

/**
 * Delete Question by ID
 */
exports.deleteQuestion = async (req, res) => {
  const { questionID } = req.params;

  try {
    await Question.deleteOne({ _id: questionID });

    res.status(200).json({
      message: 'Successfully Deleted'
    });
  } catch (error) {
    res.statu(403).json({
      error: 'Can not delete Question'
    });
  }
};

/**
 * Assign MD to Question
 */
exports.assignMD = async (req, res) => {
  const { questionID } = req.params;
  const { md } = req.body;

  try {
    await Question.updateOne(
      {
        _id: questionID
      },
      {
        mdAssigned: mongoose.Types.ObjectId(md)
      }
    );

    const question = await Question.findById(questionID);

    res.status(200).json({
      question
    });
  } catch (error) {
    res.status(403).json({
      message: 'Can not assign MD to the question'
    });
  }
};

/**
 * Vote Function
 */
exports.vote = async (req, res) => {
  const { questionID } = req.params;
  const { vote, userID } = req.body;

  try {
    const question = await Question.findById(questionID);
    if (vote == 1) {
      if (
        Array.isArray(question.likes) &&
        question.dislikes.indexOf(userID) === -1
      ) {
        if (question.likes.indexOf(userID) === -1) {
          question.likes = [...question.likes, userID];
        } else {
          const deletedLikes = [
            ...question.likes.slice(0, question.likes.indexOf(userID)),
            ...question.likes.slice(question.likes.indexOf(userID) + 1)
          ];
          question.likes = [...deletedLikes];
        }
      } else {
        const deletedDislikes = [
          ...question.dislikes.slice(0, question.dislikes.indexOf(userID)),
          ...question.dislikes.slice(question.dislikes.indexOf(userID) + 1)
        ];
        question.dislikes = [...deletedDislikes];
      }
    }
    if (vote == -1) {
      if (
        Array.isArray(question.dislikes) &&
        question.likes.indexOf(userID) === -1
      ) {
        if (question.dislikes.indexOf(userID) === -1) {
          question.dislikes = [...question.dislikes, userID];
        } else {
          const deletedDislikes = [
            ...question.dislikes.slice(0, question.dislikes.indexOf(userID)),
            ...question.dislikes.slice(question.dislikes.indexOf(userID) + 1)
          ];
          question.dislikes = [...deletedDislikes];
        }
      } else {
        const deletedLikes = [
          ...question.likes.slice(0, question.likes.indexOf(userID)),
          ...question.likes.slice(question.likes.indexOf(userID) + 1)
        ];
        question.likes = [...deletedLikes];
      }
    }

    await question.save();

    res.status(200).json({
      question
    });
  } catch (error) {
    res.status(403).json({
      message: 'Can not vote this question'
    });
  }
};

/**
 *
 * post references to question
 */
exports.postReference = async (req, res) => {
  try {
    const { questionID } = req.params;
    const { userID, books } = req.body;
    const referencedBooks = {};
    referencedBooks[userID] = books;
    const question = await Question.findOne({ _id: questionID });
    if (!question) throw new Error('Not found question');
    await Question.updateOne({ _id: questionID }, { referencedBooks });
    res.status(200).json({});
  } catch (error) {
    res.status(403).json({ error });
  }
};
/**
 * Delete Reference
 * @param {*} req
 * @param {*} res
 */
exports.deleteReference = async (req, res) => {
  try {
    const { questionID } = req.params;
    const { userID, activeWikiId } = req.body;
    const question = await Question.findOne({ _id: questionID });
    if (!question) throw new Error('Not Found Question');
    const referencedBooks = question.referencedBooks;
    const result = {};
    const books = Object.values(referencedBooks);
    const users = Object.keys(referencedBooks);
    for (let i = 0; i < books.length; i++) {
      let temp = [];
      for (let j = 0; j < books[i].length; j++) {
        if (books[i][j] !== activeWikiId) {
          temp.push(books[i][j]);
        }
      }
      result[users[i]] = temp;
    }
    await Question.updateOne({ _id: questionID }, { referencedBooks: result });
    res.status(200).json({});
  } catch (error) {
    res.status(403).json({ error });
  }
};
/**
 * Update Question
 */
exports.updateQuestion = async (req, res) => {
  const { questionID } = req.params;
  const { updated_question } = req.body;

  const { tags } = updated_question;

  try {
    await Question.updateOne(
      {
        _id: mongoose.Types.ObjectId(questionID)
      },
      {
        ...updated_question
      }
    );

    const tagMapUpdated = [];
    if (tags && tags.length > 0) {
      for (let tagItem of tags) {
        const isExistingTag = await Tag.findOne({
          title: tagItem.title
        });

        if (!isExistingTag) {
          tagItem = await new Tag({
            title: tagItem.title
          })
            .save()
            .then((item) => item);
          tagMapUpdated.push({
            questionID,
            tagID: tagItem._id
          });
        } else {
          const existing_tag = await MapQuestionTag.find({
            questionID: mongoose.Types.ObjectId(questionID),
            tagID: mongoose.Types.ObjectId(tagItem._id)
          });

          if (existing_tag.length < 1) {
            tagMapUpdated.push({
              questionID,
              tagID: tagItem._id
            });
          }
        }
      }
    }

    await MapQuestionTag.insertMany(tagMapUpdated);

    res.status(200).json({
      updated_question
    });
  } catch (error) {
    res.status(403).json({
      message: 'Could not update Question'
    });
  }
};

/**
 * Get Untaged Questions
 */
exports.getUntaggedQuestions = async (req, res) => {
  try {
    const questions_untagged = await Question.aggregate([
      {
        $lookup: {
          from: 'mapquestiontags',
          localField: '_id',
          foreignField: 'questionID',
          as: 'tags_map'
        }
      },
      {
        $match: {
          tags_map: []
        }
      }
    ]);

    res.status(200).json({
      questions_untagged
    });
  } catch (error) {
    res.status(403).json({
      error
    });
  }
};

/**
 * Add Tags to the Question
 */
exports.addTags = async (req, res) => {
  const { questionID } = req.params;
  const { tags } = req.body;

  try {
    await MapQuestionTag.deleteMany({
      questionID
    });

    const mapQuestionTags = tags.map((tag) => {
      return {
        questionID,
        tagID: tag._id
      };
    });

    await MapQuestionTag.insertMany(mapQuestionTags);

    res.status(200).json({
      message: 'Successfully Added tags'
    });
  } catch (error) {
    res.status(403).json({
      error
    });
  }
};

/**
 * Get Questions MD Assigned
 */
exports.getMDQuestions = async (req, res) => {
  const { mdID } = req.params;

  try {
    const mdQuestions = await Question.find({
      mdAssigned: mongoose.Types.ObjectId(mdID)
    });

    res.status(200).json({
      mdQuestions
    });
  } catch (error) {
    res.status(403).json({
      error
    });
  }
};

/**
 * Get Questions Answered By User
 */
exports.getQuestionsAnswerd = async (req, res) => {
  const { userID } = req.params;

  try {
    const questions = await Question.aggregate([
      {
        $lookup: {
          from: 'answers',
          let: { qId: '$_id' },
          pipeline: [
            { $addFields: { questionID: { $toObjectId: '$questionID' } } },
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: ['$userID', mongoose.Types.ObjectId(userID)]
                    },
                    {
                      $eq: ['$questionID', '$$qId']
                    }
                  ]
                }
              }
            }
          ],
          as: 'ans'
        }
      },
      {
        $match: {
          ans: { $ne: [] }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userID',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $unwind: '$user'
      }
    ]);

    const totalQs = questions.length;

    res.status(200).json({
      questions,
      totalQs
    });
  } catch (error) {
    res.status(403).json({
      error
    });
  }
};

/**
 * Remove MD Assigned
 */
exports.removeMD = async (req, res) => {
  const { questionID } = req.params;

  try {
    await Question.updateOne(
      {
        _id: questionID
      },
      {
        mdAssigned: null
      }
    );

    res.status(200).json({
      message: 'Removed MD'
    });
  } catch (error) {
    res.status(403).json({
      error
    });
  }
};

/**
 * Find Similar Question
 */
exports.findSimilar = async (req, res) => {
  const { questionID, queryTitle } = req.body;

  try {
    let query = '';

    if (questionID !== '') {
      const question = await Question.findById(questionID);
      // const query = question.title + question.content.replace(/<[^>]+>/g, "");
      query = question.title;
    } else if (queryTitle !== '') {
      query = queryTitle;
    } else {
      return res.status(200).json({
        status: 'success',
        result: []
      });
    }

    const questions = await Question.find({});
    const idx = lunr(function () {
      this.field('title');
      this.field('content');

      questions.forEach(function (question) {
        this.add(question);
      }, this);
    });

    const searches = idx.search(query);
    const similarQuestions = [];

    for (const item of searches) {
      if (item.ref !== questionID) {
        const questionSimilar = await Question.findById(item.ref);

        similarQuestions.push(questionSimilar);
      }
    }

    res.status(200).json({
      status: 'success',
      result: similarQuestions
    });
  } catch (error) {
    res.status(403).json({
      status: 'error',
      message: 'Search Failed'
    });
  }
};

/**
 * Find Smilar Queries
 */
exports.getSimilarQueries = async (req, res) => {
  const { searchQuery } = req.query;

  try {
    const search_queries = searchQuery.split(' ');

    let querySettings = search_queries.map((e) => ({
      queryString: new RegExp(e, 'i')
    }));

    const allQueries = await SearchQuery.find({
      $or: querySettings
    }).sort({
      queryString: 1
    });

    const similarQueries = allQueries.map((query) => {
      return query.queryString;
    });

    res.status(200).json({
      status: 'success',
      searches: similarQueries
    });
  } catch (error) {
    res.status(403).json({
      error
    });
  }
};

/**
 * Set Banned
 */
exports.setBanned = async (req, res) => {
  const { questionID } = req.params;
  const { banned } = req.query;

  try {
    await Question.updateOne(
      {
        _id: questionID
      },
      {
        banned: banned
      }
    );

    return res.status(200).json({
      status: 'success',
      message: `Successfully ${
        banned ? 'set' : 'removed'
      } banned on the question`
    });
  } catch (error) {
    return res.status(403).json({
      status: 'error',
      message: 'Succesfully set banned'
    });
  }
};

/**
 * Set Status of the Question
 *
 * @param {object} req Request Object
 * @param {object} res Response Object
 * @return {void}
 */
exports.setStatus = async (req, res) => {
  const { questionID } = req.params;
  const { status } = req.query;

  try {
    await Question.updateOne(
      {
        _id: questionID
      },
      {
        status
      }
    );

    return res.status(200).json({
      status: 'success',
      message: 'Succesfully updated status'
    });
  } catch (error) {
    return res.status(403).json({
      status: 'error',
      message: 'Failed'
    });
  }
};

// add

exports.getAllQuestionTags = async (req, res) => {
  try {
    const wikiquiz = await WikiQuestion.find();
    return res.status(200).json(wikiquiz);
  } catch (err) {
    return res.status(400).json({ err });
  }
};

/**
 * Create Wiki
 */
exports.createWikiQuiz = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) throw new Error('title is empty');

    const existingWikis = await WikiQuestion.find({ title });
    if (existingWikis && existingWikis.length > 0) {
      return res.status(409).json({
        message: 'Wiki is already existing'
      });
    }
    const wikiQuiz = await new WikiQuestion({ title }).save();
    res.status(200).json({ result: 'success' });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      error
    });
  }
};

// success
exports.updateQuestionTag = async (req, res) => {
  try {
    const { tagId } = req.params;
    const { title } = req.body;
    if (tagId && title) {
      await WikiQuestion.updateOne({ _id: tagId }, { title: title });
      return res.status(200).json({ result: 'success' });
    }
    throw new Error('tagId or title is empty');
  } catch (err) {
    return res.status(400).json({ err });
  }
};

exports.deleteQuestionTag = async (req, res) => {
  try {
    const { tagId } = req.params;
    await WikiQuestion.deleteOne({
      _id: mongoose.Types.ObjectId(tagId)
    });
    return res.status(200).json({ result: 'success' });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ err });
  }
};

exports.deleteQuestionTags = async (req, res) => {
  try {
    const { tagIds } = req.body;

    await WikiQuestion.deleteMany({
      _id: {
        $in: tagIds
      }
    });
    return res.status(200).json({ result: 'success' });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ err });
  }
};
