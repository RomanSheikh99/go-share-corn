const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');
const cron = require("node-cron");
const axios = require("axios")



const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


cron.schedule("*/10 * * * * *", async () => {
    console.log("helllo ")
    axios.put('http://localhost:3001/projects/checkbids')
})

mongoose.connect("mongodb://127.0.0.1:27017/UserDB")
    .then(() => { console.log('mongoDb is conected') })
    .catch(err => {
        console.log(err)
        process.exit(1)
    })


app.listen(3003, () => {
    console.log(`Boom🎉, Hare is Server`);
});

