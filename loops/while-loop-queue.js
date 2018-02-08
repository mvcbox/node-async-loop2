'use strict';

var returnValue = require('../return-value');

/**
 * @param {Function} iterator
 * @param {Object} queue
 * @param {Function} callback
 */
function callIterator(iterator, queue, callback) {
    queue.push(function (next) {
        iterator(function (breakFlag) {
            breakFlag ? callback() : callIterator(iterator, queue, callback);
            next();
        });
    });
}

/**
 * @param {Option} options
 * @return {Function}
 */
module.exports = function (options) {
    /**
     * @param {Function} iterator
     * @param {Function} callback
     */
    return function (iterator, callback) {
        return returnValue(callback, function (callback) {
            callIterator(iterator, options.queue, callback);
        });
    };
};
