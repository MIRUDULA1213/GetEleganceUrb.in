const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Your MySQL username
  password: 'Miru1213dula#', // Your MySQL password
  database: 'ecommerce'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

module.exports = db;
