'use strict'
var Reflux = require("reflux");

let messagerAction = Reflux.createActions([
    'success',
    'error',
    'info',
    'remove',
    'clear'
]);

module.exports = messagerAction;