// Dependencies
var express = require("express");
var path = require("path");
var fs = require("fs")
var db = require("./db/db.json")
// Set up the Express App
var app = express();
var PORT = process.env.PORT || 3000;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// HTML routes ====================================
app.use(express.static("public"));
//   * GET `/notes` - Should return the `notes.html` file.
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});
//   * GET `*` - Should return the `index.html` file
// API routes =====================================
//   * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
app.get("/api/notes", function (req, res) {
    res.json(db)
});
//   * POST `/api/notes` - Should recieve a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
app.post("/api/notes", function (req, res) {
    var newPost = req.body;
    // console.log(newPost)
    db.push(newPost);
    // console.log(db);
    let data = JSON.stringify(db, null, 2);
    fs.writeFile("./db/db.json", data, function (err) {
        if (err) throw err;
        console.log('Saved!');
        // console.log(data)

        // add id and number to each note
        // NOT WORKING
        for (i = 0; i > data.length; i++) {
            console.log(data)
            var highestId = math.max(data[i])
            console.log(highestId)
            data.id = highestId + 1
        }
    })
    res.redirect("/notes")
})
//   * DELETE `/api/notes/:id` - Should recieve a query paramter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.

// CODE NOT WORKING
app.delete("/api/notes/:id", function (req, res) {
    // console.log(req.body.params);
    var noteId = req.params
    fs.readFile("./db/db.json", function (err, data) {
        if (err) throw err;
        for (i = 0; i > db.length; i++) {
            console.log(db[i])

        }
    })
})





app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});
// Starts the server to begin listening
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});