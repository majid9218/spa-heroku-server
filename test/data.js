const path = require('path');

const data = {};

data.folder =  path.join(__dirname, 'test_public');

data.case_1 = {
    "staticFolder": path.join(__dirname, 'test_public'),
    "path": '',
    "headers": {
        host: 'localhost:3000',
    },
    "method": 'get',
    "queryString": {},
    "payload": {}
};

data.case_2 = {
    "staticFolder": path.join(__dirname, 'test_public'),
    "path": '',
    "headers": {
        host: 'localhost:3000',
    },
    "method": 'post',
    "queryString": {},
    "payload": {}
};

data.case_3 = {
    "staticFolder": path.join(__dirname, 'test_public'),
    "path": 'assets/main.css',
    "headers": {
        host: 'localhost:3000',
    },
    "method": 'get',
    "queryString": {},
    "payload": {}
};

data.case_4 = {
    "staticFolder": path.join(__dirname, 'test_public'),
    "path": 'assets/app.js',
    "headers": {
        host: 'localhost:3000',
    },
    "method": 'get',
    "queryString": {},
    "payload": {}
};

data.case_5 = {
    "staticFolder": path.join(__dirname, 'test_public'),
    "path": 'images/favicon.ico',
    "headers": {
        host: 'localhost:3000',
    },
    "method": 'get',
    "queryString": {},
    "payload": {}
};

data.case_6 = {
    "staticFolder": path.join(__dirname, 'test_public'),
    "path": 'images/img.png',
    "headers": {
        host: 'localhost:3000',
    },
    "method": 'get',
    "queryString": {},
    "payload": {}
};

data.case_7 = {
    "staticFolder": path.join(__dirname, 'test_public'),
    "path": 'images/img.jpg',
    "headers": {
        host: 'localhost:3000',
    },
    "method": 'get',
    "queryString": {},
    "payload": {}
};



module.exports = data;