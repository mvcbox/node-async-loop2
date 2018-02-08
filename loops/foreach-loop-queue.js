'use strict';

var returnValue = require('../return-value');

/**
 * @param {Object} iterable
 * @param {Function} iterator
 * @param {Number} index
 * @param {Number} to
 * @param {Array} keys
 * @param {Object} queue
 * @param {Function} callback
 */
function callObjectIterator(iterable, iterator, index, to, keys, queue, callback) {
    queue.push(function (next) {
        var key = keys[index];

        iterator(key, iterable[key], function (breakFlag) {
            breakFlag || ++index >= to ? callback() : callObjectIterator(iterable, iterator, index, to, keys, queue, callback);
            next();
        });
    });
}

/**
 * @param {Array} iterable
 * @param {Function} iterator
 * @param {Number} index
 * @param {Number} to
 * @param {Object} queue
 * @param {Function} callback
 */
function callArrayIterator(iterable, iterator, index, to, queue, callback) {
    queue.push(function (next) {
        iterator(index, iterable[index], function (breakFlag) {
            breakFlag || ++index >= to ? callback() : callArrayIterator(iterable, iterator, index, to, queue, callback);
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
     * @param {Array|Object} iterable
     * @param {Function} iterator
     * @param {Function} callback
     */
    return function (iterable, iterator, callback) {
        return returnValue(callback, function (callback) {
            if (Array.isArray(iterable)) {
                return iterable.length ? callArrayIterator(iterable, iterator, 0, iterable.length, options.queue, callback) : callback();
            }

            var keys = Object.keys(iterable);
            keys.length ? callObjectIterator(iterable, iterator, 0, keys.length, keys, options.queue, callback) : callback();
        });
    };
};
