const express = require('express');
const request = require('request');
const { nanoid } = require("nanoid");
const path = require('path');
const md5 = require('md5')
const cors = require('cors');
const Partner = require("./models/partner");
const Device = require("./models/device")
const User = require("./models/user")
const Tag = require("./models/tag")
const Operation = require('./models/operation');
const History = require('./models/history');
const GiveAway = require('./models/giveAway');

const { connect } = require('./connectDb');
const { setEnvironmentData } = require('worker_threads');


const localIP = Object.values(require('os').networkInterfaces()).reduce((r, list) => r.concat(list.reduce((rr, i) => rr.concat(i.family === 'IPv4' && !i.internal && i.address || []), [])), [])
const port = 8080;
const app = express()

connect();

app.use(
    cors({
        origin: true,
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/login', async (req, res) => {
    console.log('Incoming POST ./login ->', req.body)
    let {
        username,
        password,
    } = req.body;
    try {
        // console.log('Users', await User.find())
        let user = await User.findOne({
            login: username
        });
        // console.log(await User.find(), user)
        if (!user) return res.status(401).send("Unautorized")
        if (md5(password) !== user.password) return res.status(401).send("Unautorized")
        console.log(" User autorized! ->", user);
        res.json({ login: username });
    } catch (e) {
        console.log('Error with DB:', e);
        res.send(`Error with  DB: ${e}`);
    }
})

// Тест добавления поставщика ->
app.post('/partner', async (req, res) => {
    console.log('Incoming POST ./partner ->', req.body)
    let {
        company,
        person,
        email,
        phone,
    } = req.body;
    const newID = nanoid()
    console.log('Generated newID ->', newID);
    try {
        let partner = await Partner.create({
            id: newID,
            company: company,
            person: person,
            email: email,
            phone: phone,
        });

        await partner.save();
        console.log(" New Partner ->", partner);
        res.json(partner);
    } catch (e) {
        console.log('Error write to DB:', e);
        res.send(`Error write to DB: ${e}`);
    }
})

// Тест получения всех поставщиков ->
app.get('/partner', async (req, res) => {
    console.log('Incoming GET ./partner')

    try {
        let partner = await Partner.find();
        //  console.log(" All parnters ->", partner);
        res.json(partner);
    } catch (e) {
        console.log('Error read from DB:', e);
        res.send(`Error read from DB: ${e}`);
    }
})

// Тест удаления одного поставщика ->
app.delete('/partner', async (req, res) => {
    let { id } = req.body;
    console.log('Incoming DELETE ./partner', req.body)
    try {
        let partner = await Partner.findOneAndDelete({ id });
        console.log(" Remove partner ->", partner);
        res.json(partner);
    } catch (e) {
        console.log('Error read from DB:', e);
        res.send(`Error read from DB: ${e}`);
    }
})

// Тест редактирования одного поставщика ->
app.patch('/partner', async (req, res) => {
    let currentPartner = req.body;
    console.log('Incoming PATCH ./partner', currentPartner)
    try {
        const doc = await Partner.findOne({ id: currentPartner.id });
        doc.company = currentPartner.company;
        doc.person = currentPartner.person;
        doc.email = currentPartner.email;
        doc.phone = currentPartner.phone;
        doc.description = currentPartner.description;
        await doc.save();
        //  console.log("Save partner ->", currentPartner);
        res.json(currentPartner);
    } catch (e) {
        console.log('Error read from DB:', e);
        res.send(`Error read from DB: ${e}`);
    }
})

// Тест получения всего склада ->
app.get('/devices', async (req, res) => {
    console.log('Incoming GET ./devices')

    try {
        let device = await Device.find();
        //  console.log(" All devices /GET", device);
        res.json(device);
    } catch (e) {
        console.log('Error read from DB:', e);
        res.send(`Error read from DB: ${e}`);
    }
})

// Тест удаления одного устройства ->
app.delete('/device', async (req, res) => {
    let { _id } = req.body;
    console.log('Incoming DELETE ./partner', req.body)
    try {
        let device = await Device.findOneAndDelete({ _id });
        console.log(" Remove device ->", device);
        res.json(device);
    } catch (e) {
        console.log('Error read from DB:', e);
        res.send(`Error read from DB: ${e}`);
    }
})

// Тест редактирования одного устройства ->
app.patch('/devices', async (req, res) => {
    let currentDevice = req.body;
    console.log('Incoming PATCH ./devices', currentDevice)
    try {
        const doc = await Device.findById(currentDevice._id);
        console.log(doc);
        doc.name = currentDevice.name;
        doc.nompos = currentDevice.nompos;
        doc.provider = currentDevice.provider;
        doc.meter = currentDevice.meter;
        doc.count = currentDevice.count;
        doc.mol = currentDevice.mol;
        doc.cost = currentDevice.cost;
        doc.category = currentDevice.category;
        doc.description = currentDevice.description;
        doc.storageName = currentDevice.storageName;
        doc.storagePlace = currentDevice.storagePlace;
        await doc.save();
        console.log("Save device ->", currentDevice);
        res.json(currentDevice);
    } catch (e) {
        console.log('Error read from DB:', e);
        res.send(`Error read from DB: ${e}`);
    }
})

// Тест добавления поставщика ->
app.post('/partner', async (req, res) => {
    console.log('Incoming POST ./partner ->', req.body)
    let {
        company,
        person,
        email,
        phone,
    } = req.body;
    const newID = nanoid()
    console.log('Generated newID ->', newID);
    try {
        let partner = await Partner.create({
            id: newID,
            company: company,
            person: person,
            email: email,
            phone: phone,
        });

        await partner.save();
        console.log(" New Partner ->", partner);
        res.json(partner);
    } catch (e) {
        console.log('Error write to DB:', e);
        res.send(`Error write to DB: ${e}`);
    }
})

// Тест получения всех поставщиков ->
app.get('/partner', async (req, res) => {
    console.log('Incoming GET ./partner')

    try {
        let partner = await Partner.find();
        console.log(" All parnters ->", partner);
        res.json(partner);
    } catch (e) {
        console.log('Error read from DB:', e);
        res.send(`Error read from DB: ${e}`);
    }
})

// Тест добавления одного устройства ->
app.post('/device', async (req, res) => {
    console.log('Incoming POST ./device ->', req.body)
    let {
        name,
        nompos,
        provider,
        meter,
        category,
        count,
        mol
    } = req.body;

    try {
        let device = await Device.create({
            name,
            nompos,
            provider,
            meter,
            count,
            category: category ? category.join(',') : '',
            mol
        });
        await device.save();
        console.log("New Device ->", device);
        res.json(device);
    } catch (e) {
        console.log('Error write to DB:', e);
        res.send(`Error write to DB: ${e}`);
    }
})

// Тест получения всех операций ->
app.get('/operation', async (req, res) => {
    console.log('Incoming GET ./operation')

    try {
        let operation = await Operation.find();
        console.log(operation)
        console.log(" All operations /GET");
        res.json(operation);
    } catch (e) {
        console.log('Error read from DB:', e);
        res.status(400).send(`Error read from DB: ${e}`);
    }
})

// Тест получения всех категорий ->
app.get('/tags', async (req, res) => {
    console.log('Incoming GET ./tags')

    try {
        let tags = await Tag.find();
        // console.log(tags)
        console.log(" All tags /GET");
        res.json(tags);
    } catch (e) {
        console.log('Error read from DB:', e);
        res.status(400).send(`Error read from DB: ${e}`);
    }
})

// Тест сохранить в истории ->
app.post('/history', async (req, res) => {
    console.log('Incoming POST ./history ->', req.body)

    let {
        description,
        user,
        operation,
    } = req.body;
    var operationText = await Operation.find({ idOperation: operation });

    try {
        let history = await History.create({
            description: description + " // Client: " + req.headers['user-agent'] + " // IP: " + req.ip,
            user,
            operation: operationText[0].name,
        });
        await history.save();
        console.log(" New History data ->", history);
        res.json(history);
    } catch (e) {
        console.log('Error write to DB:', e);
        res.send(`Error write to DB: ${e}`);
    }
})

// Тест получения всей истории ->
app.get('/history', async (req, res) => {
    console.log('Incoming GET ./tags')

    try {
        let history = await History.find();
        console.log(" All history /GET");
        return res.status(200).json(history);
    } catch (e) {
        console.log('Error read from DB:', e);
        return res.status(400).send(`Error read from DB: ${e}`);
    }
})

// Тест процесс "выдача оборудования"
app.post('/purchase', async (req, res) => {
    try {
        const giveAway = await GiveAway.create(req.body);
        console.log("New Purchase ->", giveAway);
        const timePurchse = giveAway.createdAt;
        res.json(giveAway);

        //выдать со склада (вычесть из остатков что выдано было) - проверка
        const purchaseDevices = await giveAway.purchase;
        for (let i = 0; i < purchaseDevices.length; i += 1) {
            await Device.findOneAndUpdate({ "_id": purchaseDevices[i].idDevice },
                { "$inc": { "count": -purchaseDevices[i].count } })
        }

        // записать в историю
        request.post({
            url: `http://${localIP}:${port}/history`,
            body: {
                user: req.body.values.nameUser,
                description: `Выдача оборудования ${req.body.values.recepientName} от ${timePurchse.toLocaleString()}\n
                Описание: ${req.body.values.description}`,
                operation: 5,
            },

            json: true
        })



        //создать документ


    } catch (e) {
        console.log('Error write to DB:', e);
        res.send(`Error write to DB: ${e}`);
    }

})

// Тест жив ли сервер ->
app.get('/status', (req, res) => res.sendStatus(200));



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

module.exports = app;