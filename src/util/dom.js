'use strict'
module.exports = {
    scrollTop(){
        let isCSS1Compat = (document.compatMode === 'CSS1Compat');
        let supportPageOffset = window.pageYOffset !== undefined;
        let scrollTop = supportPageOffset ? window.pageYOffset : 
                        isCSS1Compat? document.documentElement.scrollTop:
                        document.body.scrollTop;
        return scrollTop;
    }
}
