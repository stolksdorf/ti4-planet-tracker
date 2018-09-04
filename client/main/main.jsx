require('./main.less');
const React       = require('react');
const createClass = require('create-react-class');
const cx          = require('classnames');


const Main = createClass({
	displayName : 'Main',
	getDefaultProps(){
		return {
		};
	},
	render(){
		console.log('test2');
		return <div className='Main'>
			Main Component Ready.
		</div>;
	}
});

module.exports = Main;