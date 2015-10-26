/**
 * @file: 1.2
 * @author: gejiawen
 * @date: 15/10/26 23:39
 * @description: 1.2
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
 * 可以通过改变排序的基准从而改变排序结果
 */
async.sortBy(arr, function (item, callback) {
    log('1.2 enter: ' + item);
    setTimeout(function () {
        log('1.2 handle: ' + item * -1); //<- x*-1 instead of x, turns the order around
        callback(null, item * -1);
    }, 200);
}, function (err, results) {
    log('1.2 err: ', err);
    log('1.2 results: ', results);
});

//43.172> 1.2 enter: 3
//43.180> 1.2 enter: 6
//43.181> 1.2 enter: 1
//43.381> 1.2 handle: -3
//43.382> 1.2 handle: -6
//43.382> 1.2 handle: -1
//43.384> 1.2 err: null
//43.385> 1.2 results: [ 1, 3, 6 ]
