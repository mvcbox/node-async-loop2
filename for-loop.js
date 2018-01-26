'use strict';

var returnValue = require('./return-value');
var queue = require('./queue');

/**
 * @param {Number} index
 * @param {Number} to
 * @param {Function} iterator
 * @param {Function} callback
 */
function callIterator(index, to, iterator, callback) {
    queue.push(function (next) {
        iterator(index, function (breakFlag) {
            breakFlag || ++index >= to ? callback() : callIterator(index, to, iterator, callback);
            next();
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
