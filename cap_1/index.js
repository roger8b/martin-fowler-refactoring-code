const invoices = require('./invoices.json');
const play = require('./play.json');
const {statement} = require('./statement');

const result = statement(invoices, play);
console.log(result)
