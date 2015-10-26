/**
 * @file: 2.1
 * @author: gejiawen
 * @date: 15/10/26 23:00
 * @description: 2.1
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
 * 顺序执行从右向左
 *
 * alias: foldr
 */
async.reduceRight(arr, 100, function (memo, item, callback) {
    log('2.1 enter: ' + memo + ', ' + item);
    setTimeout(function () {
        callback(null, memo + item);
    }, 100);
}, function (err, result) {
    log('2.1 err: ', err);
    log('2.1 result: ', result);
});

//59.447> 2.1 enter: 100, 5
//59.558> 2.1 enter: 105, 3
//59.662> 2.1 enter: 108, 1
//59.764> 2.1 err: null
//59.766> 2.1 result: 109
