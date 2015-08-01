'use strict'
var Reflux = require("reflux");

let loadingAction = Reflux.createActions([
    'show',
    'hide'
]);

module.exports = loadingAction;