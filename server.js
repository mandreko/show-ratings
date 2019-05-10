const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const TVDB = require('node-tvdb');
if (!process.env.TVDB_KEY) {
  console.error("Please set an environment variable for `TVDB_KEY`.");
  return;
}
const tvdb = new TVDB(process.env.TVDB_KEY);

app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

const getThumbnail = async function(series_id) {
  var response = await tvdb.getSeriesImages(series_id, 'poster');
  
  if (response.length > 0) {
    return 'https://www.thetvdb.com/banners/' + response[0].thumbnail;
  } else {
    return "";
  }
} 

const getSeriesData = async function(search) {
  var response = await tvdb.getSeriesByName(search);
  if (response.length > 0) {
    // Create mapped list
    var shows = [];
    for (let i=0; i<response.length; i++) {
      var mappedShow = {};
      mappedShow["id"] = response[i].id;
      mappedShow["seriesName"] = response[i].seriesName;
      mappedShow["network"] = response[i].network;
      mappedShow["firstAired"] = response[i].firstAired;
      mappedShow["status"] = response[i].status;
      mappedShow["overview"] = response[i].overview;
      shows.push(mappedShow);
    }

    // Iterate over mapped list, adding image if applicable
    for (let i=0; i<shows.length; i++) {
      
      try {
        var image = await getThumbnail(shows[i].id);
        shows[i]["banner"] = image;
      }
      catch {}
    }

    return shows;
  } else {
    return [];
  }
}

app.get("/api/test", async (req, res) => {
  res.json({ 
    thumbnail: await getThumbnail(71663)
  });
});

app.get("/api/search", async (req, res) => {
  const search_query = req.query.q;

  if (!search_query) {
    res.json({
      error: "Missing required parameter `q`"
    });
    return;
  }

  var data = await getSeriesData(search_query);
  res.json(data);

});

app.get("/api/graph", (req, res) => {
  const series_id = req.query.series_id;

  if (!series_id) {
    res.json({
      error: "Missing required parameter `series_id`"
    });
    return;
  }

  tvdb.getEpisodesBySeriesId(series_id)
  .then(response => {
    // Map the response array to a new array with only the fields we care about
    var filtered_response = response.map(x => {
      newObject = {};
      newObject["s"] = x.airedSeason;
      newObject["e"] = x.airedEpisodeNumber;
      newObject["r"] = x.siteRating;
      return newObject;
    })

    res.json(filtered_response);
  })
  .catch(error => {
    console.error(error);
  })
});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});