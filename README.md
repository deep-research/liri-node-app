# liri-node-app

A Node.js application with four modules:
* My-tweets: Get my twenty latest tweets with the Twitter API.
* Spotify-this-song: look up a song with the Spotify API.
* Movie-this: Look up an IMDB movie with the OMDB API.
* Do-what-it-says: Run a query saved in the random.txt file.

### Prerequisites

* An updated Node.js installation.
* A command-line interpreter.

### Installation

* Download the application as a ZIP file or with the "git clone" command and following url in Git:  
https://github.com/deep-research/liri-node-app.
* The new directory will be called "liri-node-app." Extracting the file may be necessary.
* Change directory to "liri-node-app" in a command-line interpreter.
* Run the "npm install" command to prepare the necessary NPM packages.
* Create API accounts with Twitter and Spotify. Get the pass codes and enter them in the "keys.js" file.
* Twitter command: `node liri.js my-tweets`
* Spotify command: `node liri.js spotify-this-song "NAME OF SONG"`
* Movie command: `node liri.js movie-this "NAME OF MOVIE"`
* Text file command: `node liri.js do-what-it-says`  
    * A comma is needed between the two arguments in random.txt.

Please note: The Spotify and Movie modules have a default mode if no argument is entered.