const mongoose = require('mongoose');
const User = require('./models/user');
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const users = [
    {
        "login": "admin",
        "password": "827ccb0eea8a706c4c34a16891f84e7b"
    },
    {
        "login": "Kostrikova Anna",
        "password": "827ccb0eea8a706c4c34a16891f84e7b"
    },
    {
        "login": "Zishik Alexandr",
        "password": "827ccb0eea8a706c4c34a16891f84e7b"
    },
    {
        "login": "Nekrasov Dmitriy",
        "password": "827ccb0eea8a706c4c34a16891f84e7b"
    },
    {
        "login": "Cherednychenko Alexandr",
        "password": "827ccb0eea8a706c4c34a16891f84e7b"
    },
]

const dbPath = 'mongodb+srv://c:p@cluster0.qju1t.mongodb.net/?retryWrites=true&w=majority';

const connect = () => {
    mongoose.connect(dbPath, options)
        .then(() => console.log('Connected to DB'))
        .catch((err) => console.log(err))
}

connect();

console.log(users)
async function seed() {
    await User.remove();
    await User.create(users)
    console.log("seed completed!")
    mongoose.connection.close()
};

seed()
