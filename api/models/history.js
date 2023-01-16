const mongoose = require("mongoose");

const historySchema = new mongoose.Schema(
    {
        description: { type: String, default: "-" },
        user: { type: String, require: true },
        operation: { type: String, require: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("History", historySchema);