import mongoose from 'mongoose';


const stationDataSchema = mongoose.Schema({
    type: { type: String, required: false },
    name: { type: String, required: false}, 
    features: { type: Array, required: false }},
    //specify which collection to look under
    { collection : 'stationdata' }
);

const StationData = mongoose.model("StationData", stationDataSchema);

export { StationData }