/**
 * @file: 1.2
 * @author: gejiawen
 * @date: 15/10/22 18:09
 * @description: 1.2
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
 * 与forEachOf的用法基本一致,不过forEachOfSeries是顺序执行任务,而不是并行执行
 */
async.forEachOfSeries(obj, function(item, key, callback) {
    log('1.2 enter: ' + key);
    setTimeout(function() {
        log('1.2 handle: ' + item.name);
        callback(null, item.name);
    }, item.delay)
}, function(err) {
    log('1.2 err: ' + err);
});

// 输出如下
//11.954> 1.2 enter: jack
//12.168> 1.2 handle: Jack
//12.169> 1.2 enter: mike
//12.274> 1.2 handle: Mike
//12.274> 1.2 enter: freewind
//12.576> 1.2 handle: Freewind
//12.576> 1.2 err: null
