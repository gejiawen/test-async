/**
 * @file: 1.1
 * @author: gejiawen
 * @date: 15/10/27 17:31
 * @description: 1.1
 */

var async = require('async');
var t = require('../../t');
var log = t.log;

/**
 * 创建一个包括一组异步函数的函数集合，每个函数会消费上一次函数的返回值。
 * 把f(),g(),h()异步函数，组合成f(g(h()))的形式，通过callback得到返回值。
 */
// compose(fn1, fn2...)

/**
 * 通过compose组合，f(g(h()))的形式，从内层到外层的执行的顺序。
 */

function f(n, callback) {
    log('1.1.f enter: ', n);
    setTimeout(function () {
        log('1.1.f handle: ', n);
        callback(null, n + 1);
    }, 600);
}

function g(n, callback) {
    log('1.1.g enter: ', n);
    setTimeout(function () {
        log('1.1.g handle: ', n);
        callback(null, n * 2);
    }, 400);
}

function h(n, callback) {
    log('1.1.h enter: ', n);
    setTimeout(function () {
        log('1.1.h handle: ', n);
        callback(null, n - 10);
    }, 200);
}


var fgh = async.compose(f, g, h);

fgh(4, function (err, result) {
    log('1.1 err: ', err);
    log('1.1 result: ', result);
});


//16.773> 1.1.h enter: 4
//16.986> 1.1.h handle: 4
//16.987> 1.1.g enter: -6
//17.392> 1.1.g handle: -6
//17.393> 1.1.f enter: -12
//17.996> 1.1.f handle: -12
//17.997> 1.1 err: null
//17.997> 1.1 result: -11
