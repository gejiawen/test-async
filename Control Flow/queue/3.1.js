/**
 * @file: 3.1
 * @author: gejiawen
 * @date: 15/10/28 11:56
 * @description: 3.1
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
 *
 * priorityQueue跟queue很相似,不过priorityQueue在push任务的时候,可以带一个优先级参数
 * 当priorityQueue的worker执行任务时,按照优先级的升序来执行相关任务
 *
 * // push(task, priority, [callback])
 *
 * task可以是一个单独任务,也可以使一系列任务(数组),当是数组时,数组中所有的任务的优先级都是一样的.
 *
 */
var q = async.priorityQueue(function (task, callback) {
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
 * 独立加入3个任务,任务的优先级分别是 2,1,3
 *
 * priorityQueue会按照任务的优先级的升序,依次执行 t2, t1, t3
 */
q.push({
    name: 't1',
    run: function (cb) {
        log('t1 is running, waiting tasks: ', q.length());
        t.fire('t1', cb, 400); // 400ms后执行
    }
}, 2, function (err) {
    log('t1 executed');
});
log('pushed `t1`, waiting tasks: ', q.length());

q.push({
    name: 't2',
    run: function (cb) {
        log('t2 is running, waiting tasks: ', q.length());
        t.fire('t2', cb, 200); // 200ms后执行
    }
}, 1, function (err) {
    log('t2 executed');
});
log('pushed `t2`, waiting tasks: ', q.length());

q.push({
    name: 't3',
    run: function (cb) {
        log('t3 is running, waiting tasks: ', q.length());
        t.fire('t3', cb, 300); // 300ms后执行
    }
}, 3, function (err) {
    log('t3 executed');
});
log('pushed `t3`, waiting tasks: ', q.length());

//51.698> pushed `t1`, waiting tasks: 1
//51.705> all workers to be used
//51.705> pushed `t2`, waiting tasks: 2
//51.705> pushed `t3`, waiting tasks: 3
//51.706> worker is processing task: t2
//51.707> t2 is running, waiting tasks: 2
//51.708> worker is processing task: t1
//51.708> t1 is running, waiting tasks: 1
//51.909> t2 executed
//51.909> no more tasks waiting
//51.909> worker is processing task: t3
//51.909> t3 is running, waiting tasks: 0
//52.111> t1 executed
//52.216> t3 executed
//52.216> all tasks have been processed
