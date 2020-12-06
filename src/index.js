const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
app.use(express.urlencoded());

const InitialData = require('./InitialData');

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here
app.get('/api/student', (req, res) => {
    res.send(InitialData);
});

app.get('/api/student/:stuId', (req, res) => {
    if(InitialData[req.params.stuId - 1]) {
        res.send(InitialData[req.params.stuId - 1]);
    } else {
        res.sendStatus(404);
    }
});

app.post('/api/student', (req, res) => {
    const newStu = {
        id: InitialData.length,
        name: req.body.name,
        currentClass: Number(req.body.currentClass),
        division: req.body.division
    } 
    if(newStu.name && newStu.currentClass && newStu.division) {
        const newId = InitialData.push(newStu);
        res.send({'id':newId});
    } else {
        res.sendStatus(400);
    }
});

app.put('/api/student/:stuId', (req, res) => {
    const stuId = req.params.stuId;
    if((stuId >=1) && (stuId <= InitialData.length)) {
        const updateStu = {
            name: req.body.name,
            currentClass: Number(req.body.currentClass),
            division: req.body.division
        }
        if(updateStu.name && updateStu.currentClass && updateStu.division) {
            InitialData[stuId - 1].id = stuId;
            InitialData[stuId - 1].name = updateStu.name;
            InitialData[stuId - 1].currentClass = updateStu.currentClass;
            InitialData[stuId - 1].division = updateStu.division;
            res.send({name: updateStu.name});
        } else {
            res.sendStatus(400);
        }
    } else {
        res.sendStatus(400);
    }
});

app.delete('/api/student/:stuId', (req, res) => {
    const stuId = req.params.stuId;
    if((stuId >=1) && (stuId <= InitialData.length)) {
        InitialData.splice(stuId - 1);
        res.send();
    } else {
        res.sendStatus(404);
    }
});

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;