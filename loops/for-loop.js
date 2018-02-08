'use strict';

var returnValue = require('../return-value');

/**
 * @param {Number} index
 * @param {Number} to
 * @param {Function} iterator
 * @param {Function} scheduler
 * @param {Function} callback
 */
function callIterator(index, to, iterator, scheduler, callback) {
    iterator(index, function (breakFlag) {
        if (breakFlag || ++index >= to) {
            return callback();
        }

        scheduler(function () {
            callIterator(index, to, iterator, scheduler, callback);
        });
    });
}

/**
 * @param {Object} options
 * @return {Function}
 */
module.exports = function (options) {
    /**
     * @param {Number} index
     * @param {Number} to
     * @param {Function} iterator
     * @param {Function} callback
     */
    return function (index, to, iterator, callback) {
        return returnValue(callback, function (callback) {
            index < to ? callIterator(index, to, iterator, options.scheduler, callback) : callback();
        });
    };
};
