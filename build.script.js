const build = require('vitreum/build');
const fs = require('fs');

String.prototype.replaceAll = function (find, replace) {
	var str = this;
	return str.replace(new RegExp(find, 'g'), replace);
};

build().then(()=>{
	const render = require('./docs/main/render.js');

	fs.writeFileSync('./docs/index.html', render()
		.replace('/libs.js', 'docs/libs.js')
		.replaceAll('/main/bundle', 'docs/main/bundle')
		.replaceAll('/assets', 'docs/assets')
	)
	console.log('Built index.html');
})