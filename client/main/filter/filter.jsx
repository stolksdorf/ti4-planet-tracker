require('./filter.less');
const React       = require('react');
const createClass = require('create-react-class');
const cx          = require('classnames');


const Filter = createClass({
	displayName : 'Filter',
	getDefaultProps(){
		return {
		};
	},
	render(){
		return <div className='Filter'>
			Filter Component Ready.
		</div>;
	}
});

module.exports = Filter;