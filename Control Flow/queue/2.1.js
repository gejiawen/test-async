/**
 * @file: 2.1
 * @author: gejiawen
 * @date: 15/10/28 10:38
 * @description: 2.1
 */

var async = require('async');
var t = require('../../t');
var log = t.log;

/**
 * queue是一个串行的消息队列，通过限制了worker数量，不再一次性全部执行。
 * 当worker数量不够用时，新加入的任务将会排队等候，直到有新的worker可用。
 *
 * 该函数有多个点可供回调，如worker用完时、无等候任务时、全部执行完时等。
 */
// queue(worker, concurrency)

/**
 * 定义一个queue，设worker数量为2
 */
var q = async.queue(function (task, callback) {
    log('worker is processing task: ', task.name);
    task.run(callback);
}, 2);

/**
 * 监听：如果某次push操作后，任务数将达到或超过worker数量时，将调用该函数
 *
 * worker队列已满时调用
 */
q.saturated = function () {
    log('all workers to be used');
};

/**
 * 监听：当最后一个任务交给worker时，将调用该函数
 *
 * 当等待队列为空时调用
 */
q.empty = function () {
    log('no more tasks waiting');
};

/**
 * 监听：当所有任务都执行完以后，将调用该函数
 */
q.drain = function () {
    log('all tasks have been processed');
};

// 同时加入多个任务
q.push([
    {
        name: 't3',
        run: function (cb) {
            log('t3 is running, waiting tasks: ', q.length());
            t.fire('t3', cb, 300); // 300ms后执行
        }
    }, {
        name: 't4',
        run: function (cb) {
            log('t4 is running, waiting tasks: ', q.length());
            t.fire('t4', cb, 500); // 500ms后执行
        }
    }, {
        name: 't5',
        run: function (cb) {
            log('t5 is running, waiting tasks: ', q.length());
            t.fire('t5', cb, 100); // 100ms后执行
        }
    }, {
        name: 't6',
        run: function (cb) {
            log('t6 is running, waiting tasks: ', q.length());
            t.fire('t6', cb, 400); // 400ms后执行
        }
    }
], function (err) {
    log('err: ', err);
});
log('pushed t3,t4,t5,t6 into queue, waiting tasks: ', q.length());

//03.608> all workers to be used
//03.615> pushed t3,t4,t5,t6 into queue, waiting tasks: 4
//03.617> worker is processing task: t3
//03.617> t3 is running, waiting tasks: 3
//03.618> worker is processing task: t4
//03.618> t4 is running, waiting tasks: 2
//03.922> err: null
//03.923> worker is processing task: t5
//03.923> t5 is running, waiting tasks: 1
//04.026> err: null
//04.027> no more tasks waiting
//04.027> worker is processing task: t6
//04.027> t6 is running, waiting tasks: 0
//04.123> err: null
//04.430> err: null
//04.431> all tasks have been processed
