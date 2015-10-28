/**
 * @file: 3.1
 * @author: gejiawen
 * @date: 15/10/28 14:40
 * @description: 3.1
 */

var async = require('async');
var t = require('../../t');
var log = t.log;

/**
 * 异步运行,times可以指定调用几次，并把结果合并到数组中返回
 */
// times(n, iterator, [callback])

function delay(n) {
    return (n + 12) % 7 * 100;
}

var createUser = function (id, callback) {
    callback(null, {
        id: 'user' + id,
        delay: delay(id)
    });
};

/**
 * 异步执行，调用5次createUser函数，结果被合并到数组返回
 *
 * timesLimit限制每次最大并发量为2个
 */

async.timesLimit(5, 2, function (n, callback) {
    log("3.1 enter: " + n +' delay: ' + delay(n));
    setTimeout(function () {
        log('3.1 handler: ', n);
        createUser(n, function (err, user) {
            callback(err, user)
        });
    }, delay(n));
}, function (err, users) {
    log('3.1 err: ', err);
    log('3.1 result: ', users);
});

//48.655> 3.1 enter: 0 delay: 500
//48.662> 3.1 enter: 1 delay: 600
//49.164> 3.1 handler: 0
//49.166> 3.1 enter: 2 delay: 0
//49.166> 3.1 handler: 2
//49.167> 3.1 enter: 3 delay: 100
//49.268> 3.1 handler: 1
//49.268> 3.1 enter: 4 delay: 200
//49.268> 3.1 handler: 3
//49.468> 3.1 handler: 4
//49.469> 3.1 err: null
//49.469> 3.1 result: [ { id: 'user0', delay: 500 },
//    { id: 'user1', delay: 600 },
//    { id: 'user2', delay: 0 },
//    { id: 'user3', delay: 100 },
//    { id: 'user4', delay: 200 } ]
