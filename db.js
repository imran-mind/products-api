const mongoose = require('mongoose');

const DBHOST = process.env.DBHOST;

mongoose.connect(DBHOST)
    .then(() => {
        console.log('MongoDB Connected...');
    }).catch((err) => {
        console.log('Error while MongoDB Connection: ', err);
    })