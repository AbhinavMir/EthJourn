

const ipfsAPI = require('ipfs-api');
const express = require('express');
const fs = require('fs');
const path = require('path');
const firebase = require('firebase');
const web3 = require('web3');

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

//web3 
var contract_address = '0xCf78E2f48E6C2Baa15dc3D7d1189D85941115C0D';
var contract_abi = [{
		"anonymous": false,
		"inputs": [{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "hash",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tipAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address payable",
				"name": "author",
				"type": "address"
			}
		],
		"name": "PostCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "hash",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tipAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address payable",
				"name": "author",
				"type": "address"
			}
		],
		"name": "PostTipped",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [{
			"internalType": "string",
			"name": "_hash",
			"type": "string"
		}],
		"name": "createPost",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [{
			"internalType": "uint256",
			"name": "_id",
			"type": "uint256"
		}],
		"name": "tipPost",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "name",
		"outputs": [{
			"internalType": "string",
			"name": "",
			"type": "string"
		}],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "postCount",
		"outputs": [{
			"internalType": "uint256",
			"name": "",
			"type": "uint256"
		}],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [{
			"internalType": "uint256",
			"name": "",
			"type": "uint256"
		}],
		"name": "posts",
		"outputs": [{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "hash",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "tipAmount",
				"type": "uint256"
			},
			{
				"internalType": "address payable",
				"name": "author",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]
var gateway_infura = "https://mainnet.infura.io/v3/2b9c7e3cfcb24054a3bb829462ef708c";
web3js = new web3(new web3.providers.HttpProvider(gateway_infura));
const Contract = new web3js.eth.Contract(contract_abi, contract_address);

//declarations
const app = express();
//Connceting to the ipfs network via infura gateway
const ipfs = ipfsAPI('ipfs.infura.io', '5001', {
	protocol: 'https'
})

//functions
async function createPost(hash) {
	var createPostMethod = await Contract.methods.createPost(hash).call();
	return createPostMethod;
}

//urlEncoded to send files
app.use(express.urlencoded({
	extended: true
}))

app.get('/', function (req, res) {
	//web3.eth.defaultAccount = web3.eth.accounts[0];
	res.sendFile(path.join(__dirname + '/html/index.html'));
});

app.get('/post', function (req, res) {
	res.sendFile(path.join(__dirname + '/html/post.html'));
});

app.post('/submit-form', (req, res) => {
	res.sendFile(path.join(__dirname + '/html/progress.html'));
	const text = req.body.text;
	const title = req.body.title;
	let testBuffer = new Buffer(text);
	ipfs.files.add(testBuffer, function (err, file) {
		if (err) {
			console.log(err);
		}
		console.log(file)
		const hash = file[0]['hash']
		firebase.database().ref().push({
			title: title,
			hash: hash
		});
		console.log(createPost(hash));
	})
	//return res.redirect('/');
})

app.listen(3000, () => console.log('App listening on port 3000!'))

//https://image.flaticon.com/icons/svg/976/976974.svg

