/**
 * @file: 1.2
 * @author: gejiawen
 * @date: 15/10/28 14:25
 * @description: 1.2
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
 * 通过iter()来调用下一个函数
 *
 * 其中 `it4()` 会报错, 因为iterator中总共就3个任务,经过3此迭代已经执行玩所有的任务,
 * 如果此时还继续迭代, 将会出错.
 */
log('1.2 iter()');
var it2 = iter();
var it3 = it2();
var it4 = it3();
// it4();
log(it4); // => 'null'


//25.536> 1.2 iter()
//25.545> I am 111
//25.545> I am 222
//25.546> I am 333
//25.546> null
