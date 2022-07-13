const mongoose = require("mongoose");

const operationSchema = new mongoose.Schema({
    idOperation: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, default: "-" },
});

module.exports = mongoose.model("Operation", operationSchema);