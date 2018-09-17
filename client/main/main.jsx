require('./main.less');
const React       = require('react');
const createClass = require('create-react-class');
const cx          = require('classnames');

const Planets = require('shared/planets.yaml');

const Controls = require('./controls/controls.jsx');
const Filter= require('./filter/filter.jsx');
const Summary = require('./summary/summary.jsx');
const Sorting = require('./sorting/sorting.jsx');
const Planet = require('./planet/planet.jsx');
const PlanetList = require('./planetList/planetList.jsx');

//const PlanetList = require('./planets/planets.jsx');



const Main = createClass({
	displayName : 'Main',
	getDefaultProps(){
		return {
		};
	},
	getInitialState(){
		return {
			//show : 'not_owned', // 'owned', 'both'
			show : 'owned', // 'owned', 'both'

			exhausted : new Set([]),
			owned : new Set([]),
			bookmark : new Set([])
		}
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
			console.log(Array.from(this.state[key]));
			localStorage.setItem(key, Array.from(this.state[key]));
		})
	},
	render(){
		console.log(this.state);
		return <div className='Main'>
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

			<hr />

			<Summary
				owned={this.state.owned}
				exhausted={this.state.exhausted}
			/>

			<hr />

			<PlanetList
				updateExhausted={(exhausted)=>this.updateSet('exhausted', exhausted)}
				updateOwned={(owned)=>this.updateSet('owned', owned)}

				owned={this.state.owned}
				exhausted={this.state.exhausted}
				show={this.state.show}
			/>


		</div>;
	}
});

module.exports = Main;