/**
 * @file: 1.3
 * @author: gejiawen
 * @date: 15/10/27 00:16
 * @description: 1.3
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
 * 并行执行，最大允许2个任务并行执行
 * 集合中所有的元素都<=10，所以为true
 */
async.everyLimit(arr, 2, function (item, callback) {
    log('1.3 enter: ', item);
    setTimeout(function () {
        log('1.3 handle: ', item);
        callback(item <= 10);
    }, 200);
}, function (result) {
    log('1.3 result: ', result);
});

//50.382> 1.3 enter: 1
//50.389> 1.3 enter: 2
//50.595> 1.3 handle: 1
//50.596> 1.3 enter: 3
//50.596> 1.3 handle: 2
//50.596> 1.3 enter: 6
//50.802> 1.3 handle: 3
//50.803> 1.3 handle: 6
//50.803> 1.3 result: true
