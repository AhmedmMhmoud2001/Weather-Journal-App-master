// Setup projectData
let projectData = {};
// Express to run server and routes
const express = require('express');


//bodyParser
const bodyParser = require('body-parser');


const app = express();

// use body-parser 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors 
const cors = require('cors');
app.use(cors());


// Initialize the main project folder
app.use(express.static('website'));



// Post Route
const data = [];
app.post('/add', addInfo);


function addInfo(req, res) {
  projectData['date'] = req.body.date;
  projectData['temp'] = req.body.temp;
  projectData['content'] = req.body.content;
  res.send(projectData);
}


app.get('/all', getInfo);

function getInfo(req, res) {
  res.send(projectData);
}

// Setup Server
const port = 3000;
const server = app.listen(port, listening);

function listening() {
  console.log(`running on http://localhost:${port}`);
};
