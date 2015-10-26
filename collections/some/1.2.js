/**
 * @file: 1.2
 * @author: gejiawen
 * @date: 15/10/27 00:05
 * @description: 1.2
 */
var async = require('async');

var t = require('../../t');
var log = t.log;

/**
 * 当集合中是否有至少一个元素满足条件时，最终callback得到的值为true，否则为false.
 */
// some(arr, iterator(item,callback(test)), callback(result))
//alias: any

var arr = [1, 2, 3, 6];

/**
 * 并行执行，集合中没有一个元素>10，所以结果为false
 *
 * 当没有匹配到条件时,最后执行最终的回调
 */
async.some(arr, function (item, callback) {
    log('1.2 enter: ', item);
    setTimeout(function () {
        log('1.2 handle: ', item);
        callback(item > 10);
    }, 200);
}, function (result) {
    log('1.2 result: ', result);
});

//29.082> 1.2 enter: 1
//29.090> 1.2 enter: 2
//29.091> 1.2 enter: 3
//29.091> 1.2 enter: 6
//29.291> 1.2 handle: 1
//29.292> 1.2 handle: 2
//29.292> 1.2 handle: 3
//29.292> 1.2 handle: 6
//29.293> 1.2 result: false
