/**
 * @file: 1.1
 * @author: gejiawen
 * @date: 15/10/28 10:28
 * @description: 1.1
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

/**
 * 独立加入2个任务
 */
q.push({
    name: 't1',
    run: function (cb) {
        log('t1 is running, waiting tasks: ', q.length());
        t.fire('t1', cb, 400); // 400ms后执行
    }
}, function (err) {
    log('t1 executed');
});
log('pushed `t1`, waiting tasks: ', q.length());

q.push({
    name: 't2',
    run: function (cb) {
        log('t2 is running, waiting tasks: ', q.length());
        t.fire('t2', cb, 200); // 200ms后执行
    }
}, function (err) {
    log('t2 executed');
});
log('pushed `t2`, waiting tasks: ', q.length());


//15.922> pushed `t1`, waiting tasks: 1
//15.930> all workers to be used
//15.931> pushed `t2`, waiting tasks: 2
//15.932> worker is processing task: t1
//15.932> t1 is running, waiting tasks: 1
//15.933> no more tasks waiting
//15.933> worker is processing task: t2
//15.933> t2 is running, waiting tasks: 0
//16.138> t2 executed
//16.334> t1 executed
//16.334> all tasks have been processed
