/**
 * @file: 1.1
 * @author: gejiawen
 * @date: 15/10/28 12:31
 * @description: 1.1
 */

var async = require('async');
var t = require('../../t');
var log = t.log;

/**
 * retry 用于多次尝试执行同一个任务
 *
 * opts可以接受两种类型的参数,一种是
 *
 * {times: 5, interval: 200}  分别表示尝试次数,以及每次尝试的时间间隔
 * 5  直接传入一直数字表示最大的尝试次数,时间间隔默认为0
 *
 * 在尝试执行task期间,当task成功(即没有出现异常等情况),则将task的结果传递给最后的callback,并终止尝试
 *
 * 当task不成功时,则等待interval之后再次尝试执行task
 */
// retry([opts = {times: 5, interval: 0}| 5], task, [callback])


// 尝试3次, mock在第3次时,task任务执行成功

var times = 0;

async.retry(3, function (callback, results) {
    times++;
    if (times === 3) {
        t.fire2(times, callback);
    } else {
        t.err2(times + ' retry failed', callback);
    }
}, function (err, result) {
    log('1.1: ', err);
    log('1.1: ', result);
});

//26.624> enter: 1 retry failed, delay: 200
//26.839> handle: 1 retry failed, delay: 200
//26.840> enter: 2 retry failed, delay: 200
//27.046> handle: 2 retry failed, delay: 200
//27.047> enter: 3, delay: 200
//27.252> handle: 3, delay: 200
//27.253> 1.1: null
//27.255> 1.1: 3
