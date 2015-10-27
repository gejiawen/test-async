/**
 * @file: 1.1-2
 * @author: gejiawen
 * @date: 15/10/27 15:07
 * @description: 1.1-2
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
 * 以json形式传入tasks，最终results也为json
 */
async.parallel({
    a: function (cb) {
        t.fire2('a400', cb, 400)
    },
    b: function (cb) {
        t.fire2('c300', cb, 300)
    }
}, function (err, results) {
    log('1.1-2 err: ', err);
    log('1.1-2 results: ', results);
});

//27.005> enter: "a400", delay: 400
//27.013> enter: "c300", delay: 300
//27.320> handle: "c300", delay: 300
//27.417> handle: "a400", delay: 400
//27.418> 1.1-2 err: null
//27.419> 1.1-2 results: { b: 'c300', a: 'a400' }
