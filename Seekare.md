# Project Structure

To clone this project, please use the following command:

```bash
git clone https://github.com/seekare/seekare.git
```
This project could be divided into 4 main parts:

1. **seekare_admin**
2. **seekare_backend**
3. **seekare_frontend**
4. **seekare_text**

- **seekare_admin** and **seekare_text** are nearly completed, while the development is currently focused on **seekare_frontend** and **seekare_backend**.
<br>
<br>
**seekare_text**  is a python script to upload the Books data automatically <br>
**seekare_admin** is only for seekare admins to manage the whole project, including user data

## For seekare_frontend:

The frontend can be divided into 3 main parts:

1. **wikiRight**
2. **WikiContent**
3. **wikiLeft**

These 3 components are managed in `seekare/seekare_frontend/src/app/main/wiki`.

You could findout detailed documentation in `seekare/seekare_frontend/ReadMe.md`

## For seekare_backend:

This is a typical NodeJS, Express, and MongoDB project.
For detail, please check this. `seekare/seekare_backend/ReadMe.md`

## Mail Server Configuration
In this project, we are using nodemailer for sending mail from Seekare to users. To configure the mail server, you should add the mail server credentials to the backend environment file.

# Environment File Management

In this project, the backend and frontend have separate environment files.

# Start the Project

To start this project, you should start the backend and frontend separately. You can find instructions in the `package.json` files in both the frontend and backend directories.
