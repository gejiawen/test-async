/**
 * @file: 1.1
 * @author: gejiawen
 * @date: 15/10/28 14:44
 * @description: 1.1
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
 * 通过名字绑定函数t.inc, t.fire，作为新函数给parallel调用
 */
async.parallel([
    async.apply(t.inc, 3),
    async.apply(t.fire, 100)
], function (err, results) {
    log('1.1 err: ', err);
    log('1.1 results: ', results);
});

//19.653> 1.1 err: null
//19.660> 1.1 results: [ 4, 100 ]

