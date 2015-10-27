/**
 * @file: 1.1-1
 * @author: gejiawen
 * @date: 15/10/27 16:18
 * @description: 1.1-1
 */


var async = require('async');
var t = require('../../t');
var log = t.log;

/**
 * forever，无论条件循环执行，如果不出错，callback永远不被执行
 */
//forever(fn, callback)

/**
 * 当任务出错时,调用callback,并传递error信息
 *
 */
var count8 = 0;
async.forever(
    function (cb) {
        log('1.1-1 enter: ', count8);
        count8++;
        if (count8 === 6) {
            cb('myerr');
        } else {
            setTimeout(function() {
                log('1.1-1 handle: ', count8);
                cb();
            }, 200);
        }
    },
    function (err) {
        log('1.1-1 err: ', err);
    }
);


//19.597> 1.1-1 enter: 0
//19.809> 1.1-1 handle: 1
//19.810> 1.1-1 enter: 1
//20.018> 1.1-1 handle: 2
//20.018> 1.1-1 enter: 2
//20.225> 1.1-1 handle: 3
//20.225> 1.1-1 enter: 3
//20.431> 1.1-1 handle: 4
//20.431> 1.1-1 enter: 4
//20.638> 1.1-1 handle: 5
//20.638> 1.1-1 enter: 5
//20.640> 1.1-1 err: myerr
