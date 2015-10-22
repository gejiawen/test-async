/**
 * @file: 1.1
 * @author: gejiawen
 * @date: 15/10/22 18:38
 * @description: 1.1
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
 * 所有操作均正确执行，未出错。所有结果按元素顺序汇总给最终的callback。
 */
async.map(arr, function (item, callback) {
    log('1.1 enter: ' + item.name);
    setTimeout(function () {
        log('1.1 handle: ' + item.name);
        callback(null, item.name + '!!!');
    }, item.delay);
}, function (err, results) {
    log('1.1 err: ', err);
    log('1.1 results: ', results);
});

// 输出如下,

//29.589> 1.1 enter: Jack
//29.597> 1.1 enter: Mike
//29.597> 1.1 enter: Freewind
//29.597> 1.1 enter: Test
//29.651> 1.1 handle: Test
//29.701> 1.1 handle: Mike
//29.800> 1.1 handle: Jack
//29.902> 1.1 handle: Freewind
//29.902> 1.1 err: null
//29.903> 1.1 results: [ 'Jack!!!', 'Mike!!!', 'Freewind!!!', 'Test!!!' ]
