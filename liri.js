// npm packages
var moment = require('moment')
var request = require('request');
var util = require('util');
var fs = require('fs')
var twitter = require('twitter');
var spotify = require('node-spotify-api');

// api key values import
var keysFile = require("./keys.js");

// command line input
var userProgram = process.argv[2];
var userQuery = process.argv[3];

// twitter program
var getTweets = function() {
    // get the twitter api keys
    var keysObj = keysFile.twitterKeys;
    var client = new twitter(keysObj);

    // my twitter handle
    var params = {screen_name: 'drone_wizard'};

    // run twitter api query
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (error) {
            return console.log('Error occurred: ' + error);
        } else if (!error && response.statusCode === 200) {
            // read the last 20 tweets
            for (var i=0; i<tweets.length && i<20; i++) {
                // tweet number
                var count = (i+1)

                // display tweet
                console.log(count + ". " + tweets[i].text)

                // convert to 12 hour format
                origionalTime = tweets[i].created_at.substring(11,16)
                momentTime = moment(origionalTime, "HH:mm").format("hh:mm A")

                // tweet time info
                console.log("Date and Time: "
                            // date substring
                            + tweets[i].created_at.substring(4,10)
                            // year substring
                            + ", " + tweets[i].created_at.substring(26,30)
                            // time substring
                            + " - " + momentTime)
                console.log("")
            }
        }
    })
}

// spotify program
var getSong = function(song) {
    // get spotify api keys
    var keysObj = keysFile.spotifyKeys;
    var client = new spotify(keysObj)

    // song search with The Sign by Ace of Base as default value
    client.search({ type: 'track', query: song || "ace of base the sign", limit: '1' }, function(error, data) {
        if (error) {
            return console.log('Error occurred: ' + error);
        } else if (!error) {
            // get a list of the song's artists
            var artistList = [];
            for (var i=0; i<data.tracks.items[0].artists.length; i++) {
                artistList.push(data.tracks.items[0].artists[i].name)
            }

            // display song info
            console.log("Artist name(s): " + artistList.join(", "))
            console.log("Song title: " + data.tracks.items[0].name)
            console.log("Preview link: " + data.tracks.items[0].preview_url)
            console.log("Album title: " + data.tracks.items[0].album.name)
        }
    });
}

// omdb program
var getMovie = function(movie) {

    // movie search with Mr. Nobody as default value
    var queryURL = "http://www.omdbapi.com/?apikey=40e9cece&t=" + (movie || "Mr. Nobody")

    // run api query
    request(queryURL, function (error, response, body) {
        if (error) {
            return console.log('Error occurred: ' + error);
        } else if (!error && response.statusCode === 200) {
            // display info if there is no error
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);

            // show hidden values due to being deelpy nested
            console.log("Rotten Tomatoes Rating: " +
                        (util.inspect(JSON.parse(body).Ratings[1].Value,
                        { showHidden: true, depth: null })).replace(/\'/g, ""));
            console.log("Location(s): " + JSON.parse(body).Country);
            console.log("Language(s): " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Cast: " + JSON.parse(body).Actors);
        }
    });
}

// text file command program
var textFile = function() {
    // read the file with fs
    fs.readFile('./random.txt', 'utf8', (error, data) => {
        if (error) {
            return console.log('Error occurred: ' + error);
        } else if (!error) {
            // program is the first word
            var program = data.split(',')[0];

            // query is the second word
            var query = data.split(',')[1].replace(/['"]+/g, '');

            // choose a program and run a query if needed
            if (program === "spotify-this-song") {
                getSong(query)
            } else if (program === "my-tweets") {
                getTweets()
            } else if (program === "movie-this") {
                getMovie(query)
            }
        }
    });    
}

// run a program based upon the user input
if (userProgram === "my-tweets") {
    getTweets()
} else if (userProgram === "spotify-this-song") {
    getSong(userQuery)
} else if (userProgram === "movie-this") {
    getMovie(userQuery)
} else if (userProgram === "do-what-it-says") {
    textFile()
}