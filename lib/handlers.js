/* App handlers */

const helpers = require('./helpers');

const handlers = {};
//Html file handler
handlers.main = (data, callback) => {
    const {staticFolder, method} = data;
    //Check accepted method
    if(method == 'get'){
        helpers.readTemplate(staticFolder, (err, str) => {
            if(!err && str){
                callback(200, str, 'html');
            }else{
                callback(400, {Error: err});
            }
        });
    }else{
        callback(405);
    }
};
//Static files handler
handlers.public = (data, callback) => {
    const {staticFolder, path, headers, method, queryString, payload} = data;
    //Check accepted method
    if(method === 'get'){
        //Extract file name from the path
        const filename = path.replace(`${staticFolder}/`, '');
        helpers.readStaticAsset(staticFolder, filename, (err, data) => {
            if(!err && data){

                let contentType = 'plain';

                if(filename.includes('.css')){
                    contentType = 'css'
                }

                if(filename.includes('.png')){
                    contentType = 'png'
                }

                if(filename.includes('.jpg')){
                    contentType = 'jpg'
                }

                if(filename.includes('.ico')){
                    contentType = 'favicon'
                }

                callback(200, data, contentType);

            }else{
                callback(400, {"Error": err});
            }
        });
    }else{
        callback(405);
    }
};
//404 handler
handlers.unKnown = (data, callback) => {
    callback(404);
};

module.exports = handlers;