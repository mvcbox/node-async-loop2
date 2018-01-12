'use strict';

function callIterator(iterable, iterator, index, keys, callback) {
    var key = keys[index];
    iterator(key, iterable[key], function (breakFlag) {
        if (breakFlag || ++index >= keys.length) {
            return callback();
        }
        process.nextTick(function () {
            callIterator(iterable, iterator, index, keys, callback);
        });
    });
}

/**
 * @param {Array|Object} iterable
 * @param {Function} iterator
 * @param {Function} callback
 */
module.exports = function (iterable, iterator, callback) {
    var keys = Object.keys(iterable);
    if (!keys.length) {
        return callback();
    }
    callIterator(iterable, iterator, 0, keys, callback);
};
