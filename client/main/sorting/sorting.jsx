require('./sorting.less');
const React       = require('react');
const createClass = require('create-react-class');
const cx          = require('classnames');


const Sorting = createClass({
	displayName : 'Sorting',
	getDefaultProps(){
		return {
		};
	},
	render(){
		return <div className='Sorting'>
			Sorting Component Ready.
		</div>;
	}
});

module.exports = Sorting;