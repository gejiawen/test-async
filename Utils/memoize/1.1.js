/**
 * @file: 1.1
 * @author: gejiawen
 * @date: 15/10/28 16:11
 * @description: 1.1
 */

var async = require('async');
var t = require('../../t');
var log = t.log;

/**
 * 让某一个函数在内存中缓存它的计算结果。对于相同的参数，只计算一次，下次就直接拿到之前算好的结果。
 * hasher可以让我们自定义如何根据参数来判断它是否已经在缓存中了。
 */
// memoize(fn, [hasher])
//1.1
var slow_fn = function (x, y, callback) {
    log('1.1 start working for: ' + x + ',' + y);
    t.wait(500);
    log('1.1 finished: ' + x + ',' + y);
    callback(null, x + ',' + y);
};
var fn = async.memoize(slow_fn, function (x, y) {
    return x + y;
});

fn('a', 'b', function (err, result) {
    log("1.1 first time: " + result);
});
fn('cc', 'd', function (err, result) {
    log("1.1 first time: " + result);
});
fn('a', 'b', function (err, result) {
    log("1.1 second time: " + result);
});

//01.949> 1.1 start working for: a,b
//02.457> 1.1 finished: a,b
//02.457> 1.1 first time: a,b
//02.457> 1.1 start working for: cc,d
//02.959> 1.1 finished: cc,d
//02.959> 1.1 first time: cc,d
//02.959> 1.1 second time: a,b
