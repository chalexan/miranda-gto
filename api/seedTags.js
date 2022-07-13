const mongoose = require('mongoose');
const Tag = require('./models/tags');
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const tags = [
    {
        "idTag": 0,
        "name": "Пассивное",
    },
    {
        "idTag": 1,
        "name": "Активное",
    },
    {
        "idTag": 2,
        "name": "Коммутаторы доступа",
    },
    {
        "idTag": 3,
        "name": "Коммутаторы агрегации",
    },
    {
        "idTag": 4,
        "name": "GPON",
    },
    {
        "idTag": 5,
        "name": "Оптический модуль",
    },
    {
        "idTag": 6,
        "name": "1G",
    },
    {
        "idTag": 7,
        "name": "10G",
    },
]

const dbPath = 'mongodb+srv://c:p@cluster0.qju1t.mongodb.net/?retryWrites=true&w=majority';

const connect = () => {
    mongoose.connect(dbPath, options)
        .then(() => console.log('Connected to DB'))
        .catch((err) => console.log(err))
}

connect();

console.log(tags)
async function seed() {
    await Tag.remove();
    await Tag.create(tags)
    console.log("seed completed!")
    mongoose.connection.close()
};

seed()
