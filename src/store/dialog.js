'use strict'
var Reflux = require('reflux');

var dialogAction = require("../action/dialog");

let dialogStore = Reflux.createStore({
    listenables:dialogAction,
    getInitialState(){
        return {
            confirmBtn:'确定',
            cancelBtn:'取消'
        };
    },
    onPopup(title,content,confirmBtn='确定',cancelBtn='取消'){
        let settings = {
            active:true,
            title,
            content,
            confirmBtn,
            cancelBtn
        };
        this.trigger(settings);
    },
    onConfirm(){
        this.trigger({
            confirmBtnTapped:true,
            active:false,
        });
    },
    onCancel(){
        this.trigger({
            cancelBtnTapped:true,
            active:false,
        });
    }
});

module.exports = dialogStore;