/**
 * @file: 1.2
 * @author: gejiawen
 * @date: 15/10/27 00:23
 * @description: 1.2
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
 */
// concatSeries(arr, iterator, callback)

async.concatSeries(keys, function (key, callback) {
    log('1.2 enter: ' + JSON.stringify(key));
    setTimeout(function () {
        log('1.2 handle: ' + JSON.stringify(key));
        callback(null, data[key.name]);
    }, key.delay);
}, function (err, values) {
    log('1.2 err: ', err);
    log('1.2 values: ', values);
});

//38.575> 1.2 enter: {"name":"aaa","delay":300}
//38.888> 1.2 handle: {"name":"aaa","delay":300}
//38.889> 1.2 enter: {"name":"bbb","delay":100}
//38.994> 1.2 handle: {"name":"bbb","delay":100}
//38.995> 1.2 enter: {"name":"ccc","delay":200}
//39.196> 1.2 handle: {"name":"ccc","delay":200}
//39.197> 1.2 err: null
//39.198> 1.2 values: [ 11, 22, 33, 44, 55, 66 ]
