const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
    idTag: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, default: "-" },
});

module.exports = mongoose.model("Tag", tagSchema);