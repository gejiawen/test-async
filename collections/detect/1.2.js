/**
 * @file: 1.2
 * @author: gejiawen
 * @date: 15/10/26 23:27
 * @description: 1.2
 */
var async = require('async');

var t = require('../../t');
var log = t.log;

/**
 * 用于取得集合中满足条件的第一个元素。得到结果后立马返回(终止执行)
 * 它分为并行与顺序执行两种方式，分别对应函数detect和detectSeries,detectLimit。
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
async.detectSeries(arr, function (item, callback) {
    log('1.2 enter: ', item.value);
    t.inc(item.value, function (err, n) {
        log('1.2 handle: ', item.value);
        callback(n % 2 === 0);
    }, item.delay);
}, function (result) {
    log('1.2 result: ', result);
});

//53.428> 1.2 enter: 1
//53.939> 1.2 handle: 1
//53.940> 1.2 result: { value: 1, delay: 500 }
