/**
 * @file: 2.1
 * @author: gejiawen
 * @date: 15/10/27 16:29
 * @description: 2.1
 */
var async = require('async');
var t = require('../../t');
var log = t.log;

/**
 * 跟doWhilst类似,不过during的第一个参数也要求是一个异步调用
 *
 * 也就是说test和fn是并行执行的
 *
 *
 */
// doDuring(fn, test, callback)

var count = 0;
async.doDuring(
    function (cb) {
        log('2.1 enter: ', count);
        count++;
        setTimeout(function () {
            log('2.1 handle: ', count);
            cb();
        }, 200);
    },
    function (cb) {
        log('2.1 test start: ', count);
        return cb(null, count < 5);
    },
    function (err) {
        log('2.1 err: ', err);
    }
);

//43.191> 2.1 enter: 0
//43.403> 2.1 handle: 1
//43.406> 2.1 test start: 1
//43.406> 2.1 enter: 1
//43.609> 2.1 handle: 2
//43.610> 2.1 test start: 2
//43.610> 2.1 enter: 2
//43.815> 2.1 handle: 3
//43.815> 2.1 test start: 3
//43.815> 2.1 enter: 3
//44.018> 2.1 handle: 4
//44.019> 2.1 test start: 4
//44.019> 2.1 enter: 4
//44.225> 2.1 handle: 5
//44.225> 2.1 test start: 5
//44.226> 2.1 err: null
