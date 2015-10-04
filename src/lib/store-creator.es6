'use strict'
import {
    createStore, applyMiddleware
}
from "redux";
import thunkMiddleware from "redux-thunk";
import loggerMiddleware from "redux-logger";

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
)(createStore);

export default createStoreWithMiddleware;
