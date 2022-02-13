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
  connection.query('SELECT * FROM resident', (err, rows) => {
    if (!err) {
      let removedUser = req.query.removed;
      res.render('home2', { rows, removedUser });
    } else {
      console.log(err);
    }
    console.log('The data from resident table: \n', rows);
  });
}

// Find User by Search
exports.find = (req, res) => {
  let searchTerm = req.body.search
  connection.query('SELECT * FROM resident WHERE first_name LIKE ? ', ['%' + searchTerm + '%'], (err, rows) => {
    if (!err) {
      res.render('home2', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from resident table: \n', rows);
  });
}

exports.form = (req, res) => {
  res.render('add-user2');
}

// Add new user
exports.create = (req, res) => {
  const { res_id,res_first_name, res_city, res_state} = req.body;
  let searchTerm = req.body.search
  connection.query('INSERT INTO resident SET res_id = ? , res_first_name = ?, res_city = ?, res_state = ?', [res_id, res_first_name, res_city, res_state], (err, rows) => {
    if (!err) {
      res.render('add-user2', { alert: 'User added successfully.' });
    } else {
      console.log(err);
    }
    console.log('The data from resident table: \n', rows);
  });
}


// Edit user
exports.edit = (req, res) => {
  connection.query('SELECT * FROM resident WHERE res_id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('edit-user2', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from resident table: \n', rows);
  });
}


// Update User
exports.update = (req, res) => {
  const { res_id,res_first_name, res_city, res_state } = req.body;
  // User the connection
  connection.query('UPDATE resident SET res_id = ? , res_first_name = ?, res_city = ?, res_state = ?  WHERE res_id = ?', [res_id, res_first_name, res_city, res_state, req.params.id], (err, rows) => {

    if (!err) {
      connection.query('SELECT * FROM resident WHERE res_id = ?', [req.params.id], (err, rows) => {

        if (!err) {
          res.render('edit-user2', { rows, alert: `${res_first_name} has been updated.` });
        } else {
          console.log(err);
        }
        console.log('The data from resident table: \n', rows);
      });
    } else {
      console.log(err);
    }
    console.log('The data from resident table: \n', rows);
  });
}

// Delete User
exports.delete = (req, res) => {

  // Delete a record

  // User the connection
  connection.query('DELETE FROM resident WHERE res_id = ?', [req.params.id], (err, rows) => {

    if(!err) {
      res.redirect('/');
    } else {
      console.log(err);
    }
    console.log('The data from resident table: \n', rows);

  });

  // Hide a record

  // connection.query('UPDATE resident SET status = ? WHERE id = ?', ['removed', req.params.id], (err, rows) => {
  //   if (!err) {
  //     let removedUser = encodeURIComponent('User successeflly removed.');
  //     res.redirect('/home2/?removed=' + removedUser);
  //   } else {
  //     console.log(err);
  //   }
  //   console.log('The data from beer table are: \n', rows);
  // });

}

// View Users
exports.viewall = (req, res) => {

  // User the connection
  connection.query('SELECT * FROM resident WHERE res_id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('view-user2', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from resident table from viewall: \n', rows);
  });

}
