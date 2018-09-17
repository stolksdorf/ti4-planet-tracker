require('./planet.less');
const React       = require('react');
const createClass = require('create-react-class');
const cx          = require('classnames');

const LongPress = require('shared/longPress.jsx');


const Planet = createClass({
	getDefaultProps(){
		return {
			name : '',
			exhausted : false,
			owned: false,
			influence : 0,
			resource : 0,
			type : false,

			onPress : ()=>{},
			onLongPress : ()=>{},
		};
	},
	renderType(){
		if(!this.props.type) return null;
		const types = {
			home : 'home',
			yellow : 'circle',
			red : 'circle',
			blue : 'circle',
			green  : 'circle',
		}
		return <i className={`fa fa-${types[this.props.type]} ${this.props.type}`} />
	},
	render(){
		const { exhausted, owned } = this.props;
		return <LongPress
			className={cx('Planet', { exhausted, owned, unowned : !owned })}
			onPress={this.props.onPress} onLongPress={this.props.onLongPress}>
			<div className='name'>
				{this.props.name}

				{this.renderType()}
			</div>
			<div className='resource'>{this.props.resource}</div>
			<div className='influence'>{this.props.influence}</div>
		</LongPress>
	}

})
module.exports = Planet;