// Get the mongoose object
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import { RiverBed } from './riverBedSchema.mjs'
import { StationData } from './riverStationSchema.mjs'

dotenv.config();

let connection;
if(process.env.NODE_ENV==="production"){
    connection=process.env.MONGODB_CONNECTION_STRING
} else{
    connection="mongodb://localhost:27017/floatplanner"
    
}

// Prepare to the database movies_db in the MongoDB server running locally on port 27017
mongoose.connect(
    // connection,
    "mongodb://localhost:27017/floatplanner",
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




/**
//  * Create an exercise
//  * @param {String} name 
//  * @param {Number} reps
//  * @param {Number} weight
//  * @param {String} unit 
//  * @param {String} date
//  * @returns A promise. Resolves to the JSON object for the document created by calling save
//  */
// const createExercise = async (name, reps, weight, unit, date) => {
//     // Call the constructor to create an instance of the model class Movie
//     const exercise = new Exercise({ name: name, reps: reps, weight: weight, unit: unit, date:date });
//     // Call save to persist this object as a document in MongoDB
//     return exercise.save();
// }

/* ---------------------------------------------------------------
*                   RiverBed model functions
*-----------------------------------------------------------------
*/
const findRivers = async (filter, projection, limit) => {
    const query = RiverBed.find(filter)
        .select(projection)
        .limit(limit);
    return query.exec();
}

// finds all rivers in the collection and returns {_id: , name: } 
const findRiverIdName = async (projection) => {
    const query = RiverBed.find()
        .select(projection).sort( {name: "ascending"} )
        
    return query.exec();
}

// finds the river by the given ID
const findRiverById = async (_id) => {
   const query = RiverBed.findById({_id: _id});
   return query.exec();
}
// find the river by the given name
const findRiverByName = async (name) => {
   const query = RiverBed.findOne({ name : name });
   return query.exec();
}

/* ---------------------------------------------------------------
*                   StationData model functions
*----------------------------------------------------------------
* find the station by the given ID
*/

const findStationById = async (_id) => {
    const query = StationData.findById(_id);
    return query.exec();
 }

// find the station by the given name

const findStationByName = async (name) => {
    const query = StationData.findOne({ name : name });
    return query.exec();
 }

/**
 * Retrive movies based on the filter, projection and limit parameters
//  * @param {Object} filter 
//  * @param {String} projection 
//  * @param {Number} limit 
//  * @returns 
//  */


/**

// /**
//  * @param {String} _id 
//  * @param {String} name 
//  * @param {Number} reps 
//  * @param {String} weight
//  * @param {String} unit
//  * @param {Stringg} date
//  * @returns A promise. Resolves to the number of documents modified
//  */
// const replaceExercise = async (_id, name, reps, weight, unit, date) => {
//     const result = await Exercise.replaceOne({ _id: _id }, { name: name, reps: reps, weight: weight, unit: unit, date: date });
//     return result.nModified;
// }


// /**
//  * @param {String} _id 
//  * @returns A promise. Resolves to the count of deleted documents
//  */
// const deleteById = async (_id) => {
//     const result = await Exercise.deleteOne({ _id: _id });
//     // Return the count of deleted document. Since we called deleteOne, this will be either 0 or 1.
//     return result.deletedCount;
// }

export { findRiverById, findRivers, findRiverByName, findStationByName, findRiverIdName };