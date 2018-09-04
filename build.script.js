const build = require('vitreum/build');
const fs = require('fs');


build().then(()=>{

	console.log('done!');

	const render = require('./build/main/render.js');

	fs.writeFileSync('./index.html', render())


})