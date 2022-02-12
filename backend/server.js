const express = require("express");
const server = express();

const mongoose = require("mongoose");

const bodyParser = require("body-parser");
server.use(bodyParser.urlencoded({ extended: false }));

// Connection à la bd
let db;

async function dbConnect() {
    console.log(">> mongo");
    const url = "mongodb://127.0.0.1:27017/moviesnotif";
    mongoose.connect(url, { useNewUrlParser: true });
    db = mongoose.connection;
    db.once("open", (_) => {
        console.log("Database connected:", url);
    });

    db.on("error", (err) => {
        console.error("connection error:", err);
    });
}

dbConnect();

const Movie = mongoose.model("Movie", new mongoose.Schema({}), "movies");

// Route // API
server.get("/", (request, response) => {
    // console.log(">> req", request)
    // return response.send("Hello")
    return response.send({
        name: "Hello",
    });
});

// Liste des films
server.get("/films", (req, res) => {
    // Connecter la collection
    var collection = db.collection("movies");
    // Trouver tous les documents
    collection.find().toArray(function (err, movies) {
        // S'il y a erreur
        if(err){
            return res.send("erreur", err);
        }
        // Retourne les films de la bd
        return res.send(movies)
    }); 
});

server.get("/routeb", (request, response) => {
    // console.log(">> req", request)
    // return response.send("Hello")
    return response.send("Route b");
});

server.post("/vote", (request, response) => {
    console.log(">> req", request.body);

    return response.send(request.body);
    const id_film = request.body.id_film;
    console.log(">> req", request.body.id_film);
    return response.send({
        id_film: id_film,
        voted: true,
    });
});

// Lancement du serveur
server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
