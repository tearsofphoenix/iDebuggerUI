'use strict';

const { ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');
const deleteItem = require('../lib/delete-directory')

module.exports = () => {
  //ipcMain listeners

  ipcMain.on('createItem', (event, dirPath, name, type) => {
    if (type === 'file') {
      fs.writeFile(path.join(dirPath, name), '', err => {
        if (err) console.log(err);
      });
    } else {
      fs.mkdir(path.join(dirPath, name), err => {
        if (err) console.log(err);
      });
    }
  });

  ipcMain.on('delete', (event, itemPath) => {
    deleteItem(itemPath);
  });

  ipcMain.on('rename', (event, itemPath, newName) => {
    fs.rename(itemPath, path.join(path.dirname(itemPath), newName));
  });

  ipcMain.on('save-file', (event, {data, path}) => {
    if (fs.writeFileSync(path, data)) {
      console.log('save file ok!')
    }
  })
};
