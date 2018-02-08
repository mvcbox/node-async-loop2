'use strict';

var returnValue = require('../return-value');

/**
 * @param {Function} iterator
 * @param {Function} scheduler
 * @param {Function} callback
 */
function callIterator(iterator, scheduler, callback) {
    iterator(function (breakFlag) {
        if (breakFlag) {
            return callback();
        }

        scheduler(function () {
            callIterator(iterator, scheduler, callback);
        });
    });
}

/**
 * @param {Object} options
 * @return {Function}
 */
module.exports = function (options) {
    /**
     * @param {Function} iterator
     * @param {Function} callback
     */
    return function (iterator, callback) {
        return returnValue(callback, function (callback) {
            callIterator(iterator, options.scheduler, callback);
        });
    };
};
