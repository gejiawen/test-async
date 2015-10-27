/**
 * @file: 1.1
 * @author: gejiawen
 * @date: 15/10/27 16:15
 * @description: 1.1
 */

var async = require('async');
var t = require('../../t');
var log = t.log;

/**
 * forever，无论条件循环执行，如果不出错，callback永远不被执行
 */
//forever(fn, callback)


var count7 = 0;
async.forever(
    function (cb) {
        log('1.1 enter: ', count7);
        count7++;
        setTimeout(function() {
            log('1.1 handle: ', count7);
            cb();
        }, 200);
    },
    function (err) {
        log('1.1 err: ', err);
    }
);

//  一直执行下去

//31.261> 1.1 enter: 0
//31.471> 1.1 handle: 1
//31.473> 1.1 enter: 1
//31.677> 1.1 handle: 2
//31.678> 1.1 enter: 2
//31.880> 1.1 handle: 3
//31.880> 1.1 enter: 3
//32.083> 1.1 handle: 4
//32.083> 1.1 enter: 4
//32.288> 1.1 handle: 5
//32.288> 1.1 enter: 5
//32.492> 1.1 handle: 6
//32.492> 1.1 enter: 6
//32.697> 1.1 handle: 7
