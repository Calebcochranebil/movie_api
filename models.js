const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Define movie schema
const movieSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    genre: [
        {
            name: String,
            description: String,
        },
    ],
    director: {
        name: String,
        bio: String,
        birthYear: Number,
        deathYear: Number,
    },
    imageUrl: String,
    year: Number,
    featured: Boolean,
});

// Define user schema
let userSchema = mongoose.Schema({
    Username: { type: String, required: true },
    Password: { type: String, required: true },
    Email: { type: String, required: true },
    Birthday: Date,
    FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
});

let Movie = mongoose.model("Movie", movieSchema);
let User = mongoose.model("User", userSchema);

module.exports.Movie = Movie;
module.exports.User = User;
