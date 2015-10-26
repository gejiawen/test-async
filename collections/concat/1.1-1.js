/**
 * @file: 1.1-1
 * @author: gejiawen
 * @date: 15/10/27 00:21
 * @description: 1.1-1
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
 * 如果中途出错，则把错误以及已经完成的操作的结果交给最后callback。未执行完的则忽略。
 */
async.concat(keys, function (key, callback) {
    log('1.1-1 enter: ' + JSON.stringify(key));
    setTimeout(function () {
        log('1.1-1 handle: ' + JSON.stringify(key));
        if (key.name === 'ccc') {
            callback('myerr');
        } else {
            callback(null, data[key.name]);
        }
    }, key.delay);
}, function (err, values) {
    log('1.1-1 err: ', err);
    log('1.1-1 values: ', values);
});

//25.058> 1.1-1 enter: {"name":"aaa","delay":300}
//25.068> 1.1-1 enter: {"name":"bbb","delay":100}
//25.069> 1.1-1 enter: {"name":"ccc","delay":200}
//25.173> 1.1-1 handle: {"name":"bbb","delay":100}
//25.274> 1.1-1 handle: {"name":"ccc","delay":200}
//25.274> 1.1-1 err: myerr
//25.275> 1.1-1 values: [ 44, 55 ]
//25.369> 1.1-1 handle: {"name":"aaa","delay":300}
