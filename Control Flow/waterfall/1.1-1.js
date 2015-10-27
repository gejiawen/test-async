/**
 * @file: 1.1-1
 * @author: gejiawen
 * @date: 15/10/27 17:15
 * @description: 1.1-1
 */

var async = require('async');
var t = require('../../t');
var log = t.log;

/**
 * 按顺序依次执行一组函数。每个函数产生的值，都将传给下一个。
 * 如果中途出错，后面的函数将不会被执行。错误信息将传给waterfall最终的callback。之前产生的结果被丢弃。
 *
 * 这个函数名为waterfall(瀑布)，可以想像瀑布从上到下，中途冲过一层层突起的石头。
 *
 * 注意，该函数不支持json格式的tasks
 */

// async.waterfall(tasks, [callback]);

/**
 * 所有函数正常执行，每个函数的结果都将变为下一个函数的参数。
 *
 * 注意，所有的callback都必须形如callback(err, result)，但err参数在前面各函数中无需声明，它被自动处理。
 */

/**
 * 中途有函数出错，其err直接传给最终callback，结果被丢弃，后面的函数不再执行。
 */
async.waterfall([
    function (cb) {
        log('1.2.1: ', 'start');
        cb(null, 3);
    },
    function (n, cb) {
        log('1.2.2: ', n);
        t.inc(n, cb);
    },
    function (n, cb) {
        log('1.2.3: ', n);
        t.err('myerr', cb);
    },
    function (n, cb) {
        log('1.2.4: ', n);
        t.fire(n, cb);
    }
], function (err, result) {
    log('1.2 err: ', err);
    log('1.2 result: ', result);
});


//02.806> 1.2.1: start
//02.814> 1.2.2: 3
//03.020> 1.2.3: 4
//03.226> 1.2 err: myerr
//03.226> 1.2 result:
