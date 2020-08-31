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
 * Establish route handling
 */


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
	if (incomingData && incomingData.temperature && incomingData.date && incomingData.userRes) {
		projectData[`${incomingData.date}`] = incomingData;
		res.status(200).json(projectData);
	} else {
		/**
		 * Respond with 422: Unprocessable Entity status code, because the body is syntactically correct but semantically wrong
		 */
		res.status(422).json({'error': 'Your request\'s body should include the temperature, date and user response fields!'});
	}
});
/**
 * Setup Server
 */
app.listen(PORT, () => console.log(`The server is working on localhost:${PORT}`));