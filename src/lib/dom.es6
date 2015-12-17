'use strict'
import rAF from "./requestAnimationFrame";

let dom = {
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
      offset(element,dynamic = false) {
        if (!element) {
          return null;
        } 
        var top = 0, left = 0;  
        if ("getBoundingClientRect" in document.documentElement && !dynamic) {
          var rect = element.getBoundingClientRect();
          var doc = element.ownerDocument;
          var body = doc.body;
          var docEl = doc.documentElement;
          var clientTop = docEl.clientTop || body.clientTop || 0;
          var clientLeft = docEl.clientLeft || body.clientLeft || 0;
          var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
          var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
    
          return {
            top: rect.top + scrollTop - clientTop,
            left: rect.left + scrollLeft - clientLeft
          };
        }else{
          do{  
            top += element.offsetTop || 0;  
            left += element.offsetLeft || 0;  
            element = element.offsetParent;  
          }while(element);  
          return {top,left};
        }
      },
      ownerWindow(element){
        const doc = (element && element.ownerDocument) || document;
        return doc.defaultView || doc.parentWindow || window;
      },
      inViewport(element,container = window,diffInViewport = 0){
        if(container === window){
          let top = element.offsetTop;
          let left = element.offsetLeft;
          let width = element.offsetWidth;
          let height = element.offsetHeight;
          while(element.offsetParent){
            element = element.offsetParent;
            top += element.offsetTop;
            left += element.offsetLeft;
          }
          return (
            top < (window.pageYOffset + window.innerHeight) &&
            left < (window.pageXOffset + window.innerWidth) &&
            (top + height) > window.pageYOffset &&
            (left + width) > window.pageXOffset
          )
        }else{
          let top = dom.offset(element).top;
          let containerTop = dom.scrollTop(container);
          let containerPaddingTop = dom.offset(container.firstChild).top;

        return (containerTop + containerPaddingTop) < (top + element.offsetHeight) &&
                (top - diffInViewport) < (containerTop + container.offsetHeight)
        }
      },
      scrollNode(element){
        let scrollNode = element;
        while(scrollNode !== window){
          scrollNode = scrollNode.parentNode;
          if(scrollNode.scrollTop > 0){
            break;
          }
        }
        return scrollNode;
      },
      scrollInView(element,container = window,callback = ()=>{}){
        let paddingTop = dom.offset(container.firstChild).top;
        let top = dom.offset(element).top - paddingTop;
        let step = 15;
        rAF(function smoothScroll(){
          let scrollTop = dom.scrollTop(container);
          // console.log(top,scrollTop)
          if(top > scrollTop){
              console.log("scroll down")
              if((scrollTop + container.offsetHeight) === container.scrollHeight){
                // clearTimeout(timer)
                callback()
              }else{
                scrollTop = (scrollTop + step) >= top ? top: scrollTop + step;
                dom.scrollTop(container,scrollTop)
                // setTimeout(smoothScroll,10)           
                rAF(smoothScroll)
              }
          }else if(top < scrollTop ){
              console.log("scroll up")
              if(scrollTop === 0){
                // clearTimeout(timer)
                callback()
              }else{
                scrollTop  = (scrollTop - step) <= top ? top: scrollTop - step;
                dom.scrollTop(container,scrollTop)
              // setTimeout(smoothScroll,10)
                rAF(smoothScroll)
              }
          }else{
              console.log("clearTimeout")
              // clearTimeout(timer)
              callback()
          }
        })
      },
      scrollTop(element,value){
        let isCSS1Compat = (document.compatMode === 'CSS1Compat');
        let supportPageOffset = window.pageYOffset !== undefined;
        var scrollTop,scrollLeft;
        if(element === window){
          scrollTop = supportPageOffset ? window.pageYOffset : 
                          isCSS1Compat? document.documentElement.scrollTop:
                          document.body.scrollTop;
          scrollLeft = supportPageOffset ? window.pageXOffset : 
                        isCSS1Compat? document.documentElement.scrollLeft:
                        document.body.scrollLeft;
        }else{
          scrollTop = element.scrollTop;
          scrollLeft = element.scrollLeft;
        }
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
          dom.unbindEvent(scrollTarget,"touchstart",cancelScroll);
          // scrollInProgress = false;
      }
      dom.bindEvent(scrollTarget,"touchstart",cancelScroll);

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
    },
    hasNode(node,parent){
      while(node){
        if(node === parent){
          return true;
        }
        node = node.parentNode;
      }
      return false;
    }
}

export default dom;