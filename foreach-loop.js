'use strict';

/**
 * @param {Object} iterable
 * @param {Function} iterator
 * @param {Number} index
 * @param {Number} to
 * @param {Array} keys
 * @param {Function} callback
 */
function callObjectIterator(iterable, iterator, index, to, keys, callback) {
    var key = keys[index];

    iterator(key, iterable[key], function (breakFlag) {
        if (breakFlag || ++index >= to) {
            return callback();
        }

        process.nextTick(function () {
            callObjectIterator(iterable, iterator, index, to, keys, callback);
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
    iterator(index, iterable[index], function (breakFlag) {
        if (breakFlag || ++index >= to) {
            return callback();
        }

        process.nextTick(function () {
            callArrayIterator(iterable, iterator, index, to, callback);
        });
    });
}

/**
 * @param {Array|Object} iterable
 * @param {Function} iterator
 * @param {Function} callback
 */
module.exports = function (iterable, iterator, callback) {
    if (Array.isArray(iterable)) {
        return iterable.length ? callArrayIterator(iterable, iterator, 0, iterable.length, callback) : callback();
    }

    var keys = Object.keys(iterable);
    keys.length ? callObjectIterator(iterable, iterator, 0, keys.length, keys, callback) : callback();
};
