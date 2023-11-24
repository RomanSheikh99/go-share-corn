const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');
const cron = require("node-cron");
const Projects = require("./schema");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


cron.schedule("*/10 * * * * *", async () => {
    console.log("helllo ")
    checkBids()
})



const checkBids = async ()=> {
    const projects = await Projects.find({ status: 'Open' })
    console.log(projects)
    const dis = 1000 * 60 * 1;
    for(let project of projects){
        const {bids} = project
        const time = bids[1]?.time;
        if(Date.now() - time > dis){
            project.status = 'closed'
            project.driverId = bids[bids.length-1].driverId
            project.driverName = bids[bids.length-1].driverName
            project.userBack = (project.totalCost - bids[bids.length-1].price) / 2;
            project.driverCost = bids[bids.length-1].price
            project.save();
        }
    }
}

mongoose.connect("mongodb://127.0.0.1:27017/shareTruck")
    .then(() => { console.log('mongoDb is conected') })
    .catch(err => {
        console.log(err)
        process.exit(1)
    })


app.listen(3003, () => {
    console.log(`Boom🎉, Hare is Server`);
});

