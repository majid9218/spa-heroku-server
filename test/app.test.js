const handlers = require('../lib/handlers');
const helpers = require('../lib/helpers');
const data = require('./data');

/* 
*
*
Handlers Testing 
*
*
*/

//Testing handlers.main with data (case_1)
test('handlers.main should return statusCode=200,  payload={string}, contentType=html', () => {
    handlers.main(data.case_1, (statusCode, payload, contentType) => {
        expect(statusCode).toBe(200);
        expect(typeof(payload)).toBe('string');
        expect(contentType).toBe('html');
    });
});

//Testing handlers.main with data (case_2)
test('handlers.main should return statusCode=405', () => {
    handlers.main(data.case_2, (statusCode) => {
        expect(statusCode).toBe(405);
    });
});

//Testing handlers.public with data (case_2)
test('handlers.public should return statusCode=405', () => {
    handlers.public(data.case_2, (statusCode) => {
        expect(statusCode).toBe(405);
    });
});

//Testing handlers.public with data (case_3)
test('handlers.public should return statusCode=200 payload={object} contentType=css', () => {
    handlers.public(data.case_3, (statusCode, payload, contentType) => {
        expect(statusCode).toBe(200);
        expect(typeof(payload)).toBe('object');
        expect(contentType).toBe('css');
    });
});

//Testing handlers.public with data (case_4)
test('handlers.public should return statusCode=200 payload={object} contentType=css', () => {
    handlers.public(data.case_4, (statusCode, payload, contentType) => {
        expect(statusCode).toBe(200);
        expect(typeof(payload)).toBe('object');
        expect(contentType).toBe('plain');
    });
});

//Testing handlers.public with data (case_5)
test('handlers.public should return statusCode=200 payload={object} contentType=favicon', () => {
    handlers.public(data.case_5, (statusCode, payload, contentType) => {
        expect(statusCode).toBe(200);
        expect(typeof(payload)).toBe('object');
        expect(contentType).toBe('favicon');
    });
});

//Testing handlers.public with data (case_6)
test('handlers.public should return statusCode=200 payload={object} contentType=png', () => {
    handlers.public(data.case_6, (statusCode, payload, contentType) => {
        expect(statusCode).toBe(200);
        expect(typeof(payload)).toBe('object');
        expect(contentType).toBe('png');
    });
});

//Testing handlers.public with data (case_7)
test('handlers.public should return statusCode=200 payload={object} contentType=jpg', () => {
    handlers.public(data.case_7, (statusCode, payload, contentType) => {
        expect(statusCode).toBe(200);
        expect(typeof(payload)).toBe('object');
        expect(contentType).toBe('jpg');
    });
});


/* 
*
*
helpers Testing 
*
*
*/

//Testing helpers.parseJsonToObject does not throw if there is no param
test('helpers.parseJsonToObject should not throw', () => {
    expect(helpers.parseJsonToObject(undefined)).toEqual({});
});

//Testing helpers.readTemplate does not throw if params not valid
test('helpers.readTemplate(undefined) should callback without throwing', () => {
    helpers.readTemplate(undefined, (err) => {
        expect(typeof(err)).toBe('string');
    });
});

//Testing helpers.readTemplate data folder
test('helpers.readTemplate(data.folder) should callback false error and string data', () => {
    helpers.readTemplate(data.folder, (err, data) => {
        expect(err).toBe(false);
        expect(typeof(data)).toBe('string');
    });
});

//Testing helpers.getTemplate 
test('helpers.getTemplate(data.folder) should callback index.html', () => {
    helpers.getTemplate(data.folder, (filename) => {
        expect(filename).toBe('index.html');
    });
});

//Testing helpers.readStaticAsset does not throw if params not valid
test("helpers.readStaticAsset(undefined, undefined) should callback without throwing", () => {
    helpers.readStaticAsset(undefined, undefined, (err) => {
        expect(typeof(err)).toBe('string');
    });
});

//Testing helpers.readStaticAsset with specified file name
test("helpers.readStaticAsset(data.folder, 'assets/main.css') should callback false error and string data", () => {
    helpers.readStaticAsset(data.folder, 'assets/main.css', (err,data) => {
        expect(err).toBe(false);
        expect(typeof(data)).toBe('object');
    });
});
