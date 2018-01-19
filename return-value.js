'use strict';

var Promise = require('bluebird');

/**
 * @param {Function} callback
 * @param {Function} result
 * @return {Promise|undefined}
 */
module.exports = function(callback, result) {
    if (typeof callback === 'function') {
        return result(callback);
    }

    return new Promise(function (resolve, reject) {
        result(resolve);
    });
};
