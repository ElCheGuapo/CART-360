var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
const app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();

app.listen(5000) //listen/host on port 5000

//this is a work in progress, didn't have time to debug so ignore this redirect, I wanted to host my webpage localy but encountered wierd bugs
app.get('/PulseBot', (req, res) => {
    var html = fs.readFileSync('public/index.html');
    res.write(html);
    res.end("This is the end, hold your breath and count to ten.");
})

app.post('/', urlencodedParser,(req, res) => {
    let writtenValue = JSON.stringify(req.body);

    //modify json/string to fit format for microcontroller
    writtenValue = writtenValue.replace(/{/g, '');
    writtenValue = writtenValue.replace(/}/g, '');
    writtenValue = writtenValue.replace(/"/g, '');
    writtenValue = writtenValue.replace(/ /g, '');
    writtenValue = writtenValue.replace(/:/g, ''); 

    //console.log(writtenValue);
    
    fs.writeFileSync('heartRate.txt', writtenValue);

    res.end("beep boop beep boop");
})


