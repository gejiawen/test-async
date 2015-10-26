/**
 * @file: 1.1
 * @author: gejiawen
 * @date: 15/10/26 23:21
 * @description: 1.1
 */

var async = require('async');

var t = require('../../t');
var log = t.log;

/**
 * 用于取得集合中满足条件的第一个元素。
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
 *  并行执行，通过t.inc做一个累加器，得到第一个满足条件的结果对象
 *
 *  因为第一个元素的延时比第三个元素的延时要长,所以优先筛选出第三个元素
 */
async.detect(arr, function (item, callback) {
    log('1.1 enter: ', item.value);
    t.inc(item.value, function (err, n) {
        log('1.1 handle: ', item.value);
        callback(n % 2 === 0);
    }, item.delay);
}, function (result) {
    log('1.1 result: ', result);
});

//19.850> 1.1 enter: 1
//19.858> 1.1 enter: 2
//19.859> 1.1 enter: 3
//20.063> 1.1 handle: 2
//20.162> 1.1 handle: 3
//20.162> 1.1 result: { value: 3, delay: 300 }
//20.359> 1.1 handle: 1


