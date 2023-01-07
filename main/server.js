const express = require('express');
const path = require('path');
// requiring routers for routes
const htmlRoutes = require('./routes/htmlRoutes');
// const apiRoutes = require('./routes/apiRoutes')

// initializing express app
const app = express();

// establishing port through heroku default or local 3000
const PORT = process.env.PORT || 3000;

// middleware for handling user input
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// default for where we serve our static assets
app.use(express.static('public'));

// 
// app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// active port
app.listen(PORT, () => console.log(`Listening on PORT: http://localhost:${PORT}`));


