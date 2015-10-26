/**
 * @file: 1.3
 * @author: gejiawen
 * @date: 15/10/27 00:10
 * @description: 1.3
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
 * 并行执行，最大运行2个任务并行
 * 集合中至少有一个元素===3，所以结果为true
 * 当匹配到条件时,立马执行callback
 *
 */
async.someLimit(arr, 2, function (item, callback) {
    log('1.3 enter: ', item);
    setTimeout(function () {
        log('1.3 handle: ', item);
        callback(item === 3);
    }, 200);
}, function (result) {
    log('1.3 result: ', result);
});

//12.265> 1.3 enter: 1
//12.275> 1.3 enter: 2
//12.476> 1.3 handle: 1
//12.477> 1.3 enter: 3
//12.477> 1.3 handle: 2
//12.478> 1.3 enter: 6
//12.683> 1.3 handle: 3
//12.684> 1.3 result: true
//12.684> 1.3 handle: 6
