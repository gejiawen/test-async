/**
 * @file: 1.3
 * @author: gejiawen
 * @date: 15/10/22 18:28
 * @description: 1.3
 */
var async = require('async');
var t = require('../../t');
var log = t.log;

/**
 * forEachof与each的用法基本一致,
 * 不过forEachof针对的是object(字典)集合,而each针对的是数组集合
 */

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

var obj = {
    jack: {
        name: 'Jack',
        delay: 200
    },
    mike: {
        name: 'Mike',
        delay: 100
    },
    freewind: {
        name: 'Freewind',
        delay: 300
    }
};

/**
 * 分批执行，第二个参数是每一批的个数。每一批内并行执行，但批与批之间按顺序执行。
 */
async.forEachOfLimit(obj, 2, function(item, key, callback) {
    log('1.3 enter: ' + key);
    setTimeout(function() {
        log('1.3 handle: ' + item.name);
        callback(null, key);
    }, item.delay);
}, function(err) {
    log('1.3 err: ' + err);
});

// 输出如下
//35.228> 1.3 enter: jack
//35.236> 1.3 enter: mike
//35.340> 1.3 handle: Mike
//35.340> 1.3 enter: freewind
//35.438> 1.3 handle: Jack
//35.642> 1.3 handle: Freewind
//35.642> 1.3 err: null
