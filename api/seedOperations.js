const mongoose = require('mongoose');
const Operation = require('./models/operation')
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const operation = [
    {
        "idOperation": 0,
        "name": "Удаление"
    },
    {
        "idOperation": 1,
        "name": "Редактирование"
    },
    {
        "idOperation": 2,
        "name": "Добавление"
    },
    {
        "idOperation": 3,
        "name": "Вход пользователя"
    },
    {
        "idOperation": 4,
        "name": "Выход пользователя"
    },
    {
        "idOperation": 5,
        "name": "Выдача со склада"
    },
    {
        "idOperation": 6,
        "name": "Поступление на склад"
    },
]

const dbPath = 'mongodb+srv://c:p@cluster0.qju1t.mongodb.net/?retryWrites=true&w=majority';

const connect = () => {
    mongoose.connect(dbPath, options)
        .then(() => console.log('Connected to DB'))
        .catch((err) => console.log(err))
}

connect();

console.log(operation)
async function seed() {
    await Operation.remove();
    await Operation.create(operation)
    console.log("seed completed!")
    mongoose.connection.close()
};

seed()
