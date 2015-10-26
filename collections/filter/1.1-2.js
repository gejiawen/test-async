/**
 * @file: 1.1-2
 * @author: gejiawen
 * @date: 15/10/23 16:30
 * @description: 1.1-2
 */

var async = require('async');

var t = require('../../t');
var log = t.log;

/**
 * 使用异步操作对集合中的元素进行筛选。需要注意的是，iterator的callback只有一个参数，只能接收true或false。
 *
 * 对于出错，该函数没有做出任何处理，直接由nodejs抛出。所以需要注意对Error的处理。
 *
 * async提供了两种方式：
 * 1. 并行执行：filter, filterLimit
 * 2. 顺序执行：filterSereis
 */
// filter(arr, iterator(item, callback(test)), callback(results))

var arr = [1, 2, 3, 4, 5];

/**
 * 如果出错，将会由nodejs抛出，导致出错。
 *
 * try..catch：抓不到这个错误
 */
async.filter(arr, function (item, callback) {
    log('1.1-2 enter: ' + item);
    setTimeout(function () {
        log('1.1-2 handle: ' + item);
        if (item === 2) {
            throw new Error('myerr');
        }
        callback(item >= 3);
    }, 100);
}, function (results) {
    log('1.1-2 results: ', results);
});

