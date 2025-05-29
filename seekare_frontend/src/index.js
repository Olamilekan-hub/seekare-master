import React from "react";
import { hydrate, render } from "react-dom";
import App from "./app/App";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-quill/dist/quill.snow.css";
import "./styles/index.css";

// Default theme
import "@splidejs/react-splide/css";

// or other themes
import "@splidejs/react-splide/css/skyblue";
import "@splidejs/react-splide/css/sea-green";

// or only core styles
import "@splidejs/react-splide/css/core";

const rootElement = document.getElementById("root");
if (rootElement?.hasChildNodes()) {
  hydrate(<App />, rootElement);
} else {
  render(<App />, rootElement);
}
