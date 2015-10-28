/**
 * @file: 1.1
 * @author: gejiawen
 * @date: 15/10/28 14:33
 * @description: 1.1
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
 * 异步执行，调用3次createUser函数，结果被合并到数组返回
 */

async.times(3, function (n, callback) {
    log("1.1 enter: " + n +' delay: ' + delay(n));
    setTimeout(function () {
        log('1.1 handler: ', n);
        createUser(n, function (err, user) {
            callback(err, user)
        });
    }, delay(n));
}, function (err, users) {
    log('1.1 err: ', err);
    log('1.1 result: ', users);
});

//13.450> 1.1 enter: 0 delay: 500
//13.458> 1.1 enter: 1 delay: 600
//13.459> 1.1 enter: 2 delay: 0
//13.460> 1.1 handler: 2
//13.960> 1.1 handler: 0
//14.061> 1.1 handler: 1
//14.061> 1.1 err: null
//14.062> 1.1 result: [ { id: 'user0', delay: 500 },
//    { id: 'user1', delay: 600 },
//    { id: 'user2', delay: 0 } ]
