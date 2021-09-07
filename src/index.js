import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import ErrorBoundry from "./errorBoundry";
import store from "./store";
import "./index.css";
import App from "./app";

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundry>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundry>
  </React.StrictMode>,
  document.getElementById("root")
);
