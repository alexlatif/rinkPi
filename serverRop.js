

const express = require('express');
var path = require('path');
const app = express();

// Serve up content from public directory
app.use(express.static(__dirname + '/public'));

var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://test.mosquitto.org')

var ropstenContract;

var timeOut;
var runningPi = ''

client.on('connect', () => {
    client.subscribe('flowB')
})

client.on('message', (topic, message) => {
    // message is Buffer
    if (message.toString() === "0") {
        console.log("inside message 0")
        client.publish("Xcharge/switchB", "False")
    } else {
        client.publish("Xcharge/switchB", "True")
    }
    console.log(message.toString())
})


app.listen(3000, () => console.log('Example app listening on port 3000!'))
