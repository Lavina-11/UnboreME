const mongoose = require('mongoose')
const data = require('./data')
const Activity = require('../models/activities')

mongoose.connect('mongodb://127.0.0.1:27017/UnboreMe', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

const seedDB = async () => {
    await Activity.deleteMany({});
    for (let i = 0; i < 22; i++) {
        const camp = new Activity({
            title: `${data[i].title}`,
            info: `${data[i].info}`,
            price: `${data[i].price}`,
            rating: `${data[i].rating}`,
            status: `${data[i].status}`,
            category: `${data[i].category}`,
            img: `${data[i].img}`
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})