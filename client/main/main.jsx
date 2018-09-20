require('./main.less');
const React       = require('react');
const createClass = require('create-react-class');
const cx          = require('classnames');

const Controls = require('./controls/controls.jsx');
const Summary = require('./summary/summary.jsx');
const PlanetList = require('./planetList/planetList.jsx');

const {Title} = require('vitreum/headtags');


const Main = createClass({
	displayName : 'Main',
	getDefaultProps(){
		return {
		};
	},
	getInitialState(){
		return {
			show : 'owned', // 'owned', 'not_owned'

			exhausted : new Set([]),
			owned     : new Set([]),
			bookmark  : new Set([]),
		};
	},
	componentDidMount(){
		if(localStorage.getItem('exhausted')){
			this.state.exhausted = new Set(localStorage.getItem('exhausted').split(','));
		}
		if(localStorage.getItem('owned')){
			this.state.owned = new Set(localStorage.getItem('owned').split(','));
		}
		if(localStorage.getItem('bookmark')){
			this.state.bookmark = new Set(localStorage.getItem('bookmark').split(','));
		}
		this.setState(this.state);
	},
	updateSet(key, val){
		this.state[key] = new Set(val);
		this.setState(this.state, ()=>{
			localStorage.setItem(key, Array.from(this.state[key]));
		});
	},
	render(){
		return <div className='Main'>
			<Title>TI4 Planet Tracker</Title>
			<Controls
				owned={this.state.owned}
				exhausted={this.state.exhausted}
				bookmark={this.state.bookmark}

				updateExhausted={(exhausted)=>this.updateSet('exhausted', exhausted)}
				updateOwned={(owned)=>this.updateSet('owned', owned)}
				updateBookmark={(bookmark)=>this.updateSet('bookmark', bookmark)}

				typeVisible={this.state.show}
				onChangeVisible={(show)=>this.setState({ show })}
			/>

			<Summary
				owned={this.state.owned}
				exhausted={this.state.exhausted}
			/>

			<PlanetList
				updateExhausted={(exhausted)=>this.updateSet('exhausted', exhausted)}
				updateOwned={(owned)=>this.updateSet('owned', owned)}

				owned={this.state.owned}
				exhausted={this.state.exhausted}
				show={this.state.show}
			/>


		</div>;
	},
});

module.exports = Main;