/* App http server */

const http          = require('http');
const path          = require('path');
const URL           = require('url');
const stringDecoder = require('string_decoder').StringDecoder;
const config        = require('../config');
const port          = config.PORT || 3000;
const handlers      = require('./handlers');
const helpers       = require('./helpers');

const server = {};

//Create http server
server.httpServer = http.createServer((req, res, next) => {
    if(server.staticFolder){
        //Extract data from url
        const url = URL.parse(req.url, true);
        const path = url.pathname;
        const trimedPath = path.replace(/^\/+|\/+$/g, '');
        const headers = req.headers;
        const method = req.method.toLowerCase();
        const query = url.query;
        const decoder = new stringDecoder('UTF-8');
        let buffer = '';

        req.on('data', (data) => {
            buffer += decoder.write(data);
        });

        req.on('end', () => {
            buffer += decoder.end();

            const data = {
                "staticFolder": server.staticFolder,
                "path": trimedPath,
                "headers": headers,
                "method": method,
                "queryString": query,
                "payload": helpers.parseJsonToObject(buffer)
            }
            //If file is not html file
            if(trimedPath.includes('.js')  || 
               trimedPath.includes('.css') || 
               trimedPath.includes('.ico') || 
               trimedPath.includes('.png') || 
               trimedPath.includes('.jpg')){
                //Handling static files 
                handlers.public(data, (statusCode, payload, contentType) => {
                    statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
                    contentType = typeof(contentType) == 'string' && contentType.length > 0 ? contentType : 'json';
                    let stringPayload = '';

                    if(contentType == 'json'){
                        res.setHeader('Content-Type', 'application/json');
                        payload = typeof(payload) == 'object' ? payload : {};
                        stringPayload = JSON.stringify(payload);
                    }
                    if(contentType == 'plain'){
                        res.setHeader('Content-Type', 'text/plain');
                        stringPayload = typeof(payload) !== undefined ? payload : '';
                    }
                    if(contentType == 'css'){
                        res.setHeader('Content-Type', 'text/css');
                        stringPayload = typeof(payload) !== undefined ? payload : '';
                    }
                    if(contentType == 'favicon'){
                        res.setHeader('Content-Type', 'image/x-icon');
                        stringPayload = typeof(payload) !== undefined ? payload : '';
                    }
                    if(contentType == 'png'){
                        res.setHeader('Content-Type', 'image/png');
                        stringPayload = typeof(payload) !== undefined ? payload : '';
                    }
                    if(contentType == 'jpg'){
                        res.setHeader('Content-Type', 'image/jpg');
                        stringPayload = typeof(payload) !== undefined ? payload : '';
                    }

                    res.writeHead(statusCode);
                    res.end(stringPayload);

                });

            }else{
                //If file is html, handling html file
                handlers.main(data, (statusCode, payload, contentType) => {
                    statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
                    payload = typeof(payload) == 'string' ? payload : '';
                    contentType = typeof(contentType) == 'string' && contentType.length > 0 ? contentType : 'json';
                    
                    if(contentType == 'html'){
                        res.setHeader('Content-Type', 'text/html');
                    }else{
                        res.setHeader('Content-Type', 'application/json');
                    }
            
                    res.writeHead(statusCode);
                    res.end(payload);
                });

            }
        });

    }else{
        res.end('not found static folder');
    }
});

//Set the static folder (function)
server.setStaticFolder = (staticFolder) => {
    server.staticFolder = typeof(staticFolder) == 'string' && staticFolder.length > 0 ? staticFolder: false;
};
//Set the PORT (function)
server.setPORT = (PORT) => {
    server.PORT = typeof(PORT) == 'number' ? PORT : undefined;
};
//Initilaizing (function)
server.init = () => {
    const PORT = server.PORT || port;
    server.httpServer.listen(PORT, () => {
        console.log(`Lestining to port ${PORT}`);
    });
};

module.exports = server;