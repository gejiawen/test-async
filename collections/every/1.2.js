/**
 * @file: 1.2
 * @author: gejiawen
 * @date: 15/10/27 00:14
 * @description: 1.2
 */

var async = require('async');

var t = require('../../t');
var log = t.log;

/**
 * 如果集合里每一个元素都满足条件，则传给最终回调的result为true，否则为false
 */
// every(arr, iterator(item,callback), callback(result))
//alias: all

var arr = [1, 2, 3, 6];

/**
 * 串行执行，集合中至少有一个元素不大于2，所以为false
 *
 * 第一个元素为1,已经不满足条件,所以会立马执行最终的回调,输出false
 */
async.every(arr, function (item, callback) {
    log('1.2 enter: ', item);
    setTimeout(function () {
        log('1.2 handle: ', item);
        callback(item > 2);
    }, 100);
}, function (result) {
    log('1.2 result: ', result);
});

//57.619> 1.2 enter: 1
//57.627> 1.2 enter: 2
//57.627> 1.2 enter: 3
//57.627> 1.2 enter: 6
//57.729> 1.2 handle: 1
//57.730> 1.2 result: false
//57.731> 1.2 handle: 2
//57.731> 1.2 handle: 3
//57.731> 1.2 handle: 6
