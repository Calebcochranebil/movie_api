const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const morgan = require("morgan");
const uuid = require("uuid");

const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send("Welcome to MyFlix!");
});

const movies = [
    {
        title: "The Lion King",
        description:
            "The Lion King is a 1994 American animated musical film produced by Walt Disney Feature Animation and released by Walt Disney Pictures. It is the 32nd Disney animated feature film, and the fifth animated film produced during a period known as the Disney Renaissance.",
        genre: {
            name: "Animation",
            description:
                "A film genre that uses animation techniques to create the illusion of movement and often includes elements of comedy, adventure, and drama.",
        },
        director: {
            name: "Roger Allers and Rob Minkoff",
            bio: "Roger Allers is an American animator, screenwriter, storyboard artist, and director. Rob Minkoff is an American filmmaker and director.",
            Birthyear: "1949 and 1962",
            Deathyear: "N/A",
        },
        imageUrl:
            "https://lumiere-a.akamaihd.net/v1/images/p_thelionking_19752_1_0b9de87b.jpeg",
        year: "1994",
        featured: true,
    },
    {
        title: "Joker",
        description:
            "Joker is a 2019 American psychological thriller film directed and produced by Todd Phillips. The film, based on DC Comics characters, stars Joaquin Phoenix as the Joker and provides an alternative origin story for the character.",
        genre: {
            name: "Thriller",
            description:
                "A genre of fiction that is intended to create a feeling of suspense and excitement in the audience.",
        },
        director: {
            name: "Todd Phillips",
            bio: "Todd Phillips is an American filmmaker and screenwriter. He is best known for directing and producing comedies, including The Hangover trilogy.",
            Birthyear: "1970",
            Deathyear: "N/A",
        },
        imageUrl:
            "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
        year: "2019",
        featured: true,
    },
    {
        title: "Pirates of the Caribbean: Dead Man's Chest",
        description:
            "Pirates of the Caribbean: Dead Man's Chest is a 2006 American fantasy swashbuckler film directed by Gore Verbinski and the second installment of the Pirates of the Caribbean film series.",
        genre: {
            name: "Adventure",
            description:
                "A genre of fiction that involves an exciting or unusual experience or activity, typically involving danger and often requiring the viewer to engage with the characters and the story on an emotional level.",
        },
        director: {
            name: "Gore Verbinski",
            bio: "Gregor Verbinski is an American film director, screenwriter, and producer. He is best known for directing the first three films in the Pirates of the Caribbean film series.",
            Birthyear: "1964",
            Deathyear: "N/A",
        },
        imageUrl:
            "https://m.media-amazon.com/images/M/MV5BNWY5NDEwMTctZmZhMS00MjBhLTkxM2MtZGM3ZWFiN2MxMTk0XkEyXkFqcGdeQXVyNTc0NjY1ODk@._V1_FMjpg_UX1000_.jpg",
        year: "2006",
        featured: true,
    },
    {
        title: "Bohemian Rhapsody",
        description:
            "Bohemian Rhapsody is a 2018 biographical drama film about the British rock band Queen, focusing on lead singer Freddie Mercury's life leading up to Queen's Live Aid performance at Wembley Stadium in 1985.",
        genre: {
            name: "Biographical drama",
            description:
                "A genre of film that dramatizes the life of an important person or people, often from a historical or cultural context.",
        },
        director: {
            name: "Bryan Singer",
            bio: "Bryan Singer is an American film director, producer, and screenwriter. He is best known for directing films such as The Usual Suspects and the X-Men film series.",
            Birthyear: "1965",
            Deathyear: "N/A",
        },
        imageUrl:
            "https://m.media-amazon.com/images/M/MV5BMTA2NDc3Njg5NDVeQTJeQWpwZ15BbWU4MDc1NDcxNTUz._V1_FMjpg_UX1000_.jpg",
        year: "2018",
        featured: true,
    },
    {
        title: "Ice Age: Continental Drift",
        description:
            "Ice Age: Continental Drift is a 2012 American computer-animated adventure comedy film. It is the fourth installment in the Ice Age film series.",
        genre: {
            name: "Animation",
            description:
                "A genre of film that uses animation to create humorous situations and characters.",
        },
        director: {
            name: "Steve Martino and Mike Thurmeier",
            bio: "Steve Martino is an American animator and film director. Mike Thurmeier is an American animator and film director.",
            Birthyear: "1959 and 1970",
            Deathyear: "N/A",
        },
        imageUrl:
            "https://movieguide.b-cdn.net/wp-content/uploads/2012/08/ice-age-4-continental-drift.28912-768x1152.jpg",
        year: "2012",
        featured: true,
    },
    {
        title: "Forrest Gump",
        description:
            "Forrest Gump is a 1994 American comedy-drama film directed by Robert Zemeckis and based on the 1986 novel of the same name by Winston Groom. It stars Tom Hanks, Robin Wright, and Gary Sinise.",
        genre: {
            name: "Comedy-drama",
            description:
                "A genre of film that combines elements of comedy and drama, often with a focus on character development and emotional depth.",
        },
        director: {
            name: "Robert Zemeckis",
            bio: "Robert Zemeckis is an American film director, producer, and screenwriter. He is best known for directing films such as the Back to the Future trilogy, Forrest Gump, and Cast Away.",
            Birthyear: "1951",
            Deathyear: "N/A",
        },
        imageUrl: "https://i.ytimg.com/vi/hf_lCA-T99c/movieposter_en.jpg",
        year: "1994",
        featured: true,
    },
    {
        title: "Inside Out",
        description:
            "Inside Out is a 2015 American computer-animated comedy-drama film produced by Pixar Animation Studios and released by Walt Disney Pictures. It is directed by Pete Docter and co-directed by Ronnie del Carmen.",
        genre: {
            name: "Comedy-drama",
            description:
                "A genre of film that uses animation to create humorous and emotional situations and characters.",
        },
        director: {
            name: "Pete Docter and Ronnie del Carmen",
            bio: "Pete Docter is an American film director, animator, and screenwriter. Ronnie del Carmen is a Filipino-American story artist, writer, and director.",
            Birthyear: "1968 and 1959",
            Deathyear: "N/A",
        },
        imageUrl:
            "https://lumiere-a.akamaihd.net/v1/images/p_insideout_19751_af12286c.jpeg?region=0%2C0%2C540%2C810",
        year: "2015",
        featured: true,
    },
    {
        title: "Jumanji: The Next Level",
        description:
            "Jumanji: The Next Level is a 2019 American fantasy adventure comedy film directed by Jake Kasdan and co-written by Kasdan, Jeff Pinkner, and Scott Rosenberg. It is the fourth installment in the Jumanji franchise.",
        genre: {
            name: "Fantasy adventure comedy",
            description:
                "A genre of film that combines elements of fantasy, adventure, and comedy, often with a focus on humor and action.",
        },
        director: {
            name: "Jake Kasdan",
            bio: "Jake Kasdan is an American film and television director, producer, and screenwriter. He is best known for directing films such as Orange County, Walk Hard: The Dewey Cox Story, and the Jumanji film series.",
            Birthyear: "1974",
            Deathyear: "N/A",
        },
        imageUrl:
            "https://www.sonypictures.com/sites/default/files/styles/max_560x840/public/title-key-art/jumanjithenextlevel_onesheet_1400x2100.jpg?itok=1_kQc_Bz",
        year: "2019",
        featured: true,
    },
    {
        title: "2012",
        description:
            "2012 is a 2009 American disaster film directed by Roland Emmerich and starring John Cusack, Chiwetel Ejiofor, and Amanda Peet. The film depicts the end of the world as predicted by the Mayan calendar.",
        genre: {
            name: "Disaster",
            description:
                "A genre of film that depicts a catastrophic event or series of events that threaten human life and civilization.",
        },
        director: {
            name: "Roland Emmerich",
            bio: "Roland Emmerich is a German film director, producer, and screenwriter. He is best known for directing disaster films such as Independence Day, The Day After Tomorrow, and 2012.",
            Birthyear: "1955",
            Deathyear: "N/A",
        },
        imageUrl:
            "https://static.wikia.nocookie.net/2012movie/images/5/50/2012_2009_2669_poster.jpg/revision/latest?cb=20160730140340s",
        year: "2009",
        featured: true,
    },
    {
        title: "White House Down",
        description:
            "U.S. Capitol Police officer, John Cale, teams up with the President of the United States to thwart a group of terrorists who have taken over the White House."        genre: {
            name: "Biographical sports drama",
            description:
                "A genre of film that dramatizes the life of a real person involved in a sport, often with a focus on the challenges they faced and overcame.",
        },
         genre: {
            name: "Thriller",
            description:
                "A genre of film that depicts a catastrophic event or series of events that threaten human life and civilization.",
        },
        director: {
            name: "Roland Emmerich",
            bio: "Roland Emmerich is a German film director, producer, and screenwriter. He is best known for directing disaster films such as Independence Day, The Day After Tomorrow, and 2012.",
            Birthyear: "1955",
            Deathyear: "N/A",
        },
        imageUrl:
            "https://www.sonypictures.com/sites/default/files/styles/max_560x840/public/chameleon/title-movie/357510_White_House_Down_2013_1400x2100_Eng.jpg?itok=x65eFTLe",
        year: "2013",
        featured: true,
    },
];

