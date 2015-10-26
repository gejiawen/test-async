/**
 * @file: 2.2
 * @author: gejiawen
 * @date: 15/10/26 23:02
 * @description: 2.2
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
 *  通过t.inc做一个累加器，参与reduce的计算
 *
 *  通过t.inc将数组的每一个元素先自增1,然后再经过reduce进行累加运算
 */
async.reduce(arr, 100, function (memo, item, callback) {
    log('2.2 enter: ' + memo + ',' + item);
    t.inc(item, function (err, n) {
        log('2.2 handle: ', n);
        callback(null, memo + n);
    });
}, function (err, result) {
    log('2.2 err: ', err);
    log('2.2 result: ', result);
});

//45.293> 2.2 enter: 100,1
//45.504> 2.2 handle: 2
//45.506> 2.2 enter: 102,3
//45.715> 2.2 handle: 4
//45.715> 2.2 enter: 106,5
//45.920> 2.2 handle: 6
//45.920> 2.2 err: null
//45.921> 2.2 result: 112
