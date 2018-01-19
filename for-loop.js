'use strict';

var returnValue = require('./return-value');

/**
 * @param {Number} index
 * @param {Number} to
 * @param {Function} iterator
 * @param {Function} callback
 */
function callIterator(index, to, iterator, callback) {
    iterator(index, function (breakFlag) {
        if (breakFlag || ++index >= to) {
            return callback();
        }

        process.nextTick(function () {
            callIterator(index, to, iterator, callback);
        });
    });
}

/**
 * @param {Number} index
 * @param {Number} to
 * @param {Function} iterator
 * @param {Function} callback
 */
module.exports = function (index, to, iterator, callback) {
    return returnValue(callback, function (callback) {
        index < to ? callIterator(index, to, iterator, callback) : callback();
    });
};
