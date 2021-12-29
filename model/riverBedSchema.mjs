import mongoose from 'mongoose';


const riverBedSchema = mongoose.Schema({
    type: { type: String, required: false },
    features: { type: Array, required: false },
    name: { type: String, required: false}}, 
    //specify which collection to look under
    // rename the collection to be less confusing
    { collection : 'riverdata' }
);

const RiverBed = mongoose.model("RiverBed", riverBedSchema);

export { RiverBed }