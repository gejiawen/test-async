/**
 * @file: 1.2-1
 * @author: gejiawen
 * @date: 15/10/27 00:25
 * @description: 1.2-1
 */

var async = require('async');

var t = require('../../t');
var log = t.log;

/**
 * 将多个异步操作的结果合并为一个数组。
 */
// concat(arr, iterator(item,callback(err,result)), callback(err,result))

var data = {
    aaa: [11, 22, 33],
    bbb: [44, 55],
    ccc: 66
};

var keys = [{
    name: 'aaa',
    delay: 300
}, {
    name: 'bbb',
    delay: 100
}, {
    name: 'ccc',
    delay: 200
}];

/**
 * 串行执行
 * 按数组中的元素顺序来执行异步操作，一个完成后才对下一个进行操作。所有结果会汇集成一个数组交给最后的callback。
 * 如果期间出错,则将错误及已经完成的结果传给最终的callback,尚未执行到的任务忽略
 */
// concatSeries(arr, iterator, callback)

async.concatSeries(keys, function (key, callback) {
    log('1.2-1 enter: ' + JSON.stringify(key));
    setTimeout(function () {
        log('1.2-1 handle: ' + JSON.stringify(key));
        if (key.name === 'bbb') {
            callback('myerr');
        } else {
            callback(null, data[key.name]);
        }
    }, key.delay);
}, function (err, values) {
    log('1.2-1 err: ', err);
    log('1.2-1 values: ', values);
});

//24.013> 1.2-1 enter: {"name":"aaa","delay":300}
//24.321> 1.2-1 handle: {"name":"aaa","delay":300}
//24.322> 1.2-1 enter: {"name":"bbb","delay":100}
//24.424> 1.2-1 handle: {"name":"bbb","delay":100}
//24.425> 1.2-1 err: myerr
//24.425> 1.2-1 values: [ 11, 22, 33 ]

