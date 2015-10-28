/**
 * @file: 2.1
 * @author: gejiawen
 * @date: 15/10/28 14:39
 * @description: 2.1
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
 *  timesSeries与time唯一不同的是，同步执行
 */
//timesSeries(n, callback)

/**
 * 同步执行，调用3次createUser函数，结果被合并到数组返回
 */
async.timesSeries(3, function (n, callback) {
    log("2.1 enter: " + n + ' delay: ' + delay(n));
    setTimeout(function () {
        log('2.1 handler: ', n);
        createUser(n, function (err, user) {
            callback(err, user)
        })
    }, delay(n));
}, function (err, users) {
    log('2.1 err: ', err);
    log('2.1 result: ', users);
});


//31.598> 2.1 enter: 0 delay: 500
//32.114> 2.1 handler: 0
//32.116> 2.1 enter: 1 delay: 600
//32.721> 2.1 handler: 1
//32.722> 2.1 enter: 2 delay: 0
//32.724> 2.1 handler: 2
//32.724> 2.1 err: null
//32.725> 2.1 result: [ { id: 'user0', delay: 500 },
//    { id: 'user1', delay: 600 },
//    { id: 'user2', delay: 0 } ]
