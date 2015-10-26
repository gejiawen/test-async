/**
 * @file: 1.1
 * @author: gejiawen
 * @date: 15/10/27 00:18
 * @description: 1.1
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
 * 以并行方式对集合中各元素进行异步操作，然后把得到的结果合并为一个数组，传给最后的callback。
 */
async.concat(keys, function (key, callback) {
    log('1.1 enter: ' + JSON.stringify(key));
    setTimeout(function () {
        log('1.1 handle: ' + JSON.stringify(key));
        callback(null, data[key.name]);
    }, key.delay);
}, function (err, values) {
    log('1.1 err: ', err);
    log('1.1 values: ', values);
});

//26.647> 1.1 enter: {"name":"aaa","delay":300}
//26.655> 1.1 enter: {"name":"bbb","delay":100}
//26.655> 1.1 enter: {"name":"ccc","delay":200}
//26.761> 1.1 handle: {"name":"bbb","delay":100}
//26.859> 1.1 handle: {"name":"ccc","delay":200}
//26.956> 1.1 handle: {"name":"aaa","delay":300}
//26.957> 1.1 err: null
//26.958> 1.1 values: [ 44, 55, 66, 11, 22, 33 ]


