/**
 * @file: 1.1
 * @author: gejiawen
 * @date: 15/10/27 00:12
 * @description: 1.1
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
 * 并行执行，集合中所有的元素都<=10，所以为true
 */
async.every(arr, function (item, callback) {
    log('1.1 enter: ', item);
    setTimeout(function () {
        log('1.1 handle: ', item);
        callback(item <= 10);
    }, 200);
}, function (result) {
    log('1.1 result: ', result);
});

//58.711> 1.1 enter: 1
//58.720> 1.1 enter: 2
//58.720> 1.1 enter: 3
//58.720> 1.1 enter: 6
//58.924> 1.1 handle: 1
//58.925> 1.1 handle: 2
//58.925> 1.1 handle: 3
//58.925> 1.1 handle: 6
//58.926> 1.1 result: true
