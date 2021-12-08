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

  fs.readdir(exports.dataDir, (err, dirData) => {

    if (err) {
      callback(err);
    } else {
      // callback(console.log(dirData));
      callback(null, _.map(dirData, (id, key) => {
        var onlyid = id.substring(0, 5);
        return { 'id': onlyid, 'text': onlyid };
      }))
      ;
    }
  });

};

exports.readOne = (id, callback) => {
  //fs.readfile (id) on
  fs.readFile(`${exports.dataDir}/${id}.txt`, (err, fileData) => {
    if (err) {
      callback(err);
    } else {
      var data = fileData.toString();
      // callback(console.log('line 57:', {"id": id, "text": data}))
      //expect { id: '00001', text: 'buy chocolate' }
      callback(null, {"id": id, "text": data});
    }
  });
  // var text = items[id];
  // if (!text) {
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   callback(null, { id, text });
  // }
};

exports.update = (id, text, callback) => {
  fs.readFile(`${exports.dataDir}/${id}.txt`, (err) => {
    if (err) {
      callback(err);
    } else {
      fs.writeFile(`${exports.dataDir}/${id}.txt`, text, (err, fileData) => {
        if (err) {
          callback(err);
        } else {
          callback(null, text);//should we be returning anything? why, what?
        }
      })
    }
  });
}


exports.delete = (id, callback) => {
  //use fs.unlink to delete
  fs.unlink(`${exports.dataDir}/${id}.txt`, (err) => {
    if (err) {
      callback(err);
    } else {
      callback();
    }
  });
};


// var item = items[id];
//   delete items[id];
//   if (!item) {
//     // report an error if item not found
//     callback(new Error(`No item with id: ${id}`));
//   } else {
//     callback();
//   }

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