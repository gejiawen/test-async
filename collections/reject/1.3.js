/**
 * @file: 1.3
 * @author: gejiawen
 * @date: 15/10/26 22:51
 * @description: 1.3
 */
var async = require('async');

var t = require('../../t');
var log = t.log;

var arr = [1, 2, 3, 4, 5];

/*
 * reject跟filter正好相反，当测试为true时，抛弃之
 */

/**
 * 并行执行 同时最多允许2个任务并行执行
 */
async.rejectLimit(arr, 2, function (item, callback) {
    log('1.3 enter: ' + item);
    setTimeout(function () {
        log('1.3 handle: ' + item);
        callback(item >= 3);
    }, 200);
}, function (results) {
    log('1.3 results: ', results);
});

//15.587> 1.3 enter: 1
//15.595> 1.3 enter: 2
//15.798> 1.3 handle: 1
//15.799> 1.3 enter: 3
//15.799> 1.3 handle: 2
//15.799> 1.3 enter: 4
//16.001> 1.3 handle: 3
//16.002> 1.3 enter: 5
//16.002> 1.3 handle: 4
//16.208> 1.3 handle: 5
//16.210> 1.3 results: [ 1, 2 ]
