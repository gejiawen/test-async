/**
 * @file: 1.2-2
 * @author: gejiawen
 * @date: 15/10/22 16:52
 * @description: 1.2-2
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
 * 如果中途出错，则马上把错误传给最终的callback，还未执行的不再执行。
 */
async.eachSeries(arr, function (item, callback) {
    log('1.2-2 enter: ' + item.name);
    setTimeout(function () {
        log('1.2-2 handle: ' + item.name);
        if (item.name === 'Jack') {
            callback('myerr');
        }
    }, item.delay);
}, function (err) {
    log('1.2-2 err: ' + err);
});

// 输出如下
//24.523> 1.2-2 enter: Jack
//24.737> 1.2-2 handle: Jack
//24.738> 1.2-2 err: myerr
