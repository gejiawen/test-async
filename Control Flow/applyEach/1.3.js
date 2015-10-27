/**
 * @file: 1.3
 * @author: gejiawen
 * @date: 15/10/27 17:52
 * @description: 1.3
 */

var async = require('async');
var t = require('../../t');
var log = t.log;

/**
 * applyEach，可以实现给一数组中每个函数传相同参数，通过callback返回。
 * 如果只传第一个参数，将返回一个函数对象，我可以传参调用。
 */
// applyEach(fns, args..., callback)

/**
 *   applyEachSeries与applyEach唯一不同的是，数组的函数同步执行。
 */

//applyEachSeries(arr, args..., callback)

async.applyEachSeries([
    function (name, cb) {
        log("1.3 enter: " + name + " A");
        setTimeout(function () {
            log("1.3 handler: " + name + " A");
            cb(null, name);
        }, 500);
    }, function (name, cb) {
        log("1.3 enter: " + name + " B");
        setTimeout(function () {
            log("1.3 handler: " + name + " B");
            cb(null, name);
        }, 150);
    }
], "aaa", function (err) {
    log('1.3 err: ', err);
});


//23.900> 1.3 enter: aaa A
//24.422> 1.3 handler: aaa A
//24.424> 1.3 enter: aaa B
//24.578> 1.3 handler: aaa B
//24.578> 1.3 err: null
