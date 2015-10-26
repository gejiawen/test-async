/**
 * @file: 1.1
 * @author: gejiawen
 * @date: 15/10/26 22:44
 * @description: 1.1
 */

var async = require('async');

var t = require('../../t');
var log = t.log;

var arr = [1, 2, 3, 4, 5];

/*
 * reject跟filter正好相反，当测试为true时，抛弃之
 */

// reject(arr, iterator(item, callback(test)), callback(results)
async.reject(arr, function (item, callback) {
    log('1.1 enter: ' + item);
    setTimeout(function () {
        log('1.1 test: ' + item);
        callback(item >= 3);
    }, 200);
}, function (results) {
    log('1.1 results: ', results);
});

// 输出如下
//31.196> 1.1 enter: 1
//31.203> 1.1 enter: 2
//31.203> 1.1 enter: 3
//31.203> 1.1 enter: 4
//31.203> 1.1 enter: 5
//31.407> 1.1 test: 1
//31.407> 1.1 test: 2
//31.408> 1.1 test: 3
//31.408> 1.1 test: 4
//31.408> 1.1 test: 5
//31.410> 1.1 results: [ 1, 2 ]
