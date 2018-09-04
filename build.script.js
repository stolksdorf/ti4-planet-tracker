const build = require('vitreum/build');
const fs = require('fs');


build().then(()=>{

	console.log('done!');

	const render = require('./docs/main/render.js');

	fs.writeFileSync('./docs/index.html', render())

})