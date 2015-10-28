/**
 * @file: 1.2
 * @author: gejiawen
 * @date: 15/10/28 12:45
 * @description: 1.2
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


// 尝试6次,每次间隔400ms, mock每次都没有成功

var times = 0;

async.retry({times: 6, interval: 400}, function (callback, results) {
    times++;
    t.err2(times + ' retry failed', callback);
}, function (err, result) {
    log('1.1: ', err);
    log('1.1: ', result);
});

//57.397> enter: 1 retry failed, delay: 200
//57.607> handle: 1 retry failed, delay: 200
//58.010> enter: 2 retry failed, delay: 200
//58.213> handle: 2 retry failed, delay: 200
//58.614> enter: 3 retry failed, delay: 200
//58.820> handle: 3 retry failed, delay: 200
//59.220> enter: 4 retry failed, delay: 200
//59.421> handle: 4 retry failed, delay: 200
//59.824> enter: 5 retry failed, delay: 200
//00.027> handle: 5 retry failed, delay: 200
//00.428> enter: 6 retry failed, delay: 200
//00.629> handle: 6 retry failed, delay: 200
//00.630> 1.1: 6 retry failed
//00.630> 1.1:
