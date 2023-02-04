const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SampleSchema = new Schema({
    sampleField: String,
});
const Sample = mongoose.model("Sample", SampleSchema);

module.exports = {
    Sample,
};