/**
 * @file: 1.3
 * @author: gejiawen
 * @date: 15/10/23 16:45
 * @description: 1.3
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
 * 并行执行, 每次最多并行2个操作,，对arr进行筛选。
 */
async.filterLimit(arr, 2, function (item, callback) {
    log('1.3 enter: ' + item);
    setTimeout(function () {
        log('1.3 handle: ' + item);
        callback(item >= 3);
    }, 200);
}, function (results) {
    log('1.3 results: ', results);
});

// 输出如下
//39.048> 1.3 enter: 1
//39.057> 1.3 enter: 2
//39.262> 1.3 handle: 1
//39.263> 1.3 enter: 3
//39.263> 1.3 handle: 2
//39.263> 1.3 enter: 4
//39.467> 1.3 handle: 3
//39.468> 1.3 enter: 5
//39.468> 1.3 handle: 4
//39.672> 1.3 handle: 5
//39.673> 1.3 results: [ 3, 4, 5 ]
