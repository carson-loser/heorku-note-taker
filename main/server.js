const express = require('express');
const path = require('path');
const fs = require('fs');
// table set to contents in db.json
const table = require('./db/db.json')

// initializing express app
const app = express();

// creating unique ids
const uuid = require('uuid');

// variable for inputting on the body
const noteId = uuid.v4();

// establishing port through heroku default or local 3001
const PORT = process.env.PORT || 3001;

// middleware for handling user input
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// default for where we serve our static assets
app.use(express.static('public'));

// default for / sends user to index.html page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

// sends user to notes.html page
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// gets data from table var
app.get('/api/notes', (req, res) => {
  // res.json(table);
  // res.json(`${req.method} request received`);
  // console.info(req.rawHeaders);
  console.info(`${req.method} request received`);

  return res.json(table);
});

// app.get('/api/notes/:title', (req, res) => {
//   // setting requested title to lowerCase
//   const requestedTitle = req.params.title.toLowerCase();

//   // checking to see if requested title is equal `
//   for (let i = 0; i < table.length; i++) {
//     if (requestedTitle === table[i].title.toLowerCase()) {
//       return res.json(table[i]);
//     }
//   }

//   // return message if doesnt exist already
//   return res.json('No match found');
// });





// global get
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

// posting of new note, doesnt append only loads in terminal
app.post('/api/notes', (req, res) => {
  // res.json(table);
  // res.json(`${req.method} request received`);
  // console.info(req.rawHeaders);
  // console.info(`${req.method} request received`);

  // destructuring body for two params
  const { title, text } = req.body;

  // if title and text are inputted, create a new note with an id
  if (title && text) {
    const newNote = {
      title,
      text,
      note_id: uuid.v4(),
    };



    const noteString = JSON.stringify(newNote);

    fs.writeFile('./db/db.json', noteString, (err) => {
      err
        ? console.error(err)
        : console.log(
            `note with id: ${newNote.note_id} has been created into json file`
        )
        console.log(newNote);
    })
    // new note with an id param
    const pull = {
      status: 'success',
      body: newNote,
    };

    console.log(pull);
    res.status(201).json(pull);
  } else {
    res.status(500).json('rrror in posting note');
  }
});


//     res.json(`request for ${response.data.title} has been added`)
//   } else {
//     res.json('request body must contain a title input');
//   }

//   console.log(req.body);
//   // return res.json(table);
// });

// app.delete('/api/notes', (req, res) => {
//   res.json(`${req.method} request received`);
//   console.info(req.rawHeaders);
//   console.info(`${req.method} request received`);
// })

// active port
app.listen(PORT, () => console.log(`Listening on PORT: http://localhost:${PORT}`));


