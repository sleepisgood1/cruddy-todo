const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;

var counter = 0;

// Private helper functions ////////////////////////////////////////////////////

// Zero padded numbers can only be represented as strings.
// If you don't know what a zero-padded number is, read the
// Wikipedia entry on Leading Zeros and check out some of code links:
// https://www.google.com/search?q=what+is+a+zero+padded+number%3F

const zeroPaddedNumber = (num) => {
  return sprintf('%05d', num);
};

const readCounter = (callback) => {
  fs.readFile(exports.counterFile, (err, fileData) => {
    if (err) {
      callback(null, 0);
    } else {
      callback(null, Number(fileData));
    }
  });
};

const writeCounter = (count, callback) => {
  var counterString = zeroPaddedNumber(count);
  fs.writeFile(exports.counterFile, counterString, (err) => {
    if (err) {
      throw ('error writing counter');
    } else {
      callback(null, counterString);
    }
  });
};

// Public API - Fix this function //////////////////////////////////////////////
//callback to return value
//read first, then write as success callback
exports.getNextUniqueId = (callback) => {
  readCounter((err, currentCount)=> {
    writeCounter(currentCount + 1, (err, counterString)=> {
      callback(err, counterString);
      // counter = counterString
      // return counter
    });
  });
  // readCounter()
  //fs.readFile(exports.counterFile, (err, fileData)
  //readCounter(callBack1)
  //var callBack1 = (err, number) =>{if (err) {throw (err)} else {return number}}
  // var callBack1 = (err, number) => {
  //   if (err) {
  //     throw ('error')
  //   } else {
  //     console.log(number)
  //     counter = number;
  //     return zeroPaddedNumber(counter+1)
  //   }
  // }
  // readCounter(callBack1)
  // counter = counter + 1;
  // return zeroPaddedNumber(counter);
};



// Configuration -- DO NOT MODIFY //////////////////////////////////////////////

exports.counterFile = path.join(__dirname, 'counter.txt');
// console.log(exports.getNextUniqueId())