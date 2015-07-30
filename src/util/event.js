'use strict'
let bindListener = window.addEventListener ? 'addEventListener' : 'attachEvent';
let unbindListener = window.removeEventListener ? 'removeEventListener' : 'detachEvent';
let eventNamePrefix = bindListener === 'addEventListener' ? '' : 'on';

let Event = {
    bind: function(domNode, eventName, eventListener, capture = false) {
        domNode[bindListener](eventNamePrefix + eventName, eventListener);
    },
    unbind: function(domNode, eventName, eventListener, capture = false) {
        domNode[unbindListener](eventNamePrefix + eventName, eventListener, capture);
    }
};

module.exports = Event;