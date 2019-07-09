/* App configuration */

const env = {};

//Developement mode
env.dev = {
    "PORT": 3000,
    "envName": "developement",
}
//Production mode
env.pro = {
    "PORT": 5000,
    "envName": "production",
}
//Which mode to export
const moduleToExport = () => {
    if(process.env.ENV_MODE == 'production'){
        return env.pro;
    }
    return env.dev;
};

module.exports = moduleToExport();;