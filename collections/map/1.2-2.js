/**
 * @file: 1.2-2
 * @author: gejiawen
 * @date: 15/10/22 18:59
 * @description: 1.2-2
 */

var async = require('async');
var t = require('../../t');
var log = t.log;

/**
 * 对集合中的每一个元素，执行某个异步操作，得到结果。
 * 所有的结果将汇总到最终的callback里。
 * 与each的区别是，each只关心操作不管最后的值，而map关心的最后产生的值。
 *
 * 最终汇总到callback的结果顺序跟任务的顺序一致
 *
 * 提供了两种方式：
 * 1. 并行执行。同时对集合中所有元素进行操作，结果汇总到最终callback里。如果出错，则立刻返回错误以及已经执行完的任务的结果，未执行完的占个空位
 * 2. 顺序执行。对集合中的元素一个一个执行操作，结果汇总到最终callback里。如果出错，则立刻返回错误以及已经执行完的结果，未执行的被忽略。
 */
// map(arr, iterator(item, callback), callback(err, results))

/**
 * map也有两种衍生用法,分别为`mapSeries`和`mapLimit`
 *
 * 这里的mapSeries和mapLimit和之前的eachSeries和eachLimit(forEachOfSeries和forEachOfLimit)是相似的
 */

var arr = [{
    name: 'Jack',
    delay: 200
}, {
    name: 'Mike',
    delay: 100
}, {
    name: 'Freewind',
    delay: 300
}, {
    name: 'Test',
    delay: 50
}];

/**
 * 顺序执行过程中出错，只把错误以及执行完的传给最终callback，未执行的忽略。
 */
async.mapSeries(arr, function (item, callback) {
    log('1.2-2 enter: ' + item.name);
    setTimeout(function () {
        log('1.2-2 handle: ' + item.name);
        if (item.name === 'Mike') {
            callback('myerr');
        } else {
            callback(null, item.name + '!!!');
        }
    }, item.delay);
}, function (err, results) {
    log('1.2-2 err: ', err);
    log('1.2-2 results: ', results);
});

// 输出如下

//39.298> 1.2-2 enter: Jack
//39.512> 1.2-2 handle: Jack
//39.513> 1.2-2 enter: Mike
//39.617> 1.2-2 handle: Mike
//39.618> 1.2-2 err: myerr
//39.618> 1.2-2 results: [ 'Jack!!!', undefined ]
