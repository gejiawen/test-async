/**
 * @file: 1.1
 * @author: gejiawen
 * @date: 15/10/26 22:54
 * @description: 1.1
 */

var async = require('async');

var t = require('../../t');
var log = t.log;

/**
 * Reduce可以让我们给定一个初始值，用它与集合中的每一个元素做运算，最后得到一个值。
 * reduce从左向右来遍历元素，如果想从右向左，可使用reduceRight。
 */
//reduce(arr, memo, iterator(memo,item,callback), callback(err,result))
//alias: inject, foldl

var arr = [1, 3, 5];

/**
 * 顺序执行
 */
async.reduce(arr, 100, function (memo, item, callback) {
    log('1.1 enter: ' + memo + ', ' + item);
    setTimeout(function () {
        callback(null, memo + item);
    }, 100);
}, function (err, result) {
    log('1.1 err: ', err);
    log('1.1 result: ', result);
});

//03.537> 1.1 enter: 100, 1
//03.647> 1.1 enter: 101, 3
//03.752> 1.1 enter: 104, 5
//03.857> 1.1 err: null
//03.859> 1.1 result: 109
