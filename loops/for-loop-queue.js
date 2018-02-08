'use strict';

var returnValue = require('../return-value');

/**
 * @param {Number} index
 * @param {Number} to
 * @param {Function} iterator
 * @param {Object} queue
 * @param {Function} callback
 */
function callIterator(index, to, iterator, queue, callback) {
    queue.push(function (next) {
        iterator(index, function (breakFlag) {
            breakFlag || ++index >= to ? callback() : callIterator(index, to, iterator, queue, callback);
            next();
        });
    });
}

/**
 * @param {Object} options
 * @return {Function}
 */
module.exports = function (options) {
    /**
     * @param {Number} index
     * @param {Number} to
     * @param {Function} iterator
     * @param {Function} callback
     */
    return function (index, to, iterator, callback) {
        return returnValue(callback, function (callback) {
            index < to ? callIterator(index, to, iterator, options.queue, callback) : callback();
        });
    };
};
