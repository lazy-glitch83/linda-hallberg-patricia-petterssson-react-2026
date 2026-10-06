const express = require('express'); // Loading Express package into 'express' variable
const app = express(); // Creating Express application into 'app' variable
const cors = 

const MYPORT = 3000; // Defining port number used for the server

//Defining default route
app.get('/', (req, res) => { //continuing from p. 3 WORKSHOP 2: Node, express and REST API