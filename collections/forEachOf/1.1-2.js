/**
 * @file: 1.1-2
 * @author: gejiawen
 * @date: 15/10/22 18:01
 * @description: 1.1-2
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
 * 如果中途出错，则出错后马上调用最终的callback。其它未执行完的任务继续执行。
 */
async.forEachOf(obj, function(item, key, callback) {
    log('1.1-2 enter: ' + key);
    setTimeout(function() {
        log('1.1-2 handle: ' + item.name);
        if (key === 'jack') {
            callback('myerr');
        }
    }, item.delay);
}, function(err) {
    log('1.1-2 err: ' + err);
});


// 运行结果
//36.153> 1.1-2 enter: jack
//36.160> 1.1-2 enter: mike
//36.161> 1.1-2 enter: freewind
//36.264> 1.1-2 handle: Mike
//36.363> 1.1-2 handle: Jack
//36.363> 1.1-2 err: myerr
//36.466> 1.1-2 handle: Freewind
