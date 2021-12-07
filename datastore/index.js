const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////
//fs.writeFile(exports.counterFile, counterString, (err) =>

exports.create = (text, callback) => {
  //getuniqueID
  //writeFile(uniqueId.txt, txt, err)
  counter.getNextUniqueId((err, id) => {
    if (err) {
      callback(null, err);
    } else {
      fs.writeFile(`${exports.dataDir}/${id}.txt`, text, (err) => {
        if (err) {
          callback(null, err);
        } else {
          callback(null, { id, text });
        }
      });
    }
  });
  //   var id = counter.getNextUniqueId();
  //   items[id] = text;
  //   callback(null, { id, text });
};

exports.readAll = (callback) => {
  //[ '00001.txt', '00002.txt' ] = dirData
  //?? just use fs.readdir(dataDir) to get arr of all file names in the dir??
  fs.readdir(exports.dataDir, (err, dirData) => {

    if (err) {
      callback(null, err);
    } else {
      // callback(console.log(dirData));
      callback(null, _.map(dirData, (id, key) => {
        var onlyid = id.substring(0, 5);
        return { 'id': onlyid, 'text': onlyid };
      }))
      ;
    }
  });
  //dirData = [filename, filname2, etc.]
  //items = {id: text, id2: text, id3: text}
  // var data = _.map(items, (text, id) => {
  //   return { id, text };
  // });
  // callback(null, data);
};

exports.readOne = (id, callback) => {
  //fs.readfile (id) on
  var text = items[id];
  if (!text) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback(null, { id, text });
  }
};

exports.update = (id, text, callback) => {
  var item = items[id];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    items[id] = text;
    callback(null, { id, text });
  }
};

exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
// console.log(exports.dataDir);
// console.log(exports.readAll())
//list of Q
//why is there error handling in both exports. getUniqueId if its functions that are already dealing with erros
// is the callback in the getUniqueId parameter necessary? is the it best possible implementation?
// is there a way to read all the files within a directory?