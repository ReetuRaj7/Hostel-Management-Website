const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');


const mysql = require('mysql');
require('dotenv').config();
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;


app.use(express.urlencoded({extended: true}));

app.use(express.json());

app.use(express.static('public'));

app.engine('hbs', exphbs({extname: '.hbs' }));
app.set('view engine', 'hbs');

app.get('/',function(req,res){
    res.sendFile(__dirname+'/signin.html');
});


const routes = require('./server/routes/user');

app.post('/',function(req,res){
    var username = req.body.uname;
    var password = req.body.passwd;
    if (username && password) {
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results) {
			if (error) throw error;
			if (results.length > 0) {
				res.sendFile(__dirname + '/front-page.html');
			} else {
                res.sendFile(__dirname + '/failure.html');
			}
			// res.end();
		});
    }
    else
        return res.sendFile(__dirname + '/failure.html');
});

app.use('/',routes);

app.post('/fail',function(req,res){
    res.redirect('/');
});

app.listen(port, () => console.log(`Listening on port ${port}`));
