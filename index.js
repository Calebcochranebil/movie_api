const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const uuid = require("uuid");
const mongoose = require("mongoose");
const Models = require("./models.js");

const app = express();
const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect("mongodb://localhost:27017/myFlixDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 30000,
});

app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send("Welcome to MyFlix!");
});

app.get("/movies", (req, res) => {
    Movies.find()
        .then((movies) => {
            res.status(200).json(movies);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send("Error: " + error);
        });
});

app.get("/movies/:title", (req, res) => {
    Movies.findOne({ title: req.params.title })
        .then((movie) => {
            if (!movie) {
                return res
                    .status(404)
                    .send(
                        `Movie with title ${req.params.title} was not found.`
                    );
            }
            res.status(200).json(movie);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send("Error: " + error);
        });
});

app.get("/genres", (req, res) => {
    Genres.find()
        .then((genres) => {
            res.status(200).json(genres);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send("Error: " + error);
        });
});

app.get("/directors", (req, res) => {
    Directors.find()
        .then((directors) => {
            res.status(200).json(directors);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send("Error: " + error);
        });
});

app.get("/users", (req, res) => {
    Users.find()
        .then((users) => {
            res.status(200).json(users);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send("Error: " + error);
        });
});

app.post("/users", (req, res) => {
    Users.findOne({ Username: req.body.Username }).then((user) => {
        if (user) {
            return res.status(400).send(`${req.body.Username} already exists.`);
        }
        Users.create(req.body)
            .then((user) => {
                res.status(201).json(user);
            })
            .catch((error) => {
                console.error(error);
                res.status(500).send("Error: " + error);
            });
    });
});

app.put("/users/:Username", (req, res) => {
    Users.findOneAndUpdate(
        { Username: req.params.Username },
        { $set: req.body },
        { new: true }
    )
        .then((updatedUser) => {
            if (!updatedUser) {
                return res
                    .status(404)
                    .send(
                        `User with username ${req.params.Username} was not found.`
                    );
            }
            res.json(updatedUser);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send("Error: " + error);
        });
});

app.post("/users/:Username/movies/:MovieID", (req, res) => {
    Users.findOneAndUpdate(
        { Username: req.params.Username },
        { $addToSet: { FavoriteMovies: req.params.MovieID } },
        { new: true }
    )
        .then((updatedUser) => {
            if (!updatedUser) {
                return res
                    .status(404)
                    .send(
                        `User with username ${req.params.Username} was not found.`
                    );
            }
            res.json(updatedUser);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send("Error: " + error);
        });
});

app.delete("/users/:username", (req, res) => {
    Users.findOneAndDelete({ Username: req.params.username })
        .then((user) => {
            if (!user) {
                res.status(404).send(req.params.username + " was not found");
            } else {
                res.status(200).send(req.params.username + " was deleted.");
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error: " + err);
        });
});

app.delete("/users/:username/favorites/:movieId", (req, res) => {
    const { username, movieId } = req.params;
    Users.findOneAndUpdate(
        { Username: username },
        { $pull: { FavoriteMovies: movieId } },
        { new: true }
    )
        .then((updatedUser) => {
            if (!updatedUser) {
                res.status(404).send(username + " was not found");
            } else {
                res.status(200).send(
                    `The movie with ID ${movieId} has been removed from ${username}'s favorites.`
                );
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error: " + err);
        });
});

app.use((err, req, res, next) => {
    console.error(err.stack);

    // This will send an error code
    res.status(500).send("Something has gone wrong!");
});

// Start the server and lsten to specified
app.listen(8080, () => {
    console.log("Server is on port 8080");
});
