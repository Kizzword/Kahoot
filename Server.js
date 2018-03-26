const express = require('express');
const request = require('request');
const darksky = require('./weather.js');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
var weather = '';

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
})

hbs.registerHelper('message', (text) => {
	return text.toUpperCase();
})

// app.use((request, response, next) => {
// 	var time = new Date().toString();
// 	//console.log(`${time}: ${request.method} ${request.url}`);
// 	var log = `${time}: ${request.method} ${request.url}`;
// 	fs.appendFile('server.log', log + '\n', (error) => {
// 		if (error) {
// 			console.log('Unable to log message');
// 		}
// 	})
// 	next();
// });

app.use((req, res, next) => {
	res.render('maintain.hbs')
})

app.get('/', (request, response) => {
	// response.send('<h1>Hello Express</h1>!');
	response.send({
		name: 'Jimmy Chien',
		school: [
			'BCIT',
			'SFU',
			'UBC'
		]
	})
});

app.get('/info', (request, response) => {
	response.render('about.hbs', {
		title: 'About page',
		year: new Date().getFullYear(),
		welcome: 'Hello!'
	});
});


app.get('/', (request, response) => {
	response.render('home.hbs', {
		title: 'home page'
		
	});
});

app.get('/weather', (request, response) => {
	response.render('weather.hbs', {
		title: 'weather page',
		weather: weather
	});
});



app.get('/404', (request, response) => {
	response.send({
		error: 'Page not found'
	})
})

app.listen(8080, () => {
	console.log('Server is up on the port 8080');
	darksky.getWeather(0.1275, 0.1278).then((result) => {
    	weather = String(result.temperature) + 'F in London';
    });
});
