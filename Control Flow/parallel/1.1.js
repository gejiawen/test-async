/**
 * @file: 1.1
 * @author: gejiawen
 * @date: 15/10/27 14:47
 * @description: 1.1
 */
var async = require('async');
var t = require('../../t');
var log = t.log;

/**
 * 并行执行多个函数，每个函数都是立即执行，不需要等待其它函数先执行。传给最终callback的数组中的数据按照tasks中声明的顺序，而不是执行完成的顺序。
 *
 * 如果某个函数出错，则立刻将err和已经执行完的函数的结果值传给parallel最终的callback。其它未执行完的函数的值不会传到最终数据，但要占个位置。
 * 同时支持json形式的tasks，其最终callback的结果也为json形式。
 */

/**
 * 并行执行多个函数，每个函数的值将按函数声明的先后顺序汇成一个数组，传给最终callback。
 */
async.parallel([
    function (cb) {
        t.fire2('a400', cb, 400)
    },
    function (cb) {
        t.fire2('a200', cb, 200)
    },
    function (cb) {
        t.fire2('a300', cb, 300)
    }
], function (err, results) {
    log('1.1 err: ', err);
    log('1.1 results: ', results);
});

//21.691> enter: "a400", delay: 400
//21.698> enter: "a200", delay: 200
//21.699> enter: "a300", delay: 300
//21.903> handle: "a200", delay: 200
//22.002> handle: "a300", delay: 300
//22.102> handle: "a400", delay: 400
//22.102> 1.1 err: null
//22.104> 1.1 results: [ 'a400', 'a200', 'a300' ]

