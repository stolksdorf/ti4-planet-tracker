require('./main.less');
const React       = require('react');
const createClass = require('create-react-class');
const cx          = require('classnames');

const Planets = require('../../planets.yaml');

const Controls = require('./controls/controls.jsx');
const Filter= require('./filter/filter.jsx');
const Planet = require('./planet/planet.jsx');

//const PlanetList = require('./planets/planets.jsx');



const Main = createClass({
	displayName : 'Main',
	getDefaultProps(){
		return {
		};
	},
	getInitialState(){
		return {
			sort : 'name', //'influence', 'resource'
			show : 'both', // 'owned', 'not_owned'
			//showOwn : false,


			exhausted : new Set([]),
			owned : new Set([]),
		}
	},
	componentDidMount(){
		if(localStorage.getItem('exhausted')){
			this.state.exhausted = new Set(localStorage.getItem('exhausted').split(','));
		}
		if(localStorage.getItem('owned')){
			this.state.owned = new Set(localStorage.getItem('owned').split(','));
		}
		this.setState(this.state);
	},
	updateStorage(){
		localStorage.setItem('owned', Array.from(this.state.owned));
		localStorage.setItem('exhausted', Array.from(this.state.exhausted));
	},
	toggleShow(){
		if(this.state.show == 'both') return this.setState({show : 'owned'});
		if(this.state.show == 'owned') return this.setState({show : 'not_owned'});
		if(this.state.show == 'not_owned') return this.setState({show : 'both'});
	},
	exhaust(name){
		if(!this.state.owned.has(name)) return;
		if(this.state.exhausted.has(name)){
			this.state.exhausted.delete(name);
		}else{
			this.state.exhausted.add(name);
		}
		this.setState(this.state, this.updateStorage);
	},
	own(name){
		if(this.state.owned.has(name)){
			this.state.exhausted.delete(name)
			this.state.owned.delete(name)
		}else{
			this.state.owned.add(name);
		}
		this.setState(this.state, this.updateStorage);
	},

	getSorted(){
		return this.getOwned(this.state.showOwn).sort((a, b)=>{
			//TODO: fix\
			return a[this.state.sort] - b[this.state.sort]
		});
	},
	render(){
		return <div className='Main'>
			<Controls
				owned={this.state.owned}
				exhausted={this.state.exhausted}
				onRefresh={()=>this.setState({exhausted : new Set([])})}
				onReset={()=>{this.setState({
					owned : new Set([]),
					exhausted : new Set([]),
				})}}
				onRewind={(exhausted)=>this.setState({ exhausted })}
			/>

			<hr />

			<Filter
				value={this.state.sort}
				onChange={(sort)=>this.setState({sort})}
			/>

			<hr />

			<div className={cx('planetList', this.state.show)}>
				{Planets.map((planet)=>{
					return <Planet
						key={planet.name}
						onPress={()=>this.exhaust(planet.name)}
						onLongPress={()=>this.own(planet.name)}
						exhausted={this.state.exhausted.has(planet.name)}
						owned={this.state.owned.has(planet.name)}
						{...planet}
					/>
				})}
			</div>
		</div>;
	}
});

module.exports = Main;