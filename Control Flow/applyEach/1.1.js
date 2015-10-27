/**
 * @file: 1.1
 * @author: gejiawen
 * @date: 15/10/27 17:44
 * @description: 1.1
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
 * 异步执行，给数组中的函数，他们有相同的参数。
 */

async.applyEach([
    function (name, cb) {
        log("1.1 enter: " + name + " A");
        setTimeout(function () {
            log("1.1 handle: " + name + " A");
            cb(null, name);
        }, 500);
    }, function (name, cb) {
        log("1.1 enter: " + name + " B");
        setTimeout(function () {
            log("1.1 handle: " + name + " B");
            cb(null, name);
        }, 150);
    }
], 'Hello', function (err) {
    log('1.1 err: ', err);
});

//25.088> 1.1 enter: Hello A
//25.096> 1.1 enter: Hello B
//25.249> 1.1 handle: Hello B
//25.599> 1.1 handle: Hello A
//25.600> 1.1 err: null
