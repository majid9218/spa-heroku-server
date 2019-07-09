# Foobar

Simple server to deploy your SPA to heroku

## Installation


```bash
npm install spa-heroku-server
```
If you use yarn
```bash
yarn add spa-heroku-server
```


## Usage

```javascript 
const path = require('path');
const server = require('spa-heroku-server');

//Set your static folder
server.setStaticFolder(path.join(__dirname,'YOUR_FOLDER_NAME'));

//Set your listening port
server.setPORT(process.env.port);

//Initialize server
server.init();
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)