'use strict'
var Reflux = require("reflux");

let dialogAction = Reflux.createActions([
    'popup',
    'confirm',
    'cancel',
]);

module.exports = dialogAction;