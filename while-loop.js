'use strict';

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
    if (!condition()) {
        return callback();
    }
    callIterator(condition, iterator, callback);
};
