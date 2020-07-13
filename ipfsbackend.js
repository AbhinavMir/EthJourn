const ipfsAPI = require('ipfs-api');
const express = require('express');
const fs = require('fs');
const path = require('path');
const firebase = require('firebase')

//firebase
var firebaseConfig = {
    apiKey: "AIzaSyBwR7gwCYGV8gzrsACBG63isAf8IJiy2GE",
    authDomain: "abhi-1234.firebaseapp.com",
    databaseURL: "https://abhi-1234.firebaseio.com",
    projectId: "abhi-1234",
    storageBucket: "abhi-1234.appspot.com",
    messagingSenderId: "1060909375226",
    appId: "1:1060909375226:web:e5853fdde27f844cda7343"
};

firebase.initializeApp(firebaseConfig)
//writeUserData("test","test");

//declarations
const app = express();
//Connceting to the ipfs network via infura gateway
const ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'})

//urlEncoded to send files
app.use(express.urlencoded({
  extended: true
}))

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/html/index.html'));
});

app.get('/post', function(req, res) {
    res.sendFile(path.join(__dirname + '/html/post.html'));
});

app.post('/submit-form', (req, res) => {
  const username = req.body.username
  let testBuffer = new Buffer(username);
  ipfs.files.add(testBuffer, function (err, file) {
	  
      if (err) {console.log(err);}
      console.log(file)
	  const hash = file[0]['hash']
	  firebase.database().ref().set({
	      title: "title",
	      hash: "hash"
	    });
	})
  res.end()
})


app.listen(3000, () => console.log('App listening on port 3000!'))