const mongoose = require("mongoose");

const giveAwaySchema = new mongoose.Schema({
    purchase: [{
        idDevice: { type: String, required: true },
        count: { type: Number, required: true },
    }],
    values: [{
        idUnique: { type: String, required: true }, // идентификатор документа
        nameUser: { type: String, required: true }, // кто выдал - сотрудник ГТО
        installationAdress: { type: String, default: "" }, // где установлено
        recepientName: { type: String, required: true }, // кому выдано
        mol: { type: String, default: "см получателя" }, // кто МОЛ
        documents: [{
            idDocument: { type: String, default: "" },
            name: { type: String, required: true },
            fileName: { type: String, required: true }
        }],
        description: { type: String, default: "-" }, // cерийники сюда
    }],
},
    { timestamps: true });

module.exports = mongoose.model("GiveAway", giveAwaySchema);