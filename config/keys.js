// keys.js - figures out which keys to use
// 'production' set by heroku if in production
if(process.env.NODE_ENV === 'production'){
    // we are in production return prod keys
    module.exports = require('./prod');
} else {
    // return dev keys
    // export and require
    module.exports = require('./dev');
}