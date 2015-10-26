/**
 * @file: 1.1-1
 * @author: gejiawen
 * @date: 15/10/26 23:33
 * @description: 1.1-1
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
 * 迭代出错，callback返回err，没有results
 */
async.sortBy(arr, function (item, callback) {
    log('1.1-1 enter: ' + item);
    setTimeout(function () {
        log('1.1-1 handle: ' + item);
        if (item === 6) {
            callback('myerr');
        } else {
            callback(null, item);
        }
    }, 200);
}, function (err, results) {
    log('1.1-1 err: ', err);
    log('1.1-1 results: ', results);
});

//53.403> 1.1-1 enter: 3
//53.411> 1.1-1 enter: 6
//53.411> 1.1-1 enter: 1
//53.612> 1.1-1 handle: 3
//53.612> 1.1-1 handle: 6
//53.613> 1.1-1 err: myerr
//53.613> 1.1-1 results:
//53.613> 1.1-1 handle: 1
