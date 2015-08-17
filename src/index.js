'use strict'
let GoTop = require('./component/gotop.jsx'),
    Dialog = require("./component/dialog.jsx"),
    Messager = require("./component/messager.jsx"),
    Loading = require("./component/loading.jsx"),
    Selected = require("./component/selected.jsx");

require("normalize.css");
// require("font-awesome/css/font-awesome.css");
require("./theme/index.scss");

module.exports = {
    component:{
        GoTop,
        Dialog,
        Messager,
        Loading,
        Selected
    }
}