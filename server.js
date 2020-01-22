// Dependencies
var express = require("express");
var path = require("path");
// var mysql = require("mysql");

// Set up the Express App
var app = express();
var PORT = 3000;

// HTML routes ====================================
//   * GET `/notes` - Should return the `notes.html` file.
app.use(express.static("public"));

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});
//   * GET `*` - Should return the `index.html` file
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

// API routes =====================================

//   * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
app.get("/api/notes")

//   * POST `/api/notes` - Should recieve a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.

//   * DELETE `/api/notes/:id` - Should recieve a query paramter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.

// Starts the server to begin listening
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});