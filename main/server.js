// importing express
const express = require('express');
// importing path module from node to establish link between two directorys
const path = require('path');

// variables for requests to get data from html files and api requests
const htmlRoutes = require('./routes/htmlRoutes');
const apiRoutes = require('./routes/apiRoutes');

// intitialize app variable
const app = express();
// port variable accepting heroku default or 3001
const PORT = process.env.PORT || 3001;


// setting default folder to public
app.use(express.static('public'));

// / and /api for defaults 
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// middleware for handling user inputs
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(PORT, () => {
  console.log(`Listening on PORT: http://localhost:${PORT}`)
});