/**
 * @file: 1.3-2
 * @author: gejiawen
 * @date: 15/10/22 16:53
 * @description: 1.3-2
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
 * 如果中途出错，错误将马上传给最终的callback。同一批中的未执行完的任务还将继续执行，但下一批及以后的不再执行。
 */
async.eachLimit(arr, 2, function (item, callback) {
    log('1.6 enter: ' + item.name);
    setTimeout(function () {
        log('1.6 handle: ' + item.name);
        if (item.name === 'Jack') {
            callback('myerr');
        }
    }, item.delay);
}, function (err) {
    log('1.6 err: ' + err);
});
// 42.248> 1.6 enter: Jack
// 42.248> 1.6 enter: Mike
// 42.352> 1.6 handle: Mike
// 42.462> 1.6 handle: Jack
// 42.462> 1.6 err: myerr
