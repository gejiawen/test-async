/**
 * @file: 1.2
 * @author: gejiawen
 * @date: 15/10/23 16:40
 * @description: 1.2
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
 * 串行执行，对arr进行筛选。
 */
async.filterSeries(arr, function (item, callback) {
    log('1.2 enter: ' + item);
    setTimeout(function () {
        log('1.2 handle: ' + item);
        callback(item >= 3);
    }, 200);
}, function (results) {
    log('1.3 results: ', results);
});

// 输出如下
//49.667> 1.2 enter: 1
//49.880> 1.2 handle: 1
//49.881> 1.2 enter: 2
//50.087> 1.2 handle: 2
//50.087> 1.2 enter: 3
//50.291> 1.2 handle: 3
//50.291> 1.2 enter: 4
//50.492> 1.2 handle: 4
//50.492> 1.2 enter: 5
//50.696> 1.2 handle: 5
//50.698> 1.3 results: [ 3, 4, 5 ]
