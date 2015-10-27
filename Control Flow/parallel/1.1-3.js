/**
 * @file: 1.1-3
 * @author: gejiawen
 * @date: 15/10/27 15:09
 * @description: 1.1-3
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
 * 如果中途出错，会将err与已经完成的函数值（汇成一个json）传给最终callback。未执行完成的函数值被忽略，不会出现在最终json中。
 */
async.parallel({
    a: function (cb) {
        // 该函数的值不会传给最终的callback
        t.fire2('a400', cb, 400)
    },
    b: function (cb) {
        t.err2('e300', cb, 300)
    },
    c: function (cb) {
        t.fire2('c200', cb, 200)
    }
}, function (err, results) {
    log('1.1-3 err: ', err);
    log('1.1-3 results: ', results);
});

//00.524> enter: "a400", delay: 400
//00.531> enter: e300, delay: 300
//00.532> enter: "c200", delay: 200
//00.735> handle: "c200", delay: 200
//00.838> handle: e300, delay: 300
//00.838> 1.1-3 err: e300
//00.838> 1.1-3 results: { c: 'c200', b: undefined }
//00.933> handle: "a400", delay: 400
