const nedb = require('nedb');
const config = new nedb({ filename: 'livro.bd', autoload: true });
module.exports = config;