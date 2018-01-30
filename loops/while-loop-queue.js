'use strict';

var returnValue = require('../return-value');
var queue = require('../queue');

/**
 * @param {Function} condition
 * @param {Function} iterator
 * @param {Function} callback
 */
function callIterator(condition, iterator, callback) {
    queue.push(function (next) {
        iterator(function (breakFlag) {
            breakFlag || !condition() ? callback() : callIterator(condition, iterator, callback);
            next();
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
