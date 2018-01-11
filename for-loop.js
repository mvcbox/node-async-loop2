'use strict';

function callIterator(from, to, iterator, callback) {
    iterator(from, function (breakFlag) {
        if (breakFlag || ++from > to) {
            callback();
        } else {
            process.nextTick(function () {
                callIterator(from, to, iterator, callback);
            });
        }
    });
}

/**
 * @param {Number} from
 * @param {Number} to
 * @param {Function} iterator
 * @param {Function} callback
 */
module.exports = function (from, to, iterator, callback) {
    if (from > to) {
        return callback();
    }
    callIterator(from, to, iterator, callback);
};
