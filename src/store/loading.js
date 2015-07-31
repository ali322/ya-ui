'use strict'
var Reflux = require("reflux");

var loadingAction =  require("../action/loading");

let loadingStore = Reflux.createStore({
    listenables:loadingAction,
    onShow(hint='加载中...'){
        this.trigger({
            active:true,
            hint
        });
    },
    onHide(){
        this.trigger({
            active:false,
            hint:''
        });
    }
});

module.exports = loadingStore;