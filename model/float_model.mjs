// Get the mongoose object
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import { RiverBed } from "./riverBedSchema.mjs";
import { StationData } from "./riverStationSchema.mjs";

dotenv.config();

let connection;
if (process.env.NODE_ENV === "production") {
  connection = process.env.MONGODB_CONNECTION_STRING;
} else {
  connection = "mongodb://localhost:27017/floatplanner";
}

// Prepare to the database movies_db in the MongoDB server running locally on port 27017
mongoose.connect(
  connection,
  // "mongodb://localhost:27017/floatplanner",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// Connect to to the database
const db = mongoose.connection;
// The open event is called when the database connection successfully opens
db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

// Tell mongoose to create indexes, which help with faster querying
mongoose.set("useCreateIndex", true);

/* ---------------------------------------------------------------
 *                   RiverBed model functions
 *-----------------------------------------------------------------
 */

const findRivers = async (filter, projection, limit) => {
  const query = RiverBed.find(filter).select(projection).limit(limit);
  return query.exec();
};

// finds all rivers in the collection and returns {_id: , name: }
const findRiverIdName = async (projection) => {
  const query = RiverBed.find().select(projection).sort({ name: "ascending" });
  return query.exec();
};

// finds the river by the given ID
const findRiverById = async (_id) => {
  const query = RiverBed.findById({ _id: _id });
  return query.exec();
};
// find the river by the given name
const findRiverByName = async (name) => {
  const query = RiverBed.findOne({ name: name });
  return query.exec();
};

/* ---------------------------------------------------------------
 *                   StationData model functions
 *----------------------------------------------------------------
 * find the station by the given ID
 */

const findStationById = async (_id) => {
  const query = StationData.findById(_id);
  return query.exec();
};

// find the station by the given name

const findStationByName = async (name) => {
  const query = StationData.findOne({ name: name });
  return query.exec();
};

export {
  findRiverById,
  findRivers,
  findRiverByName,
  findStationByName,
  findRiverIdName,
};
