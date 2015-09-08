'use strict'
module.exports = {
  offset: function(element) {
        if (element) {
          var rect = element.getBoundingClientRect();
          var body = document.body;
          var clientTop = element.clientTop || body.clientTop || 0;
          var clientLeft = element.clientLeft || body.clientLeft || 0;
          var scrollTop = window.pageYOffset || element.scrollTop;
          var scrollLeft = window.pageXOffset || element.scrollLeft;
    
          return {
            top: rect.top + scrollTop - clientTop,
            left: rect.left + scrollLeft - clientLeft
          };
        }
        return null;
    },
    ownerWindow(element){
        const doc = (element && element.ownerDocument) || document;
        return doc.defaultView || doc.parentWindow || window;
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
            if(element === window){
                window.scrollTo(scrollLeft,value);
            }else{
                element.scrollTop = value;
            }
        }
        return scrollTop;
    },
    smoothScroll(element,options){
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

        // var scrollInProgress = true;
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
            // scrollInProgress = false;
        }
        bindEvent(scrollTarget,"touchstart",cancelScroll);

        var start,t,y;
        rAF(function render(){
            // if(!scrollInProgress){
            //     return;
            // }
            // scrollInProgress = true;
            const now = Date.now();
            if(!start){
                start = now;
            }
            // calculate t, position of animation in [0..1]
            t = Math.min(1, Math.max((now - start) / speed, 0));
            // calculate the new scrollTop position (don't forget to smooth)
            y = Math.round(initialY + delta * smooth(t));
            // console.log("t:",t,"y:",y)
            if(delta < 0 && y < targetY){
                y = targetY;
            }
            if(delta >0 && y > targetY){
                y = targetY;
            }
            // only scroll then refresh
            // console.log('y:',y,lastY)
            if(lastY !== y){
                dom.scrollTop(scrollTarget,y);
            }
            // refresh current position Y
            lastY = y;
            if(y !== targetY){
                rAF(render);
            }else{
                abort();
            }
        });
    },
    hasClass(element,className){
      if (element.classList) {
        return !!className && element.classList.contains(className);
      }
      return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
    },
    addClass(element,className){
      if (element) {
        if (element.classList) {
          element.classList.add(className);
        } else if (!dom.hasClass(element, className)) {
          element.className = element.className + ' ' + className;
        }
      }
      return element;
    },
    removeClass(element,className){
      if (element && element.classList) {
          element.classList.remove(className);
      } else if (dom.hasClass(element, className)) {
          element.className = element.className
            .replace(new RegExp('(^|\\s)' + className + '(?:\\s|$)', 'g'), '$1')
            .replace(/\s+/g, ' ') // multiple spaces to one
            .replace(/^\s*|\s*$/g, ''); // trim the ends
        }
    }
}
