const express = require('express')
const kill = require('kill-port')
const app = express()
const port = 5000

kill(port, 'tcp');

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

module.exports = app;