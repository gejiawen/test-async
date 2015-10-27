/**
 * @file: 1.1-1
 * @author: gejiawen
 * @date: 15/10/27 16:00
 * @description: 1.1-1
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
 * 中途出错。出错后立刻调用第三个函数。
 */
var count2 = 0;
async.whilst(
    function () {
        return count2 < 3
    },
    function (cb) {
        log('1.1-1 enter: ', count2);
        if (count2 === 1) {
            t.err('myerr', cb, 200);
        } else {
            count2++;
            setTimeout(function() {
                log('1.1-1 handle:', count2);
                cb();
            }, 1000);
        }
    },
    function (err) {
        log('1.1-1 err: ', err);
    }
);

//01.508> 1.1-1 enter: 0
//02.518> 1.1-1 handle:1
//02.519> 1.1-1 enter: 1
//02.722> 1.1-1 err: myerr
