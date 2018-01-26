'use strict';

var returnValue = require('./return-value');
var queue = require('./queue');

/**
 * @param {Object} iterable
 * @param {Function} iterator
 * @param {Number} index
 * @param {Number} to
 * @param {Array} keys
 * @param {Function} callback
 */
function callObjectIterator(iterable, iterator, index, to, keys, callback) {
    queue.push(function (next) {
        var key = keys[index];

        iterator(key, iterable[key], function (breakFlag) {
            breakFlag || ++index >= to ? callback() : callObjectIterator(iterable, iterator, index, to, keys, callback);
            next();
        });
    });
}

/**
 * @param {Array} iterable
 * @param {Function} iterator
 * @param {Number} index
 * @param {Number} to
 * @param {Function} callback
 */
function callArrayIterator(iterable, iterator, index, to, callback) {
    queue.push(function (next) {
        iterator(index, iterable[index], function (breakFlag) {
            breakFlag || ++index >= to ? callback() : callArrayIterator(iterable, iterator, index, to, callback);
            next();
        });
    });
}

/**
 * @param {Array|Object} iterable
 * @param {Function} iterator
 * @param {Function} callback
 */
module.exports = function (iterable, iterator, callback) {
    return returnValue(callback, function (callback) {
        if (Array.isArray(iterable)) {
            return iterable.length ? callArrayIterator(iterable, iterator, 0, iterable.length, callback) : callback();
        }

        var keys = Object.keys(iterable);
        keys.length ? callObjectIterator(iterable, iterator, 0, keys.length, keys, callback) : callback();
    });
};
