'use strict'
module.exports = {
    scrollTop(element, value) {
        var hasScrollTop = 'scrollTop' in element;
        if (value === undefined) {
            return hasScrollTop ? element.scrollTop : element.pageYOffset;
        }
        hasScrollTop ? element.scrollTop = value : element.scrollTo(element.scrollX, value);
    }
}