const mainRenderer = require('./build/main/render.js');
const express = require('express');
const server  = express();

server.use(express.static(__dirname + '/build'));
server.get('*', (req, res)=>res.send(mainRenderer()))

server.listen(8000, ()=>{
	console.log('_____________________________');
	console.log(`dev server running on port:8000 🚀 `);
});