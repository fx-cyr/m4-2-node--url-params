"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { top50 } = require("./data/top50");
const artistArr = top50.reduce((acc, cv) => (acc.push(cv.artist), acc), [])      
console.log(artistArr)
express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))
  .use(bodyParser.json())

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  // Nothing to modify above this line
  // ---------------------------------
  // Top 50 endpoints here 👇
  .get("/top50", (req, res) => {
    const data = top50;
    res.status(200).json({
      status: 200,
      data,
    });
  })
  // Specific song endpoints here 👇
  .get("/top50/song/:rankIndex", (req, res) => {
    const song = top50[req.params.rankIndex - 1];
    res.status(200).json({
      status: 200,
      song,
    });
  })

    // Specific artist endpoints here 👇
    .get("/top50/artist/:artistName", (req, res) => {
      const data = top50.filter(single => single.artist.includes(`${req.params.artistName}`))

      if (data.length > 0) {
        res.status(200).json({
          status: 200,
          data
        }) 
      }
    else {
      res.status(404).json({
        status: 404,
        message: "Artist not found"
    })}
    })

    // Specific top artist endpoints here 👇
    .get("/top50/popularartist", (req, res) => {

const mostValueArtist = artistArr.sort((a,b) =>
          artistArr.filter(v => v===a).length
        - artistArr.filter(v => v===b).length
    ).pop();
const data = top50.filter(single => single.artist.includes(`${mostValueArtist}`))
        res.status(200).json({
          status: 200,
          data
        }) 
    })

    // Artist Array endpoints here 👇
    .get("/top50/artist", (req, res) => {
     const data = [...new Set(artistArr)]
              res.status(200).json({
                status: 200,
                data
              }) 
          })
  // ---------------------------------
  // Nothing to modify below this lineyarn install

  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
