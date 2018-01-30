
'use strict';

var returnValue = require('../return-value');

/**
 * @param {Function} condition
 * @param {Function} iterator
 * @param {Function} callback
 */
function callIterator(condition, iterator, callback) {
    iterator(function (breakFlag) {
        if (breakFlag || !condition()) {
            return callback();
        }

        process.nextTick(function () {
            callIterator(condition, iterator, callback);
        });
    });
}

/**
 * @param {Function} condition
 * @param {Function} iterator
 * @param {Function} callback
 */
module.exports = function (condition, iterator, callback) {
    return returnValue(callback, function (callback) {
        condition() ? callIterator(condition, iterator, callback) : callback();
    });
};
