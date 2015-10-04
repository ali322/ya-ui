'use strict'
import React from "react";
import reqwest from "reqwest";
import {base64} from "./crypto";

const util = {
    apiRequest(url, param,options={
        method:"get",
        type:"json"
    }) {
        options = Object.assign({},options,{
            url,
            data:param
        });
        return reqwest(options);
    },
    base64Encode(str){
        return base64.encode(str)
    },
    base64Decode(encodedStr){
        return base64.decode(encodedStr)
    },
    base64EncodeForURL(str){
        var encodedStr = base64.encode(str);
        return encodedStr.replace(/=/g, "_").replace(/\//g, ",").replace(/\+/g, "-")
    },
    base64DecodeForURL(encodedStr){
        encodedStr = encodedStr.replace(/_/g, "=").replace(/,/g, "/").replace(/-/g, "+");
        return base64.decode(encodedStr)
    },
    urlParam(param){
        var paramStr = [];
        for(var key in param){
            paramStr.push(`${key}=${param[key]}`);
        }
        return paramStr.join("&");
    },
    dispatchEvent(el,event){
        var e = document.createEvent('Event');
        e.initEvent(event,true,true);
        el.dispatchEvent(e);
    },
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
    },
    scrollTop(value){
        let isCSS1Compat = (document.compatMode === 'CSS1Compat');
        let supportPageOffset = window.pageYOffset !== undefined;
        let scrollTop = supportPageOffset ? window.pageYOffset : 
                        isCSS1Compat? document.documentElement.scrollTop:
                        document.body.scrollTop;
        let scrollLeft = supportPageOffset ? window.pageXOffset : 
                        isCSS1Compat? document.documentElement.scrollLeft:
                        document.body.scrollLeft;
        if(value !== undefined){
            window.scrollTo(scrollLeft,value);
        }
        return scrollTop;
    },
    registerPullDownEvent(callback) {
        // const self = this;
        this.bindEvent(window,'scroll',()=>{
            var scrollTop = this.scrollTop();
            if (document.documentElement.clientHeight + scrollTop >= document.documentElement.scrollHeight) {
                callback();
            }
        });
    }
}

export default util;