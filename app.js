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

var isLogged = false;

app.use(express.urlencoded({extended: true}));

app.use(express.json());

app.use(express.static('public'));

app.engine('hbs', exphbs({extname: '.hbs' }));
app.set('view engine', 'hbs');

app.get('/',function(req,res){
  if(!isLogged)
    res.sendFile(__dirname+'/signin.html');
  else
    res.sendFile(__dirname+'/front-page.html');
});


const routes = require('./server/routes/user');


// app.post('/logout',(req,res)=>isLogged=false);
app.get('/logout',function(req,res){
  isLogged=false;
  res.redirect('/')
});

app.post('/',function(req,res){
    var username = req.body.uname;
    var password = req.body.passwd;
    if (username && password) {
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results) {
			if (error) throw error;
			if (results.length > 0) {
        isLogged = true;
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

var T = new Date();
const time = T.toLocaleTimeString();
app.listen(port, () => console.log(`Listening on port ${port}, since ${time}`));
