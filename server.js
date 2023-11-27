const express = require('express');
const path = require('path');
const fs = require("fs");
const noteData = require('./db/db.json');
const PORT = process.env.PORT || 3001;
const app = express();
//where to put this, unique id when saved (below)? this gave an error "can't import"(?) when deploying
// "nanoid": "^5.0.3", in "dependencies":
//import { nanoid } from "nanoid";
//model.id = nanoid();
//note.id (below)?

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
//or  app.use(express.static('public'));?

app.get('/api/notes', (req, res) => {
  res.json(noteData.slice(1));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

function createNewNote(body, notesArray) {
  const newNote = body;
  if (!Array.isArray(notesArray))
      notesArray = [];
  
  if (notesArray.length === 0)
      notesArray.push[0]++;
//attempting to display each note again, only doing first note
  body.id = notesArray[0];
 notesArray[0]++;

  notesArray.push(newNote);
  fs.writeFileSync(
  path.join(__dirname, './db/db.json'),
  JSON.stringify(notesArray, null, 2)
  );
  return newNote;
}

app.post('/api/notes', (req, res) => {
  const newNote = createNewNote(req.body, noteData);
  res.json(newNote);
});

function deleteNote(id, notesArray) {
  for (let i = 0; i < notesArray.length; i++) {
      let note = notesArray;
//(above) attempting to have each note able to be deleted, [i]++ deleted the whole thing
  if (note.id == id) {
  notesArray.splice(i, 1);
  fs.writeFileSync(
  path.join(__dirname, './db/db.json'),
  JSON.stringify(notesArray, null, 2)
  );

  break;
  }
  }
}

app.delete('/api/notes/:id', (req, res) => {
  deleteNote(req.params.id, noteData);
  res.json(true);
});

app.listen(PORT, function () {
  console.log("API server is now on Port: " + PORT);
});

