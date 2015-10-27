/**
 * @file: 1.1
 * @author: gejiawen
 * @date: 15/10/27 16:24
 * @description: 1.1
 */

var async = require('async');
var t = require('../../t');
var log = t.log;

/**
 * 跟whilst类似,不过during的第一个参数也要求是一个异步调用
 *
 * 也就是说test和fn是并行执行的
 *
 *
 */
// during(test, fn, callback)

var count = 0;
async.during(
    function (cb) {
        log('1.1 test start: ', count);
        return cb(null, count < 5);
    },
    function (cb) {
        log('1.1 enter: ', count);
        count++;
        setTimeout(function () {
            log('1.1 handle: ', count);
            cb();
        }, 200);
    },
    function (err) {
        log('1.1 err: ', err);
    }
);

//12.309> 1.1 test start: 0
//12.319> 1.1 enter: 0
//12.522> 1.1 handle: 1
//12.523> 1.1 test start: 1
//12.523> 1.1 enter: 1
//12.724> 1.1 handle: 2
//12.724> 1.1 test start: 2
//12.725> 1.1 enter: 2
//12.926> 1.1 handle: 3
//12.927> 1.1 test start: 3
//12.927> 1.1 enter: 3
//13.129> 1.1 handle: 4
//13.129> 1.1 test start: 4
//13.129> 1.1 enter: 4
//13.336> 1.1 handle: 5
//13.336> 1.1 test start: 5
//13.336> 1.1 err: null
