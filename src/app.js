const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


// Set up Handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Set static directory to serve static files
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ebenezer Ifezulike'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ebenezer Ifezulike'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helptext: 'This is some helpful text.',
        title: 'Help page',
        name: 'Ebenezer Ifezulike'
    })
})

app.get('/weather', (req, res) => {
    const { address } = req.query;
    if (!address) {
        return res.send({
            error: 'Please provide an address or location',
        })
    }
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                forecast: forecastData,
                location,
                address
            });
        })
    })
    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 help',
        errorMessage: 'Help article not found',
        name: 'Ebenezer Ifezulike'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404', 
        errorMessage: 'Page not found',
        name: 'Ebenezer Ifezulike'
    })
})

app.listen(3000, () => {
    console.log('Server listening on port 3000.')
})