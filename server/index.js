const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());

//allow access to our index.html folder
app.use('/', express.static(path.join(__dirname, '../client')));

//serve the index file 
app.get('/', (req, res) =>{
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(PORT, () =>{
  console.log(`Server listening on port ${PORT}`);
  console.log('This is __dirname', __dirname)
})

module.exports = app;