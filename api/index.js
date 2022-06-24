const express = require('express')
const kill = require('kill-port')
const app = express()
const port = 7000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

module.exports = app;