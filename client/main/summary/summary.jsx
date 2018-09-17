require('./summary.less');
const React       = require('react');
const createClass = require('create-react-class');
const cx          = require('classnames');

const Planets = require('shared/planets.yaml');


const Summary = createClass({
	displayName : 'Summary',
	getDefaultProps(){
		return {
			owned     : new Set([]),
			exhausted : new Set([]),
		};
	},
	getSum(){
		const owned = Planets.filter((planet)=>this.props.owned.has(planet.name));

		return owned.reduce((acc, planet)=>{
			acc.influence_total += planet.influence;
			acc.resource_total += planet.resource;
			if(!this.props.exhausted.has(planet.name)){
				acc.influence += planet.influence;
				acc.resource += planet.resource;
			}
			return acc;
		}, {
			influence       : 0, influence_total : 0,
			resource        : 0, resource_total  : 0,
		});
	},
	render(){
		const count = this.getSum();
		return <div className='Summary'>

			<div className='resource'>
				<label>resource</label>
				<h2>{count.resource}</h2>
				<small>{count.resource_total}</small>
			</div>
			<div className='influence'>
				<label>influence</label>
				<h2>{count.influence}</h2>
				<small>{count.influence_total}</small>
			</div>
		</div>;
	},
});

module.exports = Summary;