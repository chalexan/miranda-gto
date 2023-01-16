const mongoose = require("mongoose");

const receiveDeviceSchema = new mongoose.Schema({
    order: [{
        idDevice: { type: String, required: true },
        count: { type: Number, required: true },
        cost: { type: String, default: 0 },
        storageName: { type: String, default: "" },
        storagePlace: { type: String, default: "" },
    }],
    values: [{
        idUnique: { type: String, required: true }, // идентификатор документа
        nameUser: { type: String, required: true }, // кто получает - сотрудник ГТО
        sender: { type: String, required: true }, // кто отправитель
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

module.exports = mongoose.model("ReceiveDevice", receiveDeviceSchema);