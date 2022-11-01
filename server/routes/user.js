const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userController2 = require('../controllers/userController2');
const userController3 = require('../controllers/userController3');

const app = express();
const path  = require('path');


// Routes
router.get('/home', userController.view);
router.post('/home', userController.find);
router.get('/adduser', userController.form);
router.post('/adduser', userController.create);
router.get('/edituser/:id', userController.edit);
router.post('/edituser/:id', userController.update);
router.get('/viewuser/:id', userController.viewall);
router.get('/home/:id',userController.delete);


// Routes for the second table
router.get('/home2', userController2.view);
router.post('/home2', userController2.find);
router.get('/adduser2', userController2.form);
router.post('/adduser2', userController2.create);
router.get('/edituser2/:id', userController2.edit);
router.post('/edituser2/:id', userController2.update);
router.get('/viewuser2/:id', userController2.viewall);
router.get('/home2/:id',userController2.delete);

//Routes for the third table
router.get('/home3', userController3.view);
router.post('/home3', userController3.find);
router.get('/viewuser3/:id', userController3.viewall);

module.exports = router;
