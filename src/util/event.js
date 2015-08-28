'use strict'

let Event = {
    bindEvent(el,event,listener){
        if(el.addEventListener){
            el.addEventListener(event,listener,false);
        }else if(el.attachEvent){
            el.attachEvent("on${event}",(e)=>{
                listener.call(el,e||window.event);
            });
        }
    },
    unbindEvent(el,event,listener){
        if(el.removeEventListener){
            el.removeEventListener(event,listener);
        }else if(el.detachEvent){
            el.detachEvent("on${event}",listener);
        }
    }
};

module.exports = Event;
