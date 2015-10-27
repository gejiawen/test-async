/**
 * @file: 2.1
 * @author: gejiawen
 * @date: 15/10/27 16:05
 * @description: 2.1
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
 *  doWhilst交换了fn,test的参数位置，先执行一次循环，再做test判断。 和javascript中do..while语法一致。
 */
// doWhilst(fn, test, callback)
//1.4
var count4 = 0;
async.doWhilst(
    function (cb) {
        t.inc2(count4++, cb);
    },
    function () {
        log("2.1 test: ",  count4);
        return count4 < 3
    },
    function (err, result) { // result没有用
        log('2.1 err: ', err);
        log('2.1 result: ', result);
    }
);

//26.795> enter: 0, delay: 200
//27.008> handle: 0, delay: 200
//27.009> 2.1 test: 1
//27.010> enter: 1, delay: 200
//27.216> handle: 1, delay: 200
//27.216> 2.1 test: 2
//27.217> enter: 2, delay: 200
//27.423> handle: 2, delay: 200
//27.423> 2.1 test: 3
//27.423> 2.1 err: null
//27.424> 2.1 result:
