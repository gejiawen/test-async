/**
 * @file: 1.1
 * @author: gejiawen
 * @date: 15/10/27 00:03
 * @description: 1.1
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
 * 并行执行，集合中至少有一个元素===3，所以结果为true
 * 当匹配到条件时,立马执行callback
 *
 */
async.some(arr, function (item, callback) {
    log('1.1 enter: ', item);
    setTimeout(function () {
        log('1.1 handle: ', item);
        callback(item === 3);
    }, 200);
}, function (result) {
    log('1.1 result: ', result);
});

//57.071> 1.1 enter: 1
//57.081> 1.1 enter: 2
//57.081> 1.1 enter: 3
//57.081> 1.1 enter: 6
//57.285> 1.1 handle: 1
//57.287> 1.1 handle: 2
//57.287> 1.1 handle: 3
//57.287> 1.1 result: true
//57.288> 1.1 handle: 6
