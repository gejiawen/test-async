/**
 * @file: 2.1
 * @author: gejiawen
 * @date: 15/10/28 16:16
 * @description: 2.1
 */

var async = require('async');
var t = require('../../t');
var log = t.log;

/**
 * 让已经被缓存的函数，返回不缓存的函数引用。
 */
// unmemoize(fn)

var slow_fn2 = function (x, y, callback) {
    log('2.1 start working for: ' + x + ',' + y);
    t.wait(500);
    log('2.1 finished: ' + x + ',' + y);
    callback(null, x + ',' + y);
};

var fn2 = async.memoize(slow_fn2, function (x, y) {
    return x + y;
});

fn2('a', 'b', function (err, result) {
    log("2.1 first time: " + result);
});

var unFn2 = async.unmemoize(fn2);
log('2.1 unmemoized');

unFn2('a', 'b', function (err, result) {
    log("2.1 second time: " + result);
});

//39.412> 2.1 start working for: a,b
//39.921> 2.1 finished: a,b
//39.921> 2.1 first time: a,b
//39.921> 2.1 unmemoized
//39.922> 2.1 start working for: a,b
//40.423> 2.1 finished: a,b
//40.423> 2.1 second time: a,b
