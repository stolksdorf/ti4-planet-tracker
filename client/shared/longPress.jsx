const React       = require('react');
const createClass = require('create-react-class');


const LongPress = createClass({
	getDefaultProps(){
		return {
			wait : 500,
			onPress : ()=>{},
			onLongPress : ()=>{},
		};
	},
	timer : null,
	handlePress(){
		this.timer = setTimeout(()=>{
			this.props.onLongPress();
			this.timer = false;
		}, this.props.wait);
	},
	handleRelease(){
		if(this.timer !== false) this.props.onPress();
		clearInterval(this.timer);
	},
	render(){
		return <div className={this.props.className}
			onMouseDown={this.handlePress}
			onMouseUp={this.handleRelease}
			>{this.props.children}
		</div>
	}
});

module.exports = LongPress;