'use strict';

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
    if (index >= to) {
        return callback();
    }

    callIterator(index, to, iterator, callback);
};
