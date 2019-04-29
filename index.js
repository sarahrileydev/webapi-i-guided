const express = require('express'); // 1. add express functionality
const db = require('./data/db.js'); //tells server where to find the database/data

const server = express(); // 2. create an express server call it server

server.listen(4000, () => {
  console.log('Server running on localhost: 4000')
});

//create home endpoint 
server.get('/', (req, res) => {
  res.send('Hello World')
});

//create an endpoint /now and return today's date
server.get('/now', (req, res) => {
  const now = new Date().toISOString();
  res.send(now)
});

//add GET/ hubs endpoint: 
server.get('/hubs', (req, res) => {
  db.hubs
    .find()
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(err => {
      res.status(err.code).json({message: 'error retrieving hub'})
    })
})

//another way to get an error message
//.catch(( {code, message }) => {
//   res.status(code.json({
//     success: false,
//     message
//   }))
// })