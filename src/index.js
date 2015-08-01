'use strict'
let GoTop = require('./component/gotop.jsx'),
    Dialog = require("./component/dialog.jsx"),
    Messager = require("./component/messager.jsx"),
    Loading = require("./component/loading.jsx"),
    Selected = require("./component/selected.jsx");

let loadingAction = require("./action/loading"),
    dialogAction = require("./action/dialog"),
    messagerAction = require("./action/messager");


module.exports = {
    component:{
        GoTop,
        Dialog,
        Messager,
        Loading,
        Selected
    },
    action:{
        loadingAction,
        dialogAction,
        messagerAction
    }
}