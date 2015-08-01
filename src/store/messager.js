'use strict'
var Reflux = require("reflux");

var messagerAction = require("../action/messager");

var messageStore = Reflux.createStore({
    listenables:messagerAction,
    init(){
        this.messages = [];
    },
    getInitialState(){
        return this.messages;
    },
    push(title,content,level='info',delay){
        this.messages.push({
            title,
            content,
            level,
            delay
        });
        this.trigger(this.messages);
    },
    onRemove(index){
        this.messages = _.remove(this.messages,function(v,i){return index == i});
        this.trigger(this.messages);
    },
    onClear(){
        this.messages = [];
        this.trigger(this.messages);
    },
    onSuccess(content,title,delay=2000){
        this.push(title,content,'success',delay);
    },
    onError(content,title,delay=2000){
        this.push(title,content,'error',delay);
    },
    onInfo(content,title,delay=2000){
        this.push(title,content,'info',delay);
    }    
});

module.exports = messageStore;