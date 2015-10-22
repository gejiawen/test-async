/**
 * @file: 1.3
 * @author: gejiawen
 * @date: 15/10/22 12:42
 * @description: 1.3
 */

var async = require('async');
var t = require('../../t');
var log = t.log;

/**
 * 如果想对同一个集合中的所有元素都执行同一个异步操作，可以利用each函数。
 *
 * async提供了三种方式：
 * 1. 集合中所有元素并行执行
 * 2. 一个一个顺序执行
 * 3. 分批执行，同一批内并行，批与批之间按顺序
 *
 * 如果中途出错，则错误将上传给最终的callback处理。其它已经启动的任务继续执行，未启动的忽略。
 */
// each(arr, iterator(item, callback), callback(err))

var arr = [{
    name: 'Jack',
    delay: 200
}, {
    name: 'Mike',
    delay: 100
}, {
    name: 'Freewind',
    delay: 300
}];

/**
 * 分批执行，第二个参数是每一批的个数。每一批内并行执行，但批与批之间按顺序执行。
 */
async.eachLimit(arr, 2, function (item, callback) {
    log('1.3 enter: ' + item.name);
    setTimeout(function () {
        log('1.3 handle: ' + item.name);
        callback(null, item.name);
    }, item.delay);
}, function (err) {
    log('1.3 err: ' + err);
});

// 输出如下
//04.091> 1.3 enter: Jack
//04.101> 1.3 enter: Mike
//04.206> 1.3 handle: Mike
//04.207> 1.3 enter: Freewind
//04.305> 1.3 handle: Jack
//04.509> 1.3 handle: Freewind
//04.509> 1.3 err: null

