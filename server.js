const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;
const config = require('./config');

const client = require('twilio')(config.accountSID, config.authToken);

app.get('/login', (req, res) => {
    
    client
        .verify
        .services(config.serviceID)
        .verifications
        .create({
            to: req.query.phonenumber,
            channel: req.query.channel
        })
        .then( data => {
            res.json(data);
        })
        .catch(error => console.log(error))

    res.json('Server is working');
})

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})