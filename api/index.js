const express = require('express')
const { nanoid } = require("nanoid");
const kill = require('kill-port')
const createError = require('http-errors');
const path = require('path');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const Partner = require("./models/partner");
const Device = require("./models/device")


const { connect, dbPath } = require('./connectDb');

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

app.get('/', (req, res) => {
    res.send('Hello World!')
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
        console.log("Save partner ->", currentPartner);
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
        console.log(" All devices ->", device);
        res.json(device);
    } catch (e) {
        console.log('Error read from DB:', e);
        res.send(`Error read from DB: ${e}`);
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

module.exports = app;