const express = require("express");
const morgan = require("morgan");

const app = express();

// Use Morgan middleware to log all requests to the terminal
app.use(morgan("dev"));

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send("Welcome to MyFlix");
});

app.get("/movies", (req, res) => {
    const movies = [
        {
            title: "The Lion King",
            year: 2019,
            description:
                "A live-action remake of the classic Disney animated film, following the story of a young lion prince named Simba who must reclaim his rightful place as king after his father's death.",
        },
        {
            title: "Joker",
            year: 2019,
            description:
                "A psychological thriller and origin story for the iconic DC Comics villain, the Joker, played by Joaquin Phoenix.",
        },
        {
            title: "Pirates of the Caribbean: Dead Man's Chest",
            year: 2006,
            description:
                "The second installment in the swashbuckling adventure series, starring Johnny Depp as Captain Jack Sparrow as he searches for the key to a chest containing the heart of Davy Jones, a supernatural being with control over the sea.",
        },
        {
            title: "Bohemian Rhapsody",
            year: 2018,
            description:
                "A biographical film that tells the story of Freddie Mercury, the lead singer of the British rock band Queen, and their rise to fame, with Rami Malek as Mercury.",
        },
        {
            title: "Ice Age: Continental Drift",
            year: 2012,
            description:
                "The fourth film in the Ice Age franchise, an animated comedy about a group of prehistoric animals who must navigate a continental drift and survive various challenges.",
        },
        {
            title: "Forrest Gump",
            year: 1994,
            description:
                "A beloved drama directed by Robert Zemeckis and starring Tom Hanks as Forrest Gump, a man with a low IQ who becomes involved in several defining moments in American history.",
        },
        {
            title: "Inside Out",
            year: 2015,
            description:
                "A Pixar-animated comedy-drama that takes place inside the mind of a young girl named Riley, with each of her emotions personified as characters that help guide her through life.",
        },
        {
            title: "Jumanji: The Next Level",
            year: 2019,
            description:
                "A sequel to the 2017 film Jumanji: Welcome to the Jungle, where a group of friends return to the Jumanji game world to rescue one of their own, encountering new challenges and obstacles along the way.",
        },
        {
            title: "2012",
            year: 2009,
            description:
                "A disaster film directed by Roland Emmerich that depicts a global cataclysmic event that threatens to destroy the world in 2012, based on the Mayan calendar.",
        },
    ];

    // Return the JSON object containing data about the top 10 movies
    res.json({ movies });
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
