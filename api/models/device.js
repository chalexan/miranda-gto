const { Int32 } = require("mongodb");
const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    nompos: { type: String, required: true },
    provider: { type: String, default: "-" },
    meter: { type: String, default: "шт" },
    category: { type: String, default: "" },
    count: { type: String, default: 0 },
    cost: { type: String, default: 0 },
    mol: { type: String, default: "-" },
    description: { type: String, default: "-" },
});

module.exports = mongoose.model("Device", deviceSchema);