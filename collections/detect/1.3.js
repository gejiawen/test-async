/**
 * @file: 1.3
 * @author: gejiawen
 * @date: 15/10/26 23:28
 * @description: 1.3
 */

var async = require('async');

var t = require('../../t');
var log = t.log;

/**
 * 用于取得集合中满足条件的第一个元素。
 * 它分为并行与顺序执行两种方式，分别对应函数detect和detectSeries,detectLimit。
 * 串行执行时,得到结果后立马返回(终止执行)
 */
// detect(array, iterator(item,callback(test)), callback(result)

var arr = [{
    value: 1,
    delay: 500
}, {
    value: 2,
    delay: 200
}, {
    value: 3,
    delay: 300
}];

/**
 *  串行执行，通过t.inc做一个累加器，得到第一个满足条件的结果对象
 */
async.detectLimit(arr, 2, function (item, callback) {
    log('1.3 enter: ', item.value);
    t.inc(item.value, function (err, n) {
        log('1.3 handle: ', item.value);
        callback(n % 2 === 0);
    }, item.delay);
}, function (result) {
    log('1.3 result: ', result);
});

//12.528> 1.3 enter: 1
//12.535> 1.3 enter: 2
//12.737> 1.3 handle: 2
//12.738> 1.3 enter: 3
//13.039> 1.3 handle: 1
//13.039> 1.3 result: { value: 1, delay: 500 }
//13.042> 1.3 handle: 3
