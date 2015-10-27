/**
 * @file: 1.2
 * @author: gejiawen
 * @date: 15/10/27 17:47
 * @description: 1.2
 */

var async = require('async');
var t = require('../../t');
var log = t.log;

/**
 * applyEach，可以实现给一数组中每个函数传相同参数，通过callback返回。
 * 如果只传第一个参数，将返回一个函数对象，我可以传参调用。
 */
// applyEach(fns, args..., callback)

/**
 *  异步执行，当只设置第一参数后，得到函数对象，再传参调用这个函数。
 */
var fn = async.applyEach([
    function (name, cb) {
        log("1.2 enter: " + name + " A");
        setTimeout(function () {
            log("1.2 handler: " + name + " A");
        }, 500);
    }, function (name, cb) {
        log("1.2 enter: " + name + " B");
        setTimeout(function () {
            log("1.2 handler: " + name + " B");
        }, 150);
    }
]);

fn("single", function (err) {
    log('err: ', err);
});

//24.343> 1.2 enter: single A
//24.351> 1.2 enter: single B
//24.505> 1.2 handler: single B
//24.853> 1.2 handler: single A
