'use strict'
module.exports = {
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
