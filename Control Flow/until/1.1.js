/**
 * @file: 1.1
 * @author: gejiawen
 * @date: 15/10/27 16:08
 * @description: 1.1
 */

var async = require('async');
var t = require('../../t');
var log = t.log;

/**
 * until与whilst正好相反，当test为false时循环继续，为true时终止循环。其它特性一致。
 */
// 1.5
var count5 = 0;
async.until(
    function () {
        log('1.1 test: ', count5);
        return count5 > 3
    },
    function (cb) {
        log('1.1 enter: ', count5);
        count5++;
        setTimeout(function() {
            log('1.1 handle: ', count5);
            cb();
        }, 200);
    },
    function (err) {
        log('1.1 err: ', err);
    }
);

//49.034> 1.1 test: 0
//49.042> 1.1 enter: 0
//49.246> 1.1 handle: 1
//49.247> 1.1 test: 1
//49.248> 1.1 enter: 1
//49.452> 1.1 handle: 2
//49.452> 1.1 test: 2
//49.453> 1.1 enter: 2
//49.657> 1.1 handle: 3
//49.658> 1.1 test: 3
//49.658> 1.1 enter: 3
//49.863> 1.1 handle: 4
//49.863> 1.1 test: 4
//49.864> 1.1 err: null
