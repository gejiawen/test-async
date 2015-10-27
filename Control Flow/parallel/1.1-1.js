/**
 * @file: 1.1-1
 * @author: gejiawen
 * @date: 15/10/27 15:04
 * @description: 1.1-1
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
 * 如果中途有个函数出错，则将该err和已经完成的函数值汇成一个数组，传给最终的callback。
 * 还没有执行完的函数的值将被忽略，但要在最终数组中占个位置
 */
async.parallel([
    function (cb) {
        // 该函数的值不会传给最终callback，但要占个位置
        t.fire2('a400', cb, 400)
    },
    function (cb) {
        t.err2('e200', cb, 200)
    },
    function (cb) {
        t.fire2('a100', cb, 100)
    }
], function (err, results) {
    log('1.1-1 err: ', err);
    log('1.1-1 results: ', results);
});

//53.054> enter: "a400", delay: 400
//53.062> enter: e200, delay: 200
//53.063> enter: "a100", delay: 100
//53.166> handle: "a100", delay: 100
//53.266> handle: e200, delay: 200
//53.267> 1.1-1 err: e200
//53.267> 1.1-1 results: [ , undefined, 'a100' ]
//53.468> handle: "a400", delay: 400
