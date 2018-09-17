require('./planetList.less');
const React       = require('react');
const createClass = require('create-react-class');
const cx          = require('classnames');

const Planets = require('shared/planets.yaml');

const Planet = require('../planet/planet.jsx');


const PlanetList = createClass({
	displayName : 'PlanetList',
	getDefaultProps(){
		return {
			updateExhausted : ()=>{},
			updateOwned     : ()=>{},

			owned     : new Set([]),
			exhausted : new Set([]),
			show      : 'owned',
		};
	},
	getInitialState(){
		return {
			sort : 'name', //'influence', 'resource'
		};
	},
	exhaust(name){
		if(!this.props.owned.has(name)) return;
		this.props.exhausted.has(name)
			? this.props.exhausted.delete(name)
			: this.props.exhausted.add(name);

		this.props.updateExhausted(this.props.exhausted);
	},
	own(name){
		this.props.owned.has(name)
			? this.props.owned.delete(name)
			: this.props.owned.add(name);

		this.props.updateOwned(this.props.owned);
	},
	getSorted(){
		const sort = this.state.sort;
		return Planets.sort((a, b)=>{
			if(sort == 'name') return a.name.localeCompare(b.name);
			if(sort == 'influence') return b.influence - a.influence;
			if(sort == 'resource') return b.resource - a.resource;
		});
	},
	render(){
		return <div className='PlanetList'>
			<div className='sorting'>
				<div className={cx('name', { selected : this.state.sort == 'name' })}
					onClick={()=>this.setState({ sort : 'name' })}>
					name
				</div>
				<div className={cx('resource', { selected : this.state.sort == 'resource' })}
					onClick={()=>this.setState({ sort : 'resource' })}>
					resource
				</div>
				<div className={cx('influence', { selected : this.state.sort == 'influence' })}
					onClick={()=>this.setState({ sort : 'influence' })}>
					influ
				</div>
			</div>
			<div className={cx('planets', this.props.show)}>
				{this.getSorted().map((planet)=>{
					return <Planet
						key={planet.name}
						onPress={()=>this.exhaust(planet.name)}
						onLongPress={()=>this.own(planet.name)}
						exhausted={this.props.exhausted.has(planet.name)}
						owned={this.props.owned.has(planet.name)}
						{...planet}
					/>;
				})}
			</div>

		</div>;
	},
});

module.exports = PlanetList;