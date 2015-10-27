/**
 * @file: 2.1
 * @author: gejiawen
 * @date: 15/10/27 15:11
 * @description: 2.1
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
 * 并行执行，同时最多2个函数并行，传给最终callback。
 */
async.parallelLimit({
    a: function (cb) {
        t.fire2('a400', cb, 200)
    },
    b: function (cb) {
        t.fire2('b200', cb, 200)
    },
    c: function (cb) {
        t.fire2('c100', cb, 100)
    },
    d: function (cb) {
        t.fire2('d600', cb, 600)
    },
    e: function (cb) {
        t.fire2('e300', cb, 300)
    }
}, 2, function (err, results) {
    log('2.1 err: ', err);
    log('2.1 results: ', results);
});


//10.886> enter: "a400", delay: 200
//10.896> enter: "b200", delay: 200
//11.101> handle: "a400", delay: 200
//11.102> enter: "c100", delay: 100
//11.102> handle: "b200", delay: 200
//11.103> enter: "d600", delay: 600
//11.205> handle: "c100", delay: 100
//11.205> enter: "e300", delay: 300
//11.510> handle: "e300", delay: 300
//11.708> handle: "d600", delay: 600
//11.708> 2.1 err: null
//11.710> 2.1 results: { a: 'a400', b: 'b200', c: 'c100', e: 'e300', d: 'd600' }
