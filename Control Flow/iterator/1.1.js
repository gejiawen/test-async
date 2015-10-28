/**
 * @file: 1.1
 * @author: gejiawen
 * @date: 15/10/28 14:23
 * @description: 1.1
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
 * 直接调用()，会执行当前函数，并返回一个由下个函数为起点的新的iterator
 *
 * 注意后两次的直接调用的结果是一样的
 */
log('1.1 iter()');
var it1 = iter();
it1();
it1();

//52.549> 1.1 iter()
//52.556> I am 111
//52.556> I am 222
//52.557> I am 222
