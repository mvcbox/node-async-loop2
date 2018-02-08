'use strict';

var returnValue = require('../return-value');

/**
 * @param {Object} iterable
 * @param {Function} iterator
 * @param {Number} index
 * @param {Number} to
 * @param {Array} keys
 * @param {Function} scheduler
 * @param {Function} callback
 */
function callObjectIterator(iterable, iterator, index, to, keys, scheduler, callback) {
    var key = keys[index];

    iterator(key, iterable[key], function (breakFlag) {
        if (breakFlag || ++index >= to) {
            return callback();
        }

        scheduler(function () {
            callObjectIterator(iterable, iterator, index, to, keys, scheduler, callback);
        });
    });
}

/**
 * @param {Array} iterable
 * @param {Function} iterator
 * @param {Number} index
 * @param {Number} to
 * @param {Function} scheduler
 * @param {Function} callback
 */
function callArrayIterator(iterable, iterator, index, to, scheduler, callback) {
    iterator(index, iterable[index], function (breakFlag) {
        if (breakFlag || ++index >= to) {
            return callback();
        }

        scheduler(function () {
            callArrayIterator(iterable, iterator, index, to, scheduler, callback);
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
                return iterable.length ? callArrayIterator(iterable, iterator, 0, iterable.length, options.scheduler, callback) : callback();
            }

            var keys = Object.keys(iterable);
            keys.length ? callObjectIterator(iterable, iterator, 0, keys.length, keys, options.scheduler, callback) : callback();
        });
    };
};
