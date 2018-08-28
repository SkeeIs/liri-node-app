var request = require('request');
require('dotenv').config()
var moment = require('moment');
var Spotify = require('node-spotify-api');
var keys = require("./keys");
var spotify = new Spotify(keys.spotify);
var fs = require('file-system');

//OMDB Movie Query
if (process.argv[2] === "movie-this") {

    // Store all of the arguments in an array
    var nodeArgs = process.argv;
    // Create an empty variable for holding the movie name
    var movieName = "";
    //checking there is a value in 3rd index of argument
    if (process.argv[3]) {
    // Loop through the indices, starting at index 3
        for (var i = 3; i < nodeArgs.length; i++) {
            //only grabbing words that occur after index 3 & the end of the argument
            if (i > 3 && i < nodeArgs.length) {
            //concatenate the strings with "+" between each word
            movieName = movieName + "+" + nodeArgs[i];
        
            }
        
            else {
                
            movieName += nodeArgs[i];
        
            }
        }
    }
    //defaulting to the movie Mr Nobody
    else {
        movieName = "Mr. Nobody"
    }
    //concatenate query URL
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&plot=short&apikey=trilogy";

    console.log(queryUrl);
    //making the API request
    request(queryUrl, function(error, response, body) {

        // If no errors & successfully communicate with server
        if (!error && response.statusCode === 200) {
        
        //parse the body so we can read through the object  
        var data = JSON.parse(body); 
        
        //console log the information asked for
        console.log(data.Title + "\n" + data.Year + "\n" + data.Ratings[0].Source + ": " +data.Ratings[0].Value + "\n" + data.Ratings[1].Source + ": " +data.Ratings[1].Value + "\n" + data.Country + "\n" + data.Language + "\n" + data.Plot + "\n" + data.Actors);
        }
    });
}

//bandsintown API search
if (process.argv[2] === "concert-this") {

    // Store all of the arguments in an array
    var nodeArgs = process.argv;
    // Create an empty variable for holding the band name
    var bandName = "";
    
    // Loop through the indices, starting at index 3
        for (var i = 3; i < nodeArgs.length; i++) {
            //only grabbing words that occur after index 3 & the end of the argument
            if (i > 3 && i < nodeArgs.length) {
            //concatenate the strings with "+" between each word    
            bandName = bandName + "+" + nodeArgs[i];
        
            }
        
            else {
        
            bandName += nodeArgs[i];
        
            }
        }
    //concatenate query URL    
    var queryUrl = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp";

    console.log(queryUrl);
    //making the API request    
    request(queryUrl, function(error, response, body) {

        // If no errors & successfully communicate with server
        if (!error && response.statusCode === 200) {
        
            //parse the body so we can read through the object easier  
            //console.log(JSON.parse(body));  
            //console.log(JSON.parse(body).length);
            var allShows = JSON.parse(body);
            
            for (var i = 0; i < allShows.length; i++) {
                
                //console log the information asked for
                console.log(allShows[i].venue.name);
                console.log(allShows[i].venue.city + ", " + allShows[i].venue.country);
                //use moment to format the time & data information from the data body.
                var date = moment(JSON.parse(body)[i].datetime).format("h mm a MM DD YYYY");
                console.log(date);
            }    
        }
    });    

}   

//spotify song search
if (process.argv[2] === "spotify-this-song") {

    // Store all of the arguments in an array
    var nodeArgs = process.argv;
    // Create an empty variable for holding the song name
    var songName = "";
    //checking for a song name
    if (process.argv[3]) {
        // Loop through all the indices, starting at index 3
        for (var i = 3; i < nodeArgs.length; i++) {
            //checking index greater than tree
            if (i > 3 && i < nodeArgs.length) {
            //concatenate song name
            songName = songName + "+" + nodeArgs[i];
            console.log(songName);    
            }
        
            else {
            songName += nodeArgs[i];
            console.log(songName);    
            }
        }
    }
    //default I saw the sign and it opened up my eyes, I saw the sign
    else {
        songName = "The+Sign+Ace+of+Base";
        console.log(songName);
    }    
    
    spotify.search({ type: "track", query: songName, limit: 5 },function(err, response) {
        
        if (err) {
            
            return console.log("error thrown: " + err)
        
        }
        //console.log(response);
        console.log("Artist: " + response.tracks.items[0].artists[0].name);
        console.log("Song: " + response.tracks.items[0].name);
        console.log("Spotify Preview: " + response.tracks.items[0].preview_url);
        console.log("Album: " + response.tracks.items[0].album.name);
    });
}    

if (process.argv[2] === "do-what-it-says") {
    
    fs.readFile("random.txt", "utf8", function(error, data) {
        
        if (error) {
            return console.log(error);
        }
          
        console.log(data);

        var dataArr = data.split(",");
        console.log(dataArr);

        var songName = dataArr[1];

        spotify.search({ type: "track", query: songName, limit: 5 },function(err, response) {
        
            if (err) {
                
                return console.log("error thrown: " + err)
            
            }
            //console.log(response);
            console.log("Artist: " + response.tracks.items[0].artists[0].name);
            console.log("Song: " + response.tracks.items[0].name);
            console.log("Spotify Preview: " + response.tracks.items[0].preview_url);
            console.log("Album: " + response.tracks.items[0].album.name);
        });

    })
}