const mongoose = require("mongoose");

const partnerSchema = new mongoose.Schema({
  // уникальный айдишник должен быть
  id: { type: String, unique: true },
  company: { type: String, required: true },
  person: { type: String, default: "" },
  email: { type: String, default: "" },
  phone: { type: String, default: "" },
  description: { type: String, default: "" },


});

module.exports = mongoose.model("Partner", partnerSchema);
