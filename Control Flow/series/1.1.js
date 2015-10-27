/**
 * @file: 1.1
 * @author: gejiawen
 * @date: 15/10/27 11:32
 * @description: 1.1
 */

var async = require('async');

var t = require('../../t');
var log = t.log;

/**
 * 串行执行，一个函数数组中的每个函数，每一个函数执行完成之后才能执行下一个函数。
 *
 * 如果任何一个函数向它的回调函数中传了一个error，则后面的函数都不会被执行，并且会立刻将该error以及已经执行了的函数的结果，传给series中最后那个callback。
 * 当所有的函数执行完后（没有出错），则会把每个函数传给其回调函数的结果合并为一个数组，传给series最后的那个callback。
 * 最后的结果顺序跟函数数组的顺序一致.
 * 还可以json的形式来提供tasks。每一个属性都会被当作函数来执行，并且结果也会以json形式传给series最后的那个callback。这种方式可读性更高一些。
 */
// series(tasks, [callback])

/**
 * 全部函数都正常执行。每个函数产生的值将按顺序合并为一个数组，传给最终的callback。
 */
async.series([
    function (cb) {
        t.inc2(3, cb);
    },
    function (cb) {
        t.inc2(8, cb);
    },
    function (cb) {
        t.inc2(2, cb);
    }
], function (err, results) {
    log('1.1 err: ', err);
    log('1.1 results: ', results);
});

//19.383> enter: 3, delay: 200
//19.594> handle: 3, delay: 200
//19.595> enter: 8, delay: 200
//19.801> handle: 8, delay: 200
//19.802> enter: 2, delay: 200
//20.008> handle: 2, delay: 200
//20.009> 1.1 err: null
//20.010> 1.1 results: [ 4, 9, 3 ]
