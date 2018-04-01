const nedb = require('nedb');
var db = new nedb({ filename: 'banco.db', autoload: true });
module.exports = db;