/**
 * @file: 1.3
 * @author: gejiawen
 * @date: 15/10/28 14:29
 * @description: 1.3
 */

var async = require('async');
var t = require('../../t');
var log = t.log;

/**
 * 将一组函数包装成为一个iterator，初次调用此iterator时，会执行定义中的第一个函数并返回第二个函数以供调用。
 * 也可通过手动调用 next() 得到以下一个函数为起点的新的iterator。
 * 该函数通常由async在内部使用，但如果需要时，也可在我们的代码中使用它。
 */
// async.iterator(tasks)

var iter = async.iterator([
    function () {
        log('I am 111');
    },
    function () {
        log('I am 222');
    },
    function () {
        log('I am 333');
    }
]);

/**
 * 调用next()，不会执行当前函数，直接返回由下个函数为起点的新iterator
 * 对于同一个iterator，多次调用next()，不会影响自己
 */

log('1.3 iter()');
iter();

var it5 = iter.next();
it5();

var it6 = it5.next();
it6();

//49.052> 1.3 iter()
//49.060> I am 111
//49.061> I am 222
//49.061> I am 333