app.get('/movies', (req, res) => {
  Movies.find()
    .then(movies => {
      res.status(200).json(movies);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

app.get('/movies/:title', (req, res) => {
  Movies.findOne({ title: req.params.title })
    .then(movie => {
      if (!movie) {
        return res.status(404).send(`Movie with title ${req.params.title} was not found.`);
      }
      res.status(200).json(movie);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

app.get('/genres', (req, res) => {
  Genres.find()
    .then(genres => {
      res.status(200).json(genres);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

app.get('/directors', (req, res) => {
  Directors.find()
    .then(directors => {
      res.status(200).json(directors);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

app.get('/users', (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

app.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then(user => {
      if (user) {
        return res.status(400).send(`${req.body.Username} already exists.`);
      }
      Users.create(req.body)
        .then(user => {
          res.status(201).json(user);
        })
        .catch(error => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        });
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

app.put('/users/:Username', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, { $set: req.body }, { new: true })
    .then(updatedUser => {
      if (!updatedUser) {
        return res.status(404).send(`User with username ${req.params.Username} was not found.`);
      }
      res.json(updatedUser);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

app.post('/users/:Username/movies/:MovieID', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, { $addToSet: { FavoriteMovies: req.params.MovieID } }, { new: true })
    .then(updatedUser => {
      if (!updatedUser) {
        return res.status(404).send(`User with username ${req.params.Username} was not found.`);
      }
      res.json(updatedUser);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

app.delete('/users/:username', (req, res) => {
  Users.findOneAndDelete({ Username: req.params.username })
    .then((user) => {
      if (!user) {
        res.status(404).send(req.params.username + ' was not found');
      } else {
        res.status(200).send(req.params.username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

app.delete("/users/:username/favorites/:movieId", (req, res) => {
  const { username, movieId } = req.params;
  Users.findOneAndUpdate({ Username: username }, { $pull: { FavoriteMovies: movieId } }, { new: true })
    .then((updatedUser) => {
      if (!updatedUser) {
        res.status(404).send(username + ' was not found');
      } else {
        res.status(200).send(`The movie with ID ${movieId} has been removed from ${username}'s favorites.`);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
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
