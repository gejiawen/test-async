/**
 * @file: 1.1
 * @author: gejiawen
 * @date: 15/10/27 15:52
 * @description: 1.1
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
 * 正常情况，没有出错。第二个函数虽然是异步调用，但被同步执行。所以第三个函数被调用时，已经过了3秒。
 */
var count1 = 0;
async.whilst(
    function () {
        return count1 < 3
    },
    function (cb) {
        log('1.1 enter: ', count1);
        count1++;
        setTimeout(function() {
            log('1.1 handle: ', count1);
            cb();
        }, count1 * 1000);
    },
    function (err) {
        log('1.1 err: ', err);
    }
);


//07.389> 1.1 enter: 0
//08.401> 1.1 handle: 1
//08.402> 1.1 enter: 1
//10.403> 1.1 handle: 2
//10.404> 1.1 enter: 2
//13.409> 1.1 handle: 3
//13.410> 1.1 err: null



