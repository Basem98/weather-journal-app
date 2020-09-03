/* Global Variables */
const weatherApiBaseUrl = 'api.openweathermap.org/data/2.5/weather?';
const weatherApiKey = 'ae3a074eabc12a7d4dbd8076376a3af0';

/**
 * Create a new date instance dynamically with JS
 */
const d = new Date();
const newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();


const generateBtn = document.getElementById('generate');


/**
 * Make a GET request to the OpenWeatherMap API
 */
async function getWeatherData(zipCode) {
	if (!zipCode)
		throw new Error('\nEmpty Field! Please, make sure you entered your zip code');

	const url = `https://${weatherApiBaseUrl}zip=${zipCode}&units=metric&appid=${weatherApiKey}`;
	const response = await fetch(url);


	if (!response.ok)
		throw new Error('\nInvalid Zip Code! Please, make sure you entered a valid zip code');

	const weatherData = await response.json();
	return weatherData;
}

/**
 * Make a POST request to add the API data as well as the user response to the projectData object on the server
 */
async function postWeatherData(url = '', data = {date: '', temp: '', content: ''}) {
	if (!data || !data.date || !data.temp || !data.content)
		throw new Error('\nEmpty Field! Please, make sure you filled all the fields!');

	const response = await fetch(url, {
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});


	if (!response.ok)
		throw new Error('\nEmpty Field! Please, make sure you filled all the fields!');

	const projectData = await response.json();
	return projectData;
}

/**
 * Update the UI dynamically to update the values of Temperature, Date and User Input
 */
async function updateUi(url = '', entryHolder) {
	const response = await fetch(url, {
		method: 'GET',
		credentials: 'same-origin'
	});


	const projectData = await response.json();
	if (!projectData) {
		throw new Error('\nNo Entries Available! There\'s no data to show yet');
	}

	for (let i = 0; i < entryHolder.children.length; i++) {
		const currentEntry = entryHolder.children.item(i);

		/* Get the entry in the projectData object that matches the id of the current element */
		currentEntry.innerHTML = `${currentEntry.id.slice(0, 1).toUpperCase()}${currentEntry.id.slice(1)}: ${projectData[currentEntry.id]}`;
	}
}

/**
 * Chain all the promises to get the data, store it and update the ui with one click
 */
function generateData(zipCode, content, entryHolder) {
	getWeatherData(zipCode)
		.then((weatherData) => {
			if (!weatherData)
				throw new Error('\nInvalid Zip Code! Please, make sure you entered a valid zip code');
			return weatherData;
		})
		.then((weatherData) => {
			const data = {};
			data.date = newDate;
			data.temp = weatherData?.main?.temp;
			data.content = content;
			return postWeatherData('/addentry', data);
		})
		.then(() => {
			return updateUi('/getprojectdata', entryHolder);
		})
		.catch((error) => {
			/**
			 * Catch any errors that are either thrown explicitly from the code
			 * or by the fetch calls in any of the functions,
			 * then show them to the user using alert()
			 */
			alert(error);
		});
}

/**
 * Add an event listener to the generate button to call the generateData function
 */
generateBtn.addEventListener('click', () => {
	const zipCode = document.getElementById('zip').value;
	const enteredContent = document.getElementById('feelings').value;
	const entryHolder = document.getElementById('entryHolder');

	generateData(zipCode, enteredContent, entryHolder);
});