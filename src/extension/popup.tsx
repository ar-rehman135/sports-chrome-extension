import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "../App";
import Store from "../context/store";
import "./popup.scss";

const mountNode = document.getElementById("popup");
ReactDOM.render(
  <BrowserRouter>
    <Store>
      <App />
    </Store>
  </BrowserRouter>,
  mountNode
);
