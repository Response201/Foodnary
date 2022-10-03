import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router} from "react-router-dom";
import { user } from "./reducers/user";
import {recipes} from './reducers/recipes'
import { Provider,  } from "react-redux";
import { ui } from "./reducers/ui";
import { configureStore, combineReducers } from '@reduxjs/toolkit';

const reducer = combineReducers({
  ui: ui.reducer,
  user:user.reducer,
  recipes:recipes.reducer,
  
});
const store = configureStore({
  reducer,


 
});

ReactDOM.render(
  <Router>
  <Provider store={store}>
    <App />
  </Provider>
</Router>,
  document.getElementById("root")
);


