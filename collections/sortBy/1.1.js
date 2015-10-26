/**
 * @file: 1.1
 * @author: gejiawen
 * @date: 15/10/26 23:32
 * @description: 1.1
 */

var async = require('async');

var t = require('../../t');
var log = t.log;

/**
 * 对集合内的元素进行排序，依据每个元素进行某异步操作后产生的值，从小到大排序。
 */
// sortBy(array, iterator(item,callback(err,result)), callback(err,results))

var arr = [3, 6, 1];

/**
 * 通过异步迭代器，对集合进行排序
 */
async.sortBy(arr, function (item, callback) {
    log('1.1 enter: ' + item);
    setTimeout(function () {
        log('1.1 handle: ' + item);
        callback(null, item);
    }, 200);
}, function (err, results) {
    log('1.1 err: ', err);
    log('1.1 results: ', results);
});

//31.202> 1.1 enter: 3
//31.209> 1.1 enter: 6
//31.209> 1.1 enter: 1
//31.410> 1.1 handle: 3
//31.411> 1.1 handle: 6
//31.411> 1.1 handle: 1
//31.413> 1.1 err: null
//31.414> 1.1 results: [ 1, 3, 6 ]

