/**
 * @file: 1.1
 * @author: gejiawen
 * @date: 15/10/22 12:33
 * @description: 1.1
 */

var async = require('async');
var t = require('../../t');
var log = t.log;

/**
 * 如果想对同一个集合中的所有元素都执行同一个异步操作，可以利用each函数。
 * each还有两种衍化用法, `eachSeries`和`eachLimit`
 *
 * async提供了三种方式：
 * 1. (`each`)集合中所有元素并行执行
 * 2. (`eachSeries`)一个一个顺序执行
 * 3. (`eachLimit`)分批执行，同一批内并行，批与批之间按顺序
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
 * 所有操作并发执行，且全部未出错，最终得到的err为undefined。注意最终callback只有一个参数err。
 */
    // 1.1
async.each(arr, function (item, callback) {
    log('1.1 enter: ' + item.name);
    setTimeout(function () {
        log('1.1 handle: ' + item.name);
        callback(null, item.name);
    }, item.delay);
}, function (err) {
    log('1.1 err: ' + err);
});
// 输出如下：
//23.141> 1.1 enter: Jack
//23.148> 1.1 enter: Mike
//23.149> 1.1 enter: Freewind
//23.252> 1.1 handle: Mike
//23.352> 1.1 handle: Jack
//23.454> 1.1 handle: Freewind
//23.455> 1.1 err: null

