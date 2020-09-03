/* Setup empty JS object to act as endpoint for all routes */
const projectData = {};

/* Require Express to run server and routes */
const express = require('express');

/* Start up an instance of app */
const app = express();

/* The port that the server will listen on */
const PORT = 8080;

const cors = require('cors');


/* Middleware*/


/* Configure the server's cors policy to only accept requests from servers that have the same host, protocol and port */
app.use(cors({
	credentials: 'same-origin'
}));

/* Configure express to use its own body parsing functionality as the parsing middle-ware,
 * instead of installing the body-parser package, which's not needed anymore
 */
app.use(express.urlencoded({extended: false}));
app.use(express.json());

/* Initialize the main project folder */
app.use(express.static('website'));


/* Establish route handling */


/**
 * A GET route that returns the projectData object
 */
app.get('/getprojectdata', (req, res) => {
	res.status(200).json(projectData);
});

/**
 * A POST route that adds incoming data to the projectData object
 */
app.post('/addentry', (req, res) => {
	const incomingData = req.body;
	/**
	 * Validate the incoming data before storing it in projectData
	 */
	if (incomingData && incomingData.date && incomingData.temp && incomingData.content) {
		projectData.date = incomingData.date;
		projectData.temp = incomingData.temp;
		projectData.content = incomingData.content;
		res.status(200).json(projectData);
	} else {
		/**
		 * Respond with 400: Bad Request status code, because the JSON object is syntactically correct but semantically wrong
		 */
		res.status(400).json({'error': 'Your request\'s body should include the temperature, date and user response fields!'});
	}
});


/* Setup Server */
app.listen(PORT, () => console.log(`The server is working on localhost:${PORT}`));