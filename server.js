/**
 * Setup empty JS object to act as endpoint for all routes
 */
const projectData = {};

/**
 * Require Express to run server and routes
 */
const express = require('express');

/**
 * Start up an instance of app
 */
const app = express();

/**
 * The port that the server will listen on
 */
const PORT = 8080;

/* Middleware*/
/**
 * Configure express to use its own body parsing functionality as middle-ware
 */
app.use(express.urlencoded({extended: false}));
app.use(express.json());

/** 
 * Cors for cross origin allowance
 */

/**
 * Initialize the main project folder
 */
app.use(express.static('website'));


/**
 * Setup Server
 */
app.listen(PORT, () => console.log(`The server is working on localhost:${PORT}`));