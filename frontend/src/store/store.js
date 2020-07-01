import { createStore, applyMiddelware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import rootReducer from "../reducers/root_reducer";

const configureStore = (preloadedState = {}) => {
  createStore(rootReducer, preloadedState, applyMiddelware(thunk, logger));
};

export default configureStore;
