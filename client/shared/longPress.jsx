const React       = require('react');
const createClass = require('create-react-class');


const LongPress = createClass({
	getDefaultProps(){
		return {
			wait        : 500,
			onPress     : ()=>{},
			onLongPress : ()=>{},
		};
	},
	timer : null,
	handlePress(evt){
		//evt.preventDefault();
		this.timer = setTimeout(()=>{
			this.props.onLongPress();
			window.navigator.vibrate && window.navigator.vibrate(200);
			this.timer = false;
		}, this.props.wait);
	},
	handleRelease(evt){
		evt.preventDefault();
		if(this.timer !== false) this.props.onPress();
		clearInterval(this.timer);
	},
	render(){
		return <div className={this.props.className}
			onTouchStart={this.handlePress}
			onTouchEnd={this.handleRelease}
			onMouseDown={this.handlePress}
			onMouseUp={this.handleRelease}
		>{this.props.children}
		</div>;
	},
});

module.exports = LongPress;