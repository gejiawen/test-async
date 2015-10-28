/**
 * @file: 1.2
 * @author: gejiawen
 * @date: 15/10/28 14:46
 * @description: 1.2
 */

var async = require('async');

var t = require('../../t');
var log = t.log;

/**
 * apply是一个非常好用的函数，可以让我们给一个函数预绑定多个参数并生成一个可直接调用的新函数，简化代码。
 *
 * function(callback) { t.inc(3, callback); }
 * 等价于：
 * async.apply(t.inc, 3);
 */
// apply(function, arguments..)

/**
 * 构造一个加法函数，通过apply简化代码
 */
function inc(a, b, callback, timeout) {
    log('1.2 enter: ' + a + ', ' + b);
    timeout = timeout || 200;
    t.wait(1000);
    log('finish wait');
    setTimeout(function () {
        log('1.2 handle: ' + (a + b));
        callback(null, a + b);
    }, timeout);
}
var fn = async.apply(inc, 1, 2);

fn(function (err, n) {
    log('1.2 inc: ' + n);
});

//21.059> 1.2 enter: 1, 2
//22.069> finish wait
//22.274> 1.2 handle: 3
//22.274> 1.2 inc: 3
