/**
 * @file: 1.2
 * @author: gejiawen
 * @date: 15/10/26 22:47
 * @description: 1.2
 */
var async = require('async');

var t = require('../../t');
var log = t.log;

var arr = [1, 2, 3, 4, 5];

/*
 * reject跟filter正好相反，当测试为true时，抛弃之
 */

/**
 * 串行执行，对arr进行筛选。
 */
async.rejectSeries(arr, function (item, callback) {
    log('1.2 enter: ' + item);
    setTimeout(function () {
        log('1.2 handle: ' + item);
        callback(item >= 3);
    }, 200);
}, function (results) {
    log('1.2 results: ', results);
});

//20.512> 1.2 enter: 1
//20.723> 1.2 handle: 1
//20.724> 1.2 enter: 2
//20.927> 1.2 handle: 2
//20.927> 1.2 enter: 3
//21.129> 1.2 handle: 3
//21.130> 1.2 enter: 4
//21.331> 1.2 handle: 4
//21.331> 1.2 enter: 5
//21.533> 1.2 handle: 5
//21.535> 1.2 results: [ 1, 2 ]
