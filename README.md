# liri-node-app

A console based language bot that can search OMDB movie API for movie info, bandsintown API for upcoming events & spotify API for song info & preview.

* Powered by Javascript, node.js, Node-Spotify-API, OMDB API, bandsintown API, Request node package, Moment.js, DotEnv package 



### Image Preview of Each Type of Search with LiriBot
<!-- take a picture of the image and add it into the readme  -->
![OMDB Movie Search](https://i.imgur.com/YQ2phGM.png)
![Bands In Town Concert Search](https://i.imgur.com/ktKlP3j.png)
![Spotify Song Search](https://i.imgur.com/kklxvp2.png)

## Prerequisites

To use this bot in your console you would have to download some node modules. These dependencies can be found in the package.json file.

## Technology Used

* **Javascript** - the primary scripting logic powering the game
* **Node.js** - allowing us to execute javascript outside the browser (assorted node packages used listed above)

# Code Snippets
<!-- put snippets of code inside ``` ``` so it will look like code -->
<!-- if you want to put blockquotes use a > -->

Checking the console input for a song name & concatenating it to be used in query URL

```
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

```

# Learning points
<!-- Learning points where you would write what you thought was helpful -->
* Opportunity to execute javascript outside a browser
* Continuing to learn how to work with data objects & find specific information


## Authors

* **Taylor Skeels** - [GitHub](https://github.com/skeeis)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details