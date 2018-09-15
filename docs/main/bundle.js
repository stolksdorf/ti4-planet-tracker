(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.main = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
require('./controls.less');

const React = require('react');

const createClass = require('create-react-class');

const cx = require('classnames');

const Planets = require('../../../planets.yaml');

const Controls = createClass({
  displayName: 'Controls',

  getDefaultProps() {
    return {
      onRefresh: () => {},
      onReset: () => {},
      onRewind: () => {},
      owned: new Set([]),
      exhausted: new Set([])
    };
  },

  getSum() {
    const owned = Planets.filter(planet => this.props.owned.has(planet.name));
    return owned.reduce((acc, planet) => {
      acc.influence_total += planet.influence;
      acc.resource_total += planet.resource;

      if (!this.props.exhausted.has(planet.name)) {
        acc.influence += planet.influence;
        acc.resource += planet.resource;
      }

      return acc;
    }, {
      influence: 0,
      influence_total: 0,
      resource: 0,
      resource_total: 0
    });
  },

  render() {
    const count = this.getSum();
    return React.createElement("div", {
      className: "Controls"
    }, React.createElement("div", {
      className: "resource"
    }, React.createElement("label", null, "resource"), React.createElement("h2", null, count.resource), React.createElement("small", null, count.resource_total)), React.createElement("div", {
      className: "influence"
    }, React.createElement("label", null, "influence"), React.createElement("h2", null, count.influence), React.createElement("small", null, count.influence_total)));
  }

});
module.exports = Controls;
},{"../../../planets.yaml":8,"./controls.less":2,"classnames":undefined,"create-react-class":undefined,"react":undefined}],2:[function(require,module,exports){

},{}],3:[function(require,module,exports){
require('./filter.less');

const React = require('react');

const createClass = require('create-react-class');

const cx = require('classnames');

const Filter = createClass({
  displayName: 'Filter',

  getDefaultProps() {
    return {};
  },

  render() {
    return React.createElement("div", {
      className: "Filter"
    }, "Filter Component Ready.");
  }

});
module.exports = Filter;
},{"./filter.less":4,"classnames":undefined,"create-react-class":undefined,"react":undefined}],4:[function(require,module,exports){
arguments[4][2][0].apply(exports,arguments)
},{"dup":2}],"C:\\Dropbox\\root\\Programming\\Javascript\\ti4-planet-tracker\\client\\main\\main.jsx":[function(require,module,exports){
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

require('./main.less');

const React = require('react');

const createClass = require('create-react-class');

const cx = require('classnames');

const Planets = require('../../planets.yaml');

const Controls = require('./controls/controls.jsx');

const Filter = require('./filter/filter.jsx');

const Planet = require('./planet/planet.jsx'); //const PlanetList = require('./planets/planets.jsx');


const Main = createClass({
  displayName: 'Main',

  getDefaultProps() {
    return {};
  },

  getInitialState() {
    return {
      sort: 'name',
      //'influence', 'resource'
      show: 'both',
      // 'owned', 'not_owned'
      //showOwn : false,
      exhausted: new Set([]),
      owned: new Set([])
    };
  },

  componentDidMount() {
    if (localStorage.getItem('exhausted')) {
      this.state.exhausted = new Set(localStorage.getItem('exhausted').split(','));
    }

    if (localStorage.getItem('owned')) {
      this.state.owned = new Set(localStorage.getItem('owned').split(','));
    }

    this.setState(this.state);
  },

  updateStorage() {
    localStorage.setItem('owned', Array.from(this.state.owned));
    localStorage.setItem('exhausted', Array.from(this.state.exhausted));
  },

  toggleShow() {
    if (this.state.show == 'both') return this.setState({
      show: 'owned'
    });
    if (this.state.show == 'owned') return this.setState({
      show: 'not_owned'
    });
    if (this.state.show == 'not_owned') return this.setState({
      show: 'both'
    });
  },

  exhaust(name) {
    if (!this.state.owned.has(name)) return;

    if (this.state.exhausted.has(name)) {
      this.state.exhausted.delete(name);
    } else {
      this.state.exhausted.add(name);
    }

    this.setState(this.state, this.updateStorage);
  },

  own(name) {
    if (this.state.owned.has(name)) {
      this.state.exhausted.delete(name);
      this.state.owned.delete(name);
    } else {
      this.state.owned.add(name);
    }

    this.setState(this.state, this.updateStorage);
  },

  getSorted() {
    return this.getOwned(this.state.showOwn).sort((a, b) => {
      //TODO: fix\
      return a[this.state.sort] - b[this.state.sort];
    });
  },

  render() {
    return React.createElement("div", {
      className: "Main"
    }, React.createElement(Controls, {
      owned: this.state.owned,
      exhausted: this.state.exhausted,
      onRefresh: () => this.setState({
        exhausted: new Set([])
      }),
      onReset: () => {
        this.setState({
          owned: new Set([]),
          exhausted: new Set([])
        });
      },
      onRewind: exhausted => this.setState({
        exhausted
      })
    }), React.createElement("hr", null), React.createElement(Filter, {
      value: this.state.sort,
      onChange: sort => this.setState({
        sort
      })
    }), React.createElement("hr", null), React.createElement("div", {
      className: cx('planetList', this.state.show)
    }, Planets.map(planet => {
      return React.createElement(Planet, _extends({
        key: planet.name,
        onPress: () => this.exhaust(planet.name),
        onLongPress: () => this.own(planet.name),
        exhausted: this.state.exhausted.has(planet.name),
        owned: this.state.owned.has(planet.name)
      }, planet));
    })));
  }

});
module.exports = Main;
},{"../../planets.yaml":8,"./controls/controls.jsx":1,"./filter/filter.jsx":3,"./main.less":5,"./planet/planet.jsx":6,"classnames":undefined,"create-react-class":undefined,"react":undefined}],5:[function(require,module,exports){
arguments[4][2][0].apply(exports,arguments)
},{"dup":2}],6:[function(require,module,exports){
require('./planet.less');

const React = require('react');

const createClass = require('create-react-class');

const cx = require('classnames');

const Planet = createClass({
  getDefaultProps() {
    return {
      name: '',
      exhausted: false,
      owned: false,
      influence: 0,
      resource: 0,
      type: false,
      onPress: () => {},
      onLongPress: () => {}
    };
  },

  timer: null,

  handlePress() {
    this.timer = setTimeout(() => {
      this.props.onLongPress();
      this.timer = false;
    }, 500);
  },

  handleRelease() {
    if (this.timer !== false) this.props.onPress();
    clearInterval(this.timer);
  },

  renderType() {
    if (!this.props.type) return null;
    const types = {
      home: 'home',
      yellow: 'circle',
      red: 'circle',
      blue: 'circle',
      green: 'circle'
    };
    return React.createElement("i", {
      className: `fa fa-${types[this.props.type]} ${this.props.type}`
    });
  },

  render() {
    const {
      exhausted,
      owned
    } = this.props;
    return React.createElement("div", {
      className: cx('Planet', {
        exhausted,
        owned
      }),
      onMouseDown: this.handlePress,
      onMouseUp: this.handleRelease
    }, React.createElement("div", {
      className: "name"
    }, this.props.name, this.renderType()), React.createElement("div", {
      className: "resource"
    }, this.props.resource), React.createElement("div", {
      className: "influence"
    }, this.props.influence));
  }

});
module.exports = Planet;
},{"./planet.less":7,"classnames":undefined,"create-react-class":undefined,"react":undefined}],7:[function(require,module,exports){
arguments[4][2][0].apply(exports,arguments)
},{"dup":2}],8:[function(require,module,exports){
module.exports=[{"name":"Abyz","resource":3,"influence":0,"type":false},{"name":"Arinam","resource":1,"influence":2,"type":false},{"name":"Arnor","resource":2,"influence":1,"type":false},{"name":"Bereg","resource":3,"influence":1,"type":false},{"name":"Centauri","resource":1,"influence":3,"type":false},{"name":"Coorneeq","resource":1,"influence":2,"type":false},{"name":"Dal Bootha","resource":0,"influence":2,"type":false},{"name":"Fria","resource":2,"influence":0,"type":false},{"name":"Gral","resource":1,"influence":1,"type":"blue"},{"name":"Lazar","resource":1,"influence":0,"type":"yellow"},{"name":"Lirta IV","resource":2,"influence":3,"type":false},{"name":"Lodor + Beta","resource":3,"influence":1,"type":false},{"name":"Lor","resource":1,"influence":2,"type":false},{"name":"Mecatol Rex","resource":1,"influence":6,"type":false},{"name":"Meer","resource":0,"influence":4,"type":"red"},{"name":"Mehar Xull","resource":1,"influence":3,"type":"red"},{"name":"Mellon","resource":0,"influence":2,"type":false},{"name":"New Albion","resource":1,"influence":1,"type":"green"},{"name":"Quann + Alpha","resource":2,"influence":1,"type":false},{"name":"Qucen'n","resource":1,"influence":2,"type":false},{"name":"Rarron","resource":0,"influence":3,"type":false},{"name":"Resculon","resource":2,"influence":0,"type":false},{"name":"Sakulag","resource":2,"influence":1,"type":false},{"name":"Saudor","resource":2,"influence":2,"type":false},{"name":"Starpoint","resource":3,"influence":1,"type":false},{"name":"Tar'Mann","resource":1,"influence":1,"type":"green"},{"name":"Tequ'ran","resource":2,"influence":0,"type":false},{"name":"Thibah","resource":1,"influence":1,"type":"blue"},{"name":"Torkan","resource":0,"influence":3,"type":false},{"name":"Vefut II","resource":2,"influence":2,"type":false},{"name":"Wellon","resource":1,"influence":2,"type":"yellow"},{"name":"XXehan","resource":1,"influence":1,"type":false},{"name":"Zohbat","resource":3,"influence":1,"type":false},{"name":"Creuss","resource":4,"influence":2,"type":"home"},{"name":"Hercant","resource":1,"influence":1,"type":"home"},{"name":"Arretze","resource":2,"influence":0,"type":"home"},{"name":"Kamdorn","resource":0,"influence":1,"type":"home"},{"name":"Jol","resource":1,"influence":2,"type":"home"},{"name":"Nar","resource":2,"influence":3,"type":"home"},{"name":["0.0.0"],"resource":5,"influence":0,"type":"home"},{"name":"Arc Prime","resource":4,"influence":0,"type":"home"},{"name":"Wren Terra","resource":2,"influence":1,"type":"home"},{"name":"Moll Primus","resource":4,"influence":1,"type":"home"},{"name":"Muuat","resource":4,"influence":1,"type":"home"},{"name":"Druaa","resource":3,"influence":1,"type":"home"},{"name":"Maaluuk","resource":0,"influence":2,"type":"home"},{"name":"Mordai II","resource":4,"influence":0,"type":"home"},{"name":"Lisis II","resource":1,"influence":0,"type":"home"},{"name":"Ragh","resource":2,"influence":1,"type":"home"},{"name":"Tren'Lak","resource":1,"influence":0,"type":"home"},{"name":"Quinarra","resource":3,"influence":1,"type":"home"},{"name":"Jord","resource":4,"influence":2,"type":"home"},{"name":"Winnu","resource":3,"influence":4,"type":"home"},{"name":"Archon Wren","resource":2,"influence":3,"type":"home"},{"name":"Archon Tau","resource":1,"influence":1,"type":"home"},{"name":"Darien","resource":4,"influence":4,"type":"home"},{"name":"Retillion","resource":2,"influence":3,"type":"home"},{"name":"Shalloq","resource":1,"influence":2,"type":"home"}]
},{}]},{},[])("C:\\Dropbox\\root\\Programming\\Javascript\\ti4-planet-tracker\\client\\main\\main.jsx")
});
