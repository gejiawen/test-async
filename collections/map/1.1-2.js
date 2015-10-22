/**
 * @file: 1.2
 * @author: gejiawen
 * @date: 15/10/22 18:48
 * @description: 1.2
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
 *  如果中途出错，立刻将错误、以及已经执行完成的结果汇总给最终callback。
 *  未执行完的将会在结果数组中用占个空位。
 *  此时,未执行完的任务继续执行完毕,但是其结果已经不能汇总到最终的callback了.
 */
async.map(arr, function (item, callback) {
    log('1.1-2 enter: ' + item.name);
    setTimeout(function () {
        log('1.1-2 handle: ' + item.name);
        if (item.name === 'Jack') {
            callback('myerr');
        } else {
            callback(null, item.name + '!!!');
        }
    }, item.delay);
}, function (err, results) {
    log('1.1-2 err: ', err);
    log('1.1-2 results: ', results);
});

// 输入如下
//13.913> 1.1-2 enter: Jack
//13.922> 1.1-2 enter: Mike
//13.923> 1.1-2 enter: Freewind
//13.923> 1.1-2 enter: Test
//13.974> 1.1-2 handle: Test
//14.023> 1.1-2 handle: Mike
//14.124> 1.1-2 handle: Jack
//14.125> 1.1-2 err: myerr
//14.125> 1.1-2 results: [ undefined, 'Mike!!!', , 'Test!!!' ]
//14.226> 1.1-2 handle: Freewind


