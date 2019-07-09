/* App helper functions */

const fs = require('fs');
const path = require('path');

const helpers = {};
//Parse JSON data to object (function)
helpers.parseJsonToObject = json => {
    try{
        const parsed = JSON.parse(json);
        return parsed;
    }catch(e){
        return {};
    }
};
//Read html file (function)
helpers.readTemplate = (dir, callback) => {
    helpers.getTemplate(dir, (filename) => {
        if(filename && filename.length > 0){
            fs.readFile(dir+'/'+filename, 'utf8', (err, str) => {
                if(!err && str && str.length > 0){
                    callback(false, str);
                }else{
                    callback(`Could not read html file: ${filename}`);
                }
            });
        }else{
            callback('Not found [file].html');
        }
    });
}
//Get html file (function)
helpers.getTemplate = (dir, callback) => {
    dir = typeof(dir) == 'string' ? dir : '';
    let filename = '';
    fs.readdir(dir, (err, files) => {
        if(!err && files){
            files.forEach(file => {
                if(file.includes('.html')){
                    filename = file;
                }
            });
        }
        callback(filename);
    });
}
//Read static files (function)
helpers.readStaticAsset = (dir, filename, callback) => {
    filename = typeof(filename) == 'string' && filename.length > 0 ? filename : false;
    if(filename){
        fs.readFile(dir+'/'+filename, (err, data) => {
            if(!err && data){
                callback(false, data);
            }else{
                callback(`No such a file: ${filename}`);
            }
        });
    }else{
        callback('File Name Required!');
    }
};

module.exports = helpers;