const express = require('express');
const path = require('path');
const fs = require("fs");
//const noteData = require('./db/db.json'); (needed?)
const PORT = 3000;
//or 3001?
import { nanoid } from "nanoid";
model.id = nanoid();

const app = express();

let createNTdata = [];

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.static(path.join(__dirname, "public")));


app.get("/api/notes", function (err, res) {
  try {
    createNTdata = fs.readFileSync("db/db.json", "utf8");
    console.log("Hello");
    createNTdata = JSON.parse(createNTdata);
  } catch (err) {
    console.log("\n error (catch err app.get)");
    console.log(err);
  }
  res.json(createNTdata);
});


app.post("/api/notes", function (req, res) {
  try {
    createNTdata = fs.readFileSync("./db/db.json", "utf8");
    console.log(createNTdata);
    createNTdata = JSON.parse(createNTdata);
    req.body.id = createNTdata.length;
    createNTdata.push(req.body);
    createNTdata = JSON.stringify(createNTdata);
    fs.writeFile("./db/db.json", createNTdata, "utf8", function (err) {
      if (err) throw err;
    });

    res.json(JSON.parse(createNTdata));
  } catch (err) {
    throw err;
   //console.log (err); (was faded for some reason)
  }
});

app.delete("/api/notes/:id", function (req, res) {
  try {
    createNTdata = fs.readFileSync("./db/db.json", "utf8");
    createNTdata = JSON.parse(createNTdata);
    createNTdata = createNTdata.filter(function (note) {
      return note.id != req.params.id;
    });
    createNTdata = JSON.stringify(createNTdata);

    fs.writeFile("./db/db.json", createNTdata, "utf8", function (err) {
      if (err) throw err;
    });

    res.send(JSON.parse(createNTdata));
  } catch (err) {
    throw err;
    //console.log(err); (was faded for some reason)
  }
});

// HTML GET requests

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});


app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/api/notes", function (req, res) {
  return res.sendFile(path.json(__dirname, "db/db.json"));
});


app.listen(PORT, function () {
  console.log("SERVER IS LISTENING: " + PORT);
});

