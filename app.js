//initialize an express server
const express = require('express');
const app = express();

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(__dirname + '/views/partials');

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render("index");
});

app.get('/beers', (req, res) => { //Traditional way to consume promises
  //Promises - JS objects that might have or not a value in the future

  punkAPI.getBeers().then(beers => {
    res.render('beers', {beers});
  });
  // .catch(error => {
  //   console(error);
  // });
});

// app.get('/beers', async (req, res) => { //Modern way to consume promises
//   const beers = await punkAPI.getBeers();
//   res.render("beers", {beers});
// });

app.get('/random-beer', (req, res) => {
  punkAPI.getRandom().then(beer => {
    res.render('random-beer', {beer});
  });
});



app.listen(3000, () => console.log('🏃‍ on port 3000'));
