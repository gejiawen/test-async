/**
 * @file: 1.1
 * @author: gejiawen
 * @date: 15/10/23 16:14
 * @description: 1.1
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
 * 并行执行，对arr进行筛选。
 */
async.filter(arr, function (item, callback) {
    log('1.1 enter: ' + item);
    setTimeout(function () {
        log('1.1 test: ' + item);
        callback(item >= 3);
    }, 200);
}, function (results) {
    log('1.1 results: ', results);
});

// 输出如下
//45.013> 1.1 enter: 1
//45.021> 1.1 enter: 2
//45.021> 1.1 enter: 3
//45.022> 1.1 enter: 4
//45.022> 1.1 enter: 5
//45.225> 1.1 test: 1
//45.225> 1.1 test: 2
//45.226> 1.1 test: 3
//45.226> 1.1 test: 4
//45.226> 1.1 test: 5
//45.228> 1.1 results: [ 3, 4, 5 ]
