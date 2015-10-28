/**
 * @file: 1.1
 * @author: gejiawen
 * @date: 15/10/28 12:17
 * @description: 1.1
 */

var async = require('async');
var t = require('../../t');
var log = t.log;

/**
 * auto用来处理有依赖关系的多个任务的执行。
 *
 * 比如某些任务之间彼此独立，可以并行执行；但某些任务依赖于其它某些任务，只能等那些任务完成后才能执行。
 * 虽然我们可以使用parallel和series结合起来实现该功能，但如果任务之间关系复杂，则代码会相当复杂，以后如果想添加一个新任务，也会很麻烦。
 * 这时使用auto，则会事半功倍。
 *
 * 如果有任务中途出错，则会把该错误传给最终callback，所有任务（包括已经执行完的）产生的数据将被忽略。
 * 如果不关心错误和最终数据，可以不用写最后那个callback。
 */
// async.auto(tasks, [callback])

/**
 * 我要写一个程序，它要完成以下几件事：
 * 1. 从某处取得数据
 * 2. 在硬盘上建立一个新的目录
 * 3. 将数据写入到目录下某文件
 * 4. 发送邮件，将文件以附件形式发送给其它人。
 *
 * 分析该任务，可以知道1与2可以并行执行，3需要等1和2完成，4要等3完成。
 * 可以按以下方式来使用auto函数。
 */

async.auto({
    getData: function (callback, results) {
        log('1.1: start `getData`');
        log('1.1: results: ', JSON.stringify(results));
        setTimeout(function () {
            log('1.1: finish `getData`');
            callback(null, 'mydata');
        }, 300);
    },
    makeFolder: function (callback, results) {
        log('1.1: start `makeFolder`');
        log('1.1: results: ', JSON.stringify(results));
        setTimeout(function () {
            log('1.1: finish `makeFolder`');
            callback(null, 'myfolder');
        }, 200);
    },
    writeFile: ['getData', 'makeFolder', function (callback, results) {
        log('1.1: start `writeFile`');
        log('1.1: results: ', JSON.stringify(results));
        setTimeout(function () {
            log('1.1: finish `writeFile`');
            callback(null, 'myfile');
        }, 300);
    }],
    emailFiles: ['writeFile', function (callback, results) {
        log('1.1: start `emailFiles`');
        log('1.1: results: ', JSON.stringify(results));
        setTimeout(function () {
            log('1.1: finish `emailFiles`');
            callback(null, 'myemail');
        })
    }]
}, function (err, results) {
    log('1.1: err: ', err);
    log('1.1: results: ', JSON.stringify(results));
});


//23.010> 1.1: start `getData`
//23.016> 1.1: results: {}
//23.017> 1.1: start `makeFolder`
//23.017> 1.1: results: {}
//23.223> 1.1: finish `makeFolder`
//23.322> 1.1: finish `getData`
//23.323> 1.1: start `writeFile`
//23.323> 1.1: results: {"makeFolder":"myfolder","getData":"mydata"}
//23.629> 1.1: finish `writeFile`
//23.629> 1.1: start `emailFiles`
//23.630> 1.1: results: {"makeFolder":"myfolder","getData":"mydata","writeFile":"myfile"}
//23.631> 1.1: finish `emailFiles`
//23.632> 1.1: err: null
//23.633> 1.1: results: {"makeFolder":"myfolder","getData":"mydata","writeFile":"myfile","emailFiles":"myemail"}
