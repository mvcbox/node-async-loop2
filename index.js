'use strict';

var Queue = require('plain-queue');

/**
 * @param {Object} options
 */
module.exports = function (options) {
    options = Object.assign({}, options || {});

    if (!options.queue) {
        options.queue = new Queue({
            scheduler: options.queueScheduler
        });
    }

    if (typeof options.scheduler !== 'function') {
        options.scheduler = setImmediate;
    }

    return {
        for: require('./loops/for-loop')(options),
        while: require('./loops/while-loop')(options),
        forEach: require('./loops/foreach-loop')(options),
        forQueue: require('./loops/for-loop-queue')(options),
        whileQueue: require('./loops/while-loop-queue')(options),
        forEachQueue: require('./loops/foreach-loop-queue')(options)
    };
};
