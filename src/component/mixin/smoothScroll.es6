'use strict';

import React from "react";
import dom from "../util/dom";
import rAF from "../util/requestAnimationFrame";
import {bindEvent,unbindEvent} from "../util/event";

var scrollInProgress = false;

const SmoothScrollMixin = {
    smoothScroll:function(element,options){
        options = options || {};
        const scrollTarget = element || window;
        const targetY = options.position && parseInt(options.position,10) || 0;
        const initialY = dom.scrollTop(scrollTarget);
        var lastY = initialY;
        var delta = targetY - initialY;
        const speed = Math.min(750,Math.min(1500,Math.abs(delta)));

        const cancelScroll = ()=>{
            abort()
        };
        if(scrollInProgress === true){
            return;
        }
        if(delta === 0 ){
            return;
        }

        function smooth(pos){
            if ((pos /= 0.5) < 1) {
                return 0.5 * Math.pow(pos, 5);
            }
            return 0.5 * (Math.pow((pos - 2), 5) + 2);
        }
        function abort(){
            unbindEvent(scrollTarget,"touchstart",cancelScroll);
            scrollInProgress = false;
        }
        bindEvent(scrollTarget,"touchstart",cancelScroll);
        scrollInProgress = true;

        var start,t,y;
        rAF(function render(now){
            if(!scrollInProgress){
                return;
            }
            const start = start || now;
            // calculate t, position of animation in [0..1]
            t = Math.min(1, Math.max((now - start) / speed, 0));
            // calculate the new scrollTop position (don't forget to smooth)
            y = Math.round(initialY + delta * smooth(t));
            if(delta < 0 && y < targetY){
                y = targetY;
            }
            if(delta >0 && y > targetY){
                y = targetY;
            }
            // only scroll then refresh
            if(lastY !== y){
                scrollTarget.scrollTop = y;
            }
            // refresh current position Y
            lastY = y;
            if(y !== targetY){
                rAF(render);
            }else{
                abort();
            }
        });
    }
}

export default SmoothScrollMixin;