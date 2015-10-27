/**
 * @file: 1.2
 * @author: gejiawen
 * @date: 15/10/27 16:04
 * @description: 1.2
 */

var async = require('async');
var t = require('../../t');
var log = t.log;

/**
 * 相当于while，但其中的异步调用将在完成后才会进行下一次循环。
 *
 * 它相当于：
 * try {
 *   whilst(test) {
 *     fn();
 *   }
 *   callback();
 * } catch (err) {
 *   callback(err);
 * }
 *
 * 该函数的功能比较简单，条件变量通常定义在外面，可供每个函数访问。在循环中，异步调用时产生的值实际上被丢弃了，因为最后那个callback只能传入错误信息。
 *
 * 另外，第二个函数fn需要能接受一个函数cb，这个cb最终必须被执行，用于表示出错或正常结束。
 */
// whilst(test, fn, callback)
/**
 * 每次循环开始,首先验证test函数,如果其返回为true,则执行fn
 * 如果fn中有异步任务,则必须等待异步任务结束,才可进入下一次循环遍历
 * 当遍历终止时,或者出错时,执行最后的callback
 */

/**
 * 第二个函数即使产生值，也会被忽略。第三个函数只能得到err。
 */
// 1.3
var count3 = 0;
async.whilst(
    function () {
        return count3 < 3
    },
    function (cb) {
        t.inc2(count3++, cb);
    },
    function (err, result) { // result没有用
        log('1.2 err: ', err);
        log('1.2 result: ', result);
    }
);

//47.611> enter: 0, delay: 200
//47.825> handle: 0, delay: 200
//47.826> enter: 1, delay: 200
//48.031> handle: 1, delay: 200
//48.032> enter: 2, delay: 200
//48.237> handle: 2, delay: 200
//48.237> 1.2 err: null
//48.239> 1.2 result:
