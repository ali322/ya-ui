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
            window.scrollTo(scrollLeft,value);
        }
        return scrollTop;
    }
}
