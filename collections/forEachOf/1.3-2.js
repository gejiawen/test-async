/**
 * @file: 1.3-2
 * @author: gejiawen
 * @date: 15/10/22 18:32
 * @description: 1.3-2
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
 * 如果中途出错，错误将马上传给最终的callback。
 * 同一批中的未执行完的任务还将继续执行，但下一批及以后的不再执行。
 */
async.forEachOfLimit(obj, 2, function(item, key, callback) {
    log('1.3-2 enter: ' + key);
    setTimeout(function() {
        log('1.3-2 handle: ' + item.name);
        if (key === 'jack') {
            callback('myerr');
        }
    }, item.delay);
}, function(err) {
    log('1.3-2 err: ' + err);
});

// 输出如下
//04.244> 1.3-2 enter: jack
//04.253> 1.3-2 enter: mike
//04.360> 1.3-2 handle: Mike
//04.457> 1.3-2 handle: Jack
//04.458> 1.3-2 err: myerr
