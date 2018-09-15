require('./planet.less');
const React       = require('react');
const createClass = require('create-react-class');
const cx          = require('classnames');


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
	timer : null,
	handlePress(){
		this.timer = setTimeout(()=>{
			this.props.onLongPress();
			this.timer = false;
		}, 500);
	},
	handleRelease(){
		if(this.timer !== false) this.props.onPress();
		clearInterval(this.timer);
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
		return <div
			className={cx('Planet', { exhausted, owned })}
			onMouseDown={this.handlePress} onMouseUp={this.handleRelease}>
			<div className='name'>
				{this.props.name}

				{this.renderType()}
			</div>
			<div className='resource'>{this.props.resource}</div>
			<div className='influence'>{this.props.influence}</div>
		</div>
	}

})
module.exports = Planet;