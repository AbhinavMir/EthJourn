const ipfsAPI = require('ipfs-api');
const express = require('express');
const fs = require('fs');
var path = require('path');


//declarations
const app = express();
//Connceting to the ipfs network via infura gateway
const ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'})

//urlEncoded to send files
app.use(express.urlencoded({
  extended: true
}))

app.get('/post', function(req, res) {
    res.sendFile(path.join(__dirname + '/html/post.html'));
});


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/html/index.html'));
});

app.post('/submit-form', (req, res) => {
  const username = req.body.username
//  console.log("1/3");
  let testBuffer = new Buffer(username);
//  console.log("2/3");
  ipfs.files.add(testBuffer, function (err, file) {
      if (err) {
        console.log(err);
      }
      console.log(file)
	  const hash = file[0]['hash']
	  console.log(hash)
    })
//  console.log("3/3 Complete!");
  res.end()
})


app.listen(3000, () => console.log('App listening on port 3000!'))