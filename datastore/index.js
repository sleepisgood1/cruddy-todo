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
  //use getNextUniuqe Id to get id
  //
  var data = _.map(items, (text, id) => {
    return { id, text };
  });
  callback(null, data);
};

exports.readOne = (id, callback) => {
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
