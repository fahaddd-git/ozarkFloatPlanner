// update these imports
import * as dotenv from "dotenv";
import path from "path";
import express from "express";
import * as river from "./model/float_model.mjs";
import { flatten, combine, lineString } from "@turf/turf";
import compression from "compression";

import cors from "cors";
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

const __dirname = path.resolve();

// set cors policy
let corsOptions = {
  origin: "http://localhost:7000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// check if this is necessary
// app.use(
//   express.urlencoded({
//     extended: true,
//   })
// );

// potentially combine these

app.use(express.json());

app.use(compression());

// endpoint for coord measurement
// receives two sets of coordinates & river ID
// sends response of the measured distances between the endpoint coords
// app.post("/available_rivers", (req, res)=>{

// });

// adds a new river to the db
app.post("/add_river_data", (req, res) => {});

// get river monitoring stations by name
app.get("/stations/:name", cors(corsOptions), (req, res) => {
  // get the river name
  const stationName = req.params.name;
  river
    .findStationByName(stationName)
    .then((stationdata) => {
      res.status(200).json(stationdata);
      console.log(`${stationdata.name} requested`);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ Error: "Station Request failed" });
    });
});

// // retrieve all riverbeddata
// app.get("/", (req, res) =>{
//     let filter = {};
//     river.findRivers(filter, '', 0)
//         .then(rivers => {

//             res.status(200).json(rivers);
//         })
//         .catch(error => {
//             console.error(error);
//             res.status(500).json({ Error: 'Request failed' });
//         });

// });

app.get("/available", cors(corsOptions), (req, res) => {
  // res.set('Access-Control-Allow-Origin', 'localhost:7000');
  // which fields to return id and name

  const projection = "_id name";

  river
    .findRiverIdName(projection)
    .then((rivers) => {
      res.status(200).json(rivers);
      console.log("list of rivers request received");
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ Error: "Request failed" });
    });
});

// endpoint for retrieving the riverbed data points
app.get("/riverbed/:_id", cors(corsOptions), (req, res) => {
  // TODO investigate CORS policy, set limits before deployment
  // res.set('Access-Control-Allow-Origin', 'localhost:7000');
  const riverId = req.params._id;

  // search for the river with the matching ID using the model
  river
    .findRiverById(riverId)
    .then((river) => {
      // send the data if river is found else send 404
      if (river !== null) {
        // temporary experimentation for lineslicing.  Ideally do this in the data

        let riverData = flatten(river);

        riverData = combine(riverData);

        riverData = lineString(
          riverData.features[0].geometry.coordinates.flat(1)
        );

        res.json(riverData);

        console.log(river.name + " requested");
      } else {
        res.status(404).json({ Error: "Resource not found" });
      }
    })
    .catch((error) => {
      // log error send 500 response
      console.error(error);
      res.status(500).json({ Error: "Request failed" });
    });
});

// production mode

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

if (process.env.NODE_ENV === "production") {
  console.log("production");
  app.use(express.static(path.join(__dirname, "./ui/build")));
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./ui/build", "index.html"));
  });
}
