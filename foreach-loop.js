'use strict';

function callIterator(iterable, iterator, index, keys, callback) {
    var key = keys[index];
    iterator(key, iterable[key], function (breakFlag) {
        if (breakFlag || ++index >= keys.length) {
            callback();
        } else {
            process.nextTick(function () {
                callIterator(iterable, iterator, index, keys, callback);
            });
        }
    });
}

/**
 * @param {Array|Object} iterable
 * @param {Function} iterator
 * @param {Function} callback
 */
module.exports = function (iterable, iterator, callback) {
    callIterator(iterable, iterator, 0, Object.keys(iterable), callback);
};
