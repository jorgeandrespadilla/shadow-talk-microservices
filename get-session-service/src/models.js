const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AnonymousSessionSchema = new Schema({
    sessionCode: { type: String, required: true, unique: true },
    nickName: { type: String, required: true },
    avatar: { type: String, required: true }, // SVG
    createdAt: { type: Date, required: true },
});
const AnonymousSession = mongoose.model("AnonymousSession", AnonymousSessionSchema);

module.exports = {
    AnonymousSession,
};