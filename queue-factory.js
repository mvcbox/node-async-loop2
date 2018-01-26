'use strict';

/**
 * @param {Function} callback
 */
function whileLoop(callback) {
    process.nextTick(function () {
        callback(function (brakeFlag) {
            brakeFlag || whileLoop(callback);
        });
    });
}

/**
 * @constructor
 */
function Queue() {}

/**
 * @type {Array}
 * @private
 */
Queue.prototype._queue = [];

/**
 * @param item
 * @return {Queue}
 */
Queue.prototype.push = function (item) {
    this._queue.push(item);
    if (1 === this._queue.length) {
        this.startLoop();
    }
    return this;
};

/**
 *
 */
Queue.prototype.startLoop = function () {
    var _this = this;
    var item;

    whileLoop(function (next) {
        item = _this._queue.shift();

        if (typeof item !== 'function') {
            return next(!_this._queue.length);
        }

        item(function () {
            next(!_this._queue.length);
        });
    });
};

/**
 * @return {Queue}
 */
module.exports = function () {
    return new Queue;
};
