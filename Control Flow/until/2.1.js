/**
 * @file: 2.1
 * @author: gejiawen
 * @date: 15/10/27 16:12
 * @description: 2.1
 */

var async = require('async');
var t = require('../../t');
var log = t.log;

/**
 * doUntil与doWhilst正好相反，当test为false时循环，与true时跳出。其它特性一致。
 */
// doUntil(fn, test, callback)
// 1.6
var count6 = 0;
async.doUntil(
    function (cb) {
        t.inc2(count6++, cb);
    },
    function () {
        log('2.1 test: ', count6);
        return count6 > 3;
    },
    function (err) {
        log('2.1 err: ', err);
    }
);

//54.522> enter: 0, delay: 200
//54.735> handle: 0, delay: 200
//54.736> 2.1 test: 1
//54.737> enter: 1, delay: 200
//54.944> handle: 1, delay: 200
//54.944> 2.1 test: 2
//54.944> enter: 2, delay: 200
//55.148> handle: 2, delay: 200
//55.148> 2.1 test: 3
//55.148> enter: 3, delay: 200
//55.351> handle: 3, delay: 200
//55.351> 2.1 test: 4
//55.351> 2.1 err: null
