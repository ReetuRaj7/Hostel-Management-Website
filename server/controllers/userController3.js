const mysql = require('mysql');
// Connection Pool
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// View Users
exports.view = (req, res) => {
  connection.query('SELECT * FROM members', (err, rows) => {
    if (!err) {
      let removedUser = req.query.removed;
      res.render('home3', { rows, removedUser });
    } else {
      console.log(err);
    }
    console.log('The data from members table: \n', rows);
  });
}

// Find User by Search
exports.find = (req, res) => {
  let searchTerm = req.body.search
  connection.query('SELECT * FROM resident WHERE first_name LIKE ? ', ['%' + searchTerm + '%'], (err, rows) => {
    if (!err) {
      res.render('home3', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from members table: \n', rows);
  });
}

exports.form = (req, res) => {
  res.render('add-user2');
}


// View Users
exports.viewall = (req, res) => {

  // User the connection
  connection.query('SELECT * FROM members WHERE mem_id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('view-user3', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from members table from viewall: \n', rows);
  });

}
