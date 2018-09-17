require('./controls.less');
const React       = require('react');
const createClass = require('create-react-class');
const cx          = require('classnames');

const Planets = require('shared/planets.yaml');
const LongPress = require('shared/longPress.jsx');

const Controls = createClass({
	displayName : 'Controls',
	getDefaultProps(){
		return {
			typeVisible : 'not_owned', //'owned', 'both'
			onChangeVisible : ()=>{},

			owned : new Set([]),
			exhausted : new Set([]),
			bookmark : new Set([]),

			updateExhausted : ()=>{},
			updateOwned : ()=>{},
			updateBookmark : ()=>{},
		};
	},
	toggleShow(){
		// if(this.props.typeVisible == 'both') return this.props.onChangeVisible('owned');
		// if(this.props.typeVisible == 'owned') return this.props.onChangeVisible('not_owned');
		// if(this.props.typeVisible == 'not_owned') return this.props.onChangeVisible('both');

		if(this.props.typeVisible == 'owned') return this.props.onChangeVisible('not_owned');
		if(this.props.typeVisible == 'not_owned') return this.props.onChangeVisible('owned');
	},

	render(){
		return <div className='Controls'>
			<LongPress className='refresh'
				wait={800}
				onPress={()=>this.props.updateExhausted(new Set([]))}
				onLongPress={()=>{
					this.props.updateExhausted(new Set([]));
					this.props.updateOwned(new Set([]));
				}}>
				<i className='fa fa-refresh' />
			</LongPress>


			<LongPress className='ownership' onPress={this.toggleShow}>
				<i className={cx('fa', {
					'fa-circle' : this.props.typeVisible == 'owned',
					'fa-circle-o' : this.props.typeVisible == 'not_owned',
					'fa-stop-circle-o' : this.props.typeVisible == 'both',
				})} />
			</LongPress>

			<LongPress className='bookmark'
				onPress={()=>{
					const temp = this.props.bookmark;
					this.props.updateBookmark(this.props.exhausted);
					this.props.updateExhausted(temp);
				}}
				onLongPress={()=>{
					this.props.updateBookmark(this.props.exhausted);
				}}>

				<i className='fa fa-bookmark' />
			</LongPress>

		</div>;
	}
});

module.exports = Controls;