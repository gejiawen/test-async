/**
 * @file: 1.3
 * @author: gejiawen
 * @date: 15/10/22 19:01
 * @description: 1.3
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
 * 并行执行，同时最多2个函数并行，传给最终callback
 *
 * 当出错时,只把错误以及执行完的传给最终callback，未执行的忽略。
 */
async.mapLimit(arr, 2, function (item, callback) {
    log('1.3-2 enter: ' + item.name);
    setTimeout(function () {
        log('1.3-2 handle: ' + item.name);
        if (item.name === 'Jack') {
            callback('myerr');
        } else {
            callback(null, item.name + '!!!');
        }
    }, item.delay);
}, function (err, results) {
    log('1.3-2 err: ', err);
    log('1.3-2 results: ', results);
});

// 输出如下

//52.469> 1.3-2 enter: Jack
//52.479> 1.3-2 enter: Mike
//52.583> 1.3-2 handle: Mike
//52.583> 1.3-2 enter: Freewind
//52.683> 1.3-2 handle: Jack
//52.684> 1.3-2 err: myerr
//52.684> 1.3-2 results: [ undefined, 'Mike!!!' ]
//52.885> 1.3-2 handle: Freewind
