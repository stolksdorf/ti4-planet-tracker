(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.main = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
require('./controls.less');

const React = require('react');

const createClass = require('create-react-class');

const cx = require('classnames');

const LongPress = require('shared/longPress.jsx');

const isSame = (setA, setB) => {
  if (setA.size !== setB.size) return false;
  return Array.from(setA).every(val => setB.has(val));
};

const Controls = createClass({
  displayName: 'Controls',

  getDefaultProps() {
    return {
      typeVisible: 'not_owned',
      //'owned', 'both'
      onChangeVisible: () => {},
      owned: new Set([]),
      exhausted: new Set([]),
      bookmark: new Set([]),
      updateExhausted: () => {},
      updateOwned: () => {},
      updateBookmark: () => {}
    };
  },

  toggleShow() {
    // if(this.props.typeVisible == 'both') return this.props.onChangeVisible('owned');
    // if(this.props.typeVisible == 'owned') return this.props.onChangeVisible('not_owned');
    // if(this.props.typeVisible == 'not_owned') return this.props.onChangeVisible('both');
    if (this.props.typeVisible == 'both') return this.props.onChangeVisible('owned');
    if (this.props.typeVisible == 'owned') return this.props.onChangeVisible('not_owned');
    if (this.props.typeVisible == 'not_owned') return this.props.onChangeVisible('owned');
  },

  render() {
    const temp = isSame(this.props.exhausted, this.props.bookmark);
    return React.createElement("div", {
      className: "Controls"
    }, React.createElement(LongPress, {
      className: "refresh",
      wait: 800,
      onPress: () => this.props.updateExhausted(new Set([])),
      onLongPress: () => {
        this.props.updateExhausted(new Set([]));
        this.props.updateOwned(new Set([]));
      }
    }, React.createElement("i", {
      className: "fa fa-refresh"
    })), React.createElement(LongPress, {
      className: "ownership",
      onPress: this.toggleShow,
      onLongPress: () => this.props.onChangeVisible('both')
    }, React.createElement("i", {
      className: cx('fa', {
        'fa-circle': this.props.typeVisible == 'owned',
        'fa-circle-o': this.props.typeVisible == 'not_owned',
        'fa-stop-circle-o': this.props.typeVisible == 'both'
      })
    })), React.createElement(LongPress, {
      className: "bookmark",
      onPress: () => {
        const temp = this.props.bookmark;
        this.props.updateBookmark(this.props.exhausted);
        this.props.updateExhausted(temp);
      },
      onLongPress: () => {
        this.props.updateBookmark(this.props.exhausted);
      }
    }, React.createElement("i", {
      className: cx('fa', {
        'fa-bookmark-o': temp,
        'fa-bookmark': !temp
      })
    })));
  }

});
module.exports = Controls;
},{"./controls.less":2,"classnames":undefined,"create-react-class":undefined,"react":undefined,"shared/longPress.jsx":10}],2:[function(require,module,exports){

},{}],"C:\\Dropbox\\root\\Programming\\Javascript\\ti4-planet-tracker\\client\\main\\main.jsx":[function(require,module,exports){
require('./main.less');

const React = require('react');

const createClass = require('create-react-class');

const cx = require('classnames');

const Controls = require('./controls/controls.jsx');

const Summary = require('./summary/summary.jsx');

const PlanetList = require('./planetList/planetList.jsx');

const Main = createClass({
  displayName: 'Main',

  getDefaultProps() {
    return {};
  },

  getInitialState() {
    return {
      show: 'owned',
      // 'owned', 'not_owned'
      exhausted: new Set([]),
      owned: new Set([]),
      bookmark: new Set([])
    };
  },

  componentDidMount() {
    if (localStorage.getItem('exhausted')) {
      this.state.exhausted = new Set(localStorage.getItem('exhausted').split(','));
    }

    if (localStorage.getItem('owned')) {
      this.state.owned = new Set(localStorage.getItem('owned').split(','));
    }

    if (localStorage.getItem('bookmark')) {
      this.state.bookmark = new Set(localStorage.getItem('bookmark').split(','));
    }

    this.setState(this.state);
  },

  updateSet(key, val) {
    this.state[key] = new Set(val);
    this.setState(this.state, () => {
      localStorage.setItem(key, Array.from(this.state[key]));
    });
  },

  render() {
    return React.createElement("div", {
      className: "Main"
    }, React.createElement(Controls, {
      owned: this.state.owned,
      exhausted: this.state.exhausted,
      bookmark: this.state.bookmark,
      updateExhausted: exhausted => this.updateSet('exhausted', exhausted),
      updateOwned: owned => this.updateSet('owned', owned),
      updateBookmark: bookmark => this.updateSet('bookmark', bookmark),
      typeVisible: this.state.show,
      onChangeVisible: show => this.setState({
        show
      })
    }), React.createElement("hr", null), React.createElement(Summary, {
      owned: this.state.owned,
      exhausted: this.state.exhausted
    }), React.createElement("hr", null), React.createElement(PlanetList, {
      updateExhausted: exhausted => this.updateSet('exhausted', exhausted),
      updateOwned: owned => this.updateSet('owned', owned),
      owned: this.state.owned,
      exhausted: this.state.exhausted,
      show: this.state.show
    }));
  }

});
module.exports = Main;
},{"./controls/controls.jsx":1,"./main.less":3,"./planetList/planetList.jsx":4,"./summary/summary.jsx":8,"classnames":undefined,"create-react-class":undefined,"react":undefined}],3:[function(require,module,exports){
arguments[4][2][0].apply(exports,arguments)
},{"dup":2}],4:[function(require,module,exports){
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

require('./planetList.less');

const React = require('react');

const createClass = require('create-react-class');

const cx = require('classnames');

const Planets = require('shared/planets.yaml');

const Planet = require('../planet/planet.jsx');

const PlanetList = createClass({
  displayName: 'PlanetList',

  getDefaultProps() {
    return {
      updateExhausted: () => {},
      updateOwned: () => {},
      owned: new Set([]),
      exhausted: new Set([]),
      show: 'owned'
    };
  },

  getInitialState() {
    return {
      sort: 'name' //'influence', 'resource'

    };
  },

  exhaust(name) {
    if (!this.props.owned.has(name)) return;
    this.props.exhausted.has(name) ? this.props.exhausted.delete(name) : this.props.exhausted.add(name);
    this.props.updateExhausted(this.props.exhausted);
  },

  own(name) {
    this.props.owned.has(name) ? this.props.owned.delete(name) : this.props.owned.add(name);
    this.props.updateOwned(this.props.owned);
  },

  getSorted() {
    const sortTerm = this.state.sort;
    let result = Planets.sort((a, b) => a.name.localeCompare(b.name));
    if (sortTerm == 'influence') return result.sort((a, b) => b.influence - a.influence);
    if (sortTerm == 'resource') return result.sort((a, b) => b.resource - a.resource);
    return result;
  },

  render() {
    return React.createElement("div", {
      className: "PlanetList"
    }, React.createElement("div", {
      className: "sorting"
    }, React.createElement("div", {
      className: cx('name', {
        selected: this.state.sort == 'name'
      }),
      onClick: () => this.setState({
        sort: 'name'
      })
    }, "name"), React.createElement("div", {
      className: cx('resource', {
        selected: this.state.sort == 'resource'
      }),
      onClick: () => this.setState({
        sort: 'resource'
      })
    }, "resource"), React.createElement("div", {
      className: cx('influence', {
        selected: this.state.sort == 'influence'
      }),
      onClick: () => this.setState({
        sort: 'influence'
      })
    }, "influ")), React.createElement("div", {
      className: cx('planets', this.props.show)
    }, this.getSorted().map(planet => {
      return React.createElement(Planet, _extends({
        key: planet.name,
        onPress: () => this.exhaust(planet.name),
        onLongPress: () => this.own(planet.name),
        exhausted: this.props.exhausted.has(planet.name),
        owned: this.props.owned.has(planet.name)
      }, planet));
    })));
  }

});
module.exports = PlanetList;
},{"../planet/planet.jsx":6,"./planetList.less":5,"classnames":undefined,"create-react-class":undefined,"react":undefined,"shared/planets.yaml":11}],5:[function(require,module,exports){
arguments[4][2][0].apply(exports,arguments)
},{"dup":2}],6:[function(require,module,exports){
require('./planet.less');

const React = require('react');

const createClass = require('create-react-class');

const cx = require('classnames');

const LongPress = require('shared/longPress.jsx');

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
    return React.createElement(LongPress, {
      className: cx('Planet', {
        exhausted,
        owned,
        unowned: !owned
      }),
      onPress: this.props.onPress,
      onLongPress: this.props.onLongPress
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
},{"./planet.less":7,"classnames":undefined,"create-react-class":undefined,"react":undefined,"shared/longPress.jsx":10}],7:[function(require,module,exports){
arguments[4][2][0].apply(exports,arguments)
},{"dup":2}],8:[function(require,module,exports){
require('./summary.less');

const React = require('react');

const createClass = require('create-react-class');

const cx = require('classnames');

const Planets = require('shared/planets.yaml');

const Summary = createClass({
  displayName: 'Summary',

  getDefaultProps() {
    return {
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
      className: "Summary"
    }, React.createElement("div", {
      className: "resource"
    }, React.createElement("label", null, "resource"), React.createElement("h2", null, count.resource), React.createElement("small", null, count.resource_total)), React.createElement("div", {
      className: "influence"
    }, React.createElement("label", null, "influence"), React.createElement("h2", null, count.influence), React.createElement("small", null, count.influence_total)));
  }

});
module.exports = Summary;
},{"./summary.less":9,"classnames":undefined,"create-react-class":undefined,"react":undefined,"shared/planets.yaml":11}],9:[function(require,module,exports){
arguments[4][2][0].apply(exports,arguments)
},{"dup":2}],10:[function(require,module,exports){
const React = require('react');

const createClass = require('create-react-class');

const LongPress = createClass({
  getDefaultProps() {
    return {
      wait: 500,
      onPress: () => {},
      onLongPress: () => {}
    };
  },

  timer: null,

  handlePress() {
    this.timer = setTimeout(() => {
      this.props.onLongPress();
      this.timer = false;
    }, this.props.wait);
  },

  handleRelease() {
    if (this.timer !== false) this.props.onPress();
    clearInterval(this.timer);
  },

  render() {
    return React.createElement("div", {
      className: this.props.className,
      onMouseDown: this.handlePress,
      onMouseUp: this.handleRelease
    }, this.props.children);
  }

});
module.exports = LongPress;
},{"create-react-class":undefined,"react":undefined}],11:[function(require,module,exports){
module.exports=[{"name":"Abyz","resource":3,"influence":0,"type":false},{"name":"Arinam","resource":1,"influence":2,"type":false},{"name":"Arnor","resource":2,"influence":1,"type":false},{"name":"Bereg","resource":3,"influence":1,"type":false},{"name":"Centauri","resource":1,"influence":3,"type":false},{"name":"Coorneeq","resource":1,"influence":2,"type":false},{"name":"Dal Bootha","resource":0,"influence":2,"type":false},{"name":"Fria","resource":2,"influence":0,"type":false},{"name":"Gral","resource":1,"influence":1,"type":"blue"},{"name":"Lazar","resource":1,"influence":0,"type":"yellow"},{"name":"Lirta IV","resource":2,"influence":3,"type":false},{"name":"Lodor + Beta","resource":3,"influence":1,"type":false},{"name":"Lor","resource":1,"influence":2,"type":false},{"name":"Mecatol Rex","resource":1,"influence":6,"type":false},{"name":"Meer","resource":0,"influence":4,"type":"red"},{"name":"Mehar Xull","resource":1,"influence":3,"type":"red"},{"name":"Mellon","resource":0,"influence":2,"type":false},{"name":"New Albion","resource":1,"influence":1,"type":"green"},{"name":"Quann + Alpha","resource":2,"influence":1,"type":false},{"name":"Qucen'n","resource":1,"influence":2,"type":false},{"name":"Rarron","resource":0,"influence":3,"type":false},{"name":"Resculon","resource":2,"influence":0,"type":false},{"name":"Sakulag","resource":2,"influence":1,"type":false},{"name":"Saudor","resource":2,"influence":2,"type":false},{"name":"Starpoint","resource":3,"influence":1,"type":false},{"name":"Tar'Mann","resource":1,"influence":1,"type":"green"},{"name":"Tequ'ran","resource":2,"influence":0,"type":false},{"name":"Thibah","resource":1,"influence":1,"type":"blue"},{"name":"Torkan","resource":0,"influence":3,"type":false},{"name":"Vefut II","resource":2,"influence":2,"type":false},{"name":"Wellon","resource":1,"influence":2,"type":"yellow"},{"name":"XXehan","resource":1,"influence":1,"type":false},{"name":"Zohbat","resource":3,"influence":1,"type":false},{"name":"Creuss","resource":4,"influence":2,"type":"home"},{"name":"Hercant","resource":1,"influence":1,"type":"home"},{"name":"Arretze","resource":2,"influence":0,"type":"home"},{"name":"Kamdorn","resource":0,"influence":1,"type":"home"},{"name":"Jol","resource":1,"influence":2,"type":"home"},{"name":"Nar","resource":2,"influence":3,"type":"home"},{"name":"[0.0.0]","resource":5,"influence":0,"type":"home"},{"name":"Arc Prime","resource":4,"influence":0,"type":"home"},{"name":"Wren Terra","resource":2,"influence":1,"type":"home"},{"name":"Moll Primus","resource":4,"influence":1,"type":"home"},{"name":"Muuat","resource":4,"influence":1,"type":"home"},{"name":"Druaa","resource":3,"influence":1,"type":"home"},{"name":"Maaluuk","resource":0,"influence":2,"type":"home"},{"name":"Mordai II","resource":4,"influence":0,"type":"home"},{"name":"Lisis II","resource":1,"influence":0,"type":"home"},{"name":"Ragh","resource":2,"influence":1,"type":"home"},{"name":"Tren'Lak","resource":1,"influence":0,"type":"home"},{"name":"Quinarra","resource":3,"influence":1,"type":"home"},{"name":"Jord","resource":4,"influence":2,"type":"home"},{"name":"Winnu","resource":3,"influence":4,"type":"home"},{"name":"Archon Wren","resource":2,"influence":3,"type":"home"},{"name":"Archon Tau","resource":1,"influence":1,"type":"home"},{"name":"Darien","resource":4,"influence":4,"type":"home"},{"name":"Retillion","resource":2,"influence":3,"type":"home"},{"name":"Shalloq","resource":1,"influence":2,"type":"home"}]
},{}]},{},[])("C:\\Dropbox\\root\\Programming\\Javascript\\ti4-planet-tracker\\client\\main\\main.jsx")
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvbWFpbi9jb250cm9scy9jb250cm9scy5qc3giLCJjbGllbnQvbWFpbi9jb250cm9scy9jb250cm9scy5sZXNzIiwiY2xpZW50L21haW4vbWFpbi5qc3giLCJjbGllbnQvbWFpbi9wbGFuZXRMaXN0L3BsYW5ldExpc3QuanN4IiwiY2xpZW50L21haW4vcGxhbmV0L3BsYW5ldC5qc3giLCJjbGllbnQvbWFpbi9zdW1tYXJ5L3N1bW1hcnkuanN4IiwiY2xpZW50L3NoYXJlZC9sb25nUHJlc3MuanN4IiwiY2xpZW50L3NoYXJlZC9wbGFuZXRzLnlhbWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwRkE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNqRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUM3RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsInJlcXVpcmUoJy4vY29udHJvbHMubGVzcycpO1xuXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IGNyZWF0ZUNsYXNzID0gcmVxdWlyZSgnY3JlYXRlLXJlYWN0LWNsYXNzJyk7XG5cbmNvbnN0IGN4ID0gcmVxdWlyZSgnY2xhc3NuYW1lcycpO1xuXG5jb25zdCBMb25nUHJlc3MgPSByZXF1aXJlKCdzaGFyZWQvbG9uZ1ByZXNzLmpzeCcpO1xuXG5jb25zdCBpc1NhbWUgPSAoc2V0QSwgc2V0QikgPT4ge1xuICBpZiAoc2V0QS5zaXplICE9PSBzZXRCLnNpemUpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIEFycmF5LmZyb20oc2V0QSkuZXZlcnkodmFsID0+IHNldEIuaGFzKHZhbCkpO1xufTtcblxuY29uc3QgQ29udHJvbHMgPSBjcmVhdGVDbGFzcyh7XG4gIGRpc3BsYXlOYW1lOiAnQ29udHJvbHMnLFxuXG4gIGdldERlZmF1bHRQcm9wcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZVZpc2libGU6ICdub3Rfb3duZWQnLFxuICAgICAgLy8nb3duZWQnLCAnYm90aCdcbiAgICAgIG9uQ2hhbmdlVmlzaWJsZTogKCkgPT4ge30sXG4gICAgICBvd25lZDogbmV3IFNldChbXSksXG4gICAgICBleGhhdXN0ZWQ6IG5ldyBTZXQoW10pLFxuICAgICAgYm9va21hcms6IG5ldyBTZXQoW10pLFxuICAgICAgdXBkYXRlRXhoYXVzdGVkOiAoKSA9PiB7fSxcbiAgICAgIHVwZGF0ZU93bmVkOiAoKSA9PiB7fSxcbiAgICAgIHVwZGF0ZUJvb2ttYXJrOiAoKSA9PiB7fVxuICAgIH07XG4gIH0sXG5cbiAgdG9nZ2xlU2hvdygpIHtcbiAgICAvLyBpZih0aGlzLnByb3BzLnR5cGVWaXNpYmxlID09ICdib3RoJykgcmV0dXJuIHRoaXMucHJvcHMub25DaGFuZ2VWaXNpYmxlKCdvd25lZCcpO1xuICAgIC8vIGlmKHRoaXMucHJvcHMudHlwZVZpc2libGUgPT0gJ293bmVkJykgcmV0dXJuIHRoaXMucHJvcHMub25DaGFuZ2VWaXNpYmxlKCdub3Rfb3duZWQnKTtcbiAgICAvLyBpZih0aGlzLnByb3BzLnR5cGVWaXNpYmxlID09ICdub3Rfb3duZWQnKSByZXR1cm4gdGhpcy5wcm9wcy5vbkNoYW5nZVZpc2libGUoJ2JvdGgnKTtcbiAgICBpZiAodGhpcy5wcm9wcy50eXBlVmlzaWJsZSA9PSAnYm90aCcpIHJldHVybiB0aGlzLnByb3BzLm9uQ2hhbmdlVmlzaWJsZSgnb3duZWQnKTtcbiAgICBpZiAodGhpcy5wcm9wcy50eXBlVmlzaWJsZSA9PSAnb3duZWQnKSByZXR1cm4gdGhpcy5wcm9wcy5vbkNoYW5nZVZpc2libGUoJ25vdF9vd25lZCcpO1xuICAgIGlmICh0aGlzLnByb3BzLnR5cGVWaXNpYmxlID09ICdub3Rfb3duZWQnKSByZXR1cm4gdGhpcy5wcm9wcy5vbkNoYW5nZVZpc2libGUoJ293bmVkJyk7XG4gIH0sXG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHRlbXAgPSBpc1NhbWUodGhpcy5wcm9wcy5leGhhdXN0ZWQsIHRoaXMucHJvcHMuYm9va21hcmspO1xuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcbiAgICAgIGNsYXNzTmFtZTogXCJDb250cm9sc1wiXG4gICAgfSwgUmVhY3QuY3JlYXRlRWxlbWVudChMb25nUHJlc3MsIHtcbiAgICAgIGNsYXNzTmFtZTogXCJyZWZyZXNoXCIsXG4gICAgICB3YWl0OiA4MDAsXG4gICAgICBvblByZXNzOiAoKSA9PiB0aGlzLnByb3BzLnVwZGF0ZUV4aGF1c3RlZChuZXcgU2V0KFtdKSksXG4gICAgICBvbkxvbmdQcmVzczogKCkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLnVwZGF0ZUV4aGF1c3RlZChuZXcgU2V0KFtdKSk7XG4gICAgICAgIHRoaXMucHJvcHMudXBkYXRlT3duZWQobmV3IFNldChbXSkpO1xuICAgICAgfVxuICAgIH0sIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpXCIsIHtcbiAgICAgIGNsYXNzTmFtZTogXCJmYSBmYS1yZWZyZXNoXCJcbiAgICB9KSksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTG9uZ1ByZXNzLCB7XG4gICAgICBjbGFzc05hbWU6IFwib3duZXJzaGlwXCIsXG4gICAgICBvblByZXNzOiB0aGlzLnRvZ2dsZVNob3csXG4gICAgICBvbkxvbmdQcmVzczogKCkgPT4gdGhpcy5wcm9wcy5vbkNoYW5nZVZpc2libGUoJ2JvdGgnKVxuICAgIH0sIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpXCIsIHtcbiAgICAgIGNsYXNzTmFtZTogY3goJ2ZhJywge1xuICAgICAgICAnZmEtY2lyY2xlJzogdGhpcy5wcm9wcy50eXBlVmlzaWJsZSA9PSAnb3duZWQnLFxuICAgICAgICAnZmEtY2lyY2xlLW8nOiB0aGlzLnByb3BzLnR5cGVWaXNpYmxlID09ICdub3Rfb3duZWQnLFxuICAgICAgICAnZmEtc3RvcC1jaXJjbGUtbyc6IHRoaXMucHJvcHMudHlwZVZpc2libGUgPT0gJ2JvdGgnXG4gICAgICB9KVxuICAgIH0pKSwgUmVhY3QuY3JlYXRlRWxlbWVudChMb25nUHJlc3MsIHtcbiAgICAgIGNsYXNzTmFtZTogXCJib29rbWFya1wiLFxuICAgICAgb25QcmVzczogKCkgPT4ge1xuICAgICAgICBjb25zdCB0ZW1wID0gdGhpcy5wcm9wcy5ib29rbWFyaztcbiAgICAgICAgdGhpcy5wcm9wcy51cGRhdGVCb29rbWFyayh0aGlzLnByb3BzLmV4aGF1c3RlZCk7XG4gICAgICAgIHRoaXMucHJvcHMudXBkYXRlRXhoYXVzdGVkKHRlbXApO1xuICAgICAgfSxcbiAgICAgIG9uTG9uZ1ByZXNzOiAoKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMudXBkYXRlQm9va21hcmsodGhpcy5wcm9wcy5leGhhdXN0ZWQpO1xuICAgICAgfVxuICAgIH0sIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpXCIsIHtcbiAgICAgIGNsYXNzTmFtZTogY3goJ2ZhJywge1xuICAgICAgICAnZmEtYm9va21hcmstbyc6IHRlbXAsXG4gICAgICAgICdmYS1ib29rbWFyayc6ICF0ZW1wXG4gICAgICB9KVxuICAgIH0pKSk7XG4gIH1cblxufSk7XG5tb2R1bGUuZXhwb3J0cyA9IENvbnRyb2xzOyIsIiIsInJlcXVpcmUoJy4vbWFpbi5sZXNzJyk7XG5cbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuY29uc3QgY3JlYXRlQ2xhc3MgPSByZXF1aXJlKCdjcmVhdGUtcmVhY3QtY2xhc3MnKTtcblxuY29uc3QgY3ggPSByZXF1aXJlKCdjbGFzc25hbWVzJyk7XG5cbmNvbnN0IENvbnRyb2xzID0gcmVxdWlyZSgnLi9jb250cm9scy9jb250cm9scy5qc3gnKTtcblxuY29uc3QgU3VtbWFyeSA9IHJlcXVpcmUoJy4vc3VtbWFyeS9zdW1tYXJ5LmpzeCcpO1xuXG5jb25zdCBQbGFuZXRMaXN0ID0gcmVxdWlyZSgnLi9wbGFuZXRMaXN0L3BsYW5ldExpc3QuanN4Jyk7XG5cbmNvbnN0IE1haW4gPSBjcmVhdGVDbGFzcyh7XG4gIGRpc3BsYXlOYW1lOiAnTWFpbicsXG5cbiAgZ2V0RGVmYXVsdFByb3BzKCkge1xuICAgIHJldHVybiB7fTtcbiAgfSxcblxuICBnZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHNob3c6ICdvd25lZCcsXG4gICAgICAvLyAnb3duZWQnLCAnbm90X293bmVkJ1xuICAgICAgZXhoYXVzdGVkOiBuZXcgU2V0KFtdKSxcbiAgICAgIG93bmVkOiBuZXcgU2V0KFtdKSxcbiAgICAgIGJvb2ttYXJrOiBuZXcgU2V0KFtdKVxuICAgIH07XG4gIH0sXG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdleGhhdXN0ZWQnKSkge1xuICAgICAgdGhpcy5zdGF0ZS5leGhhdXN0ZWQgPSBuZXcgU2V0KGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdleGhhdXN0ZWQnKS5zcGxpdCgnLCcpKTtcbiAgICB9XG5cbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ293bmVkJykpIHtcbiAgICAgIHRoaXMuc3RhdGUub3duZWQgPSBuZXcgU2V0KGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdvd25lZCcpLnNwbGl0KCcsJykpO1xuICAgIH1cblxuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYm9va21hcmsnKSkge1xuICAgICAgdGhpcy5zdGF0ZS5ib29rbWFyayA9IG5ldyBTZXQobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2Jvb2ttYXJrJykuc3BsaXQoJywnKSk7XG4gICAgfVxuXG4gICAgdGhpcy5zZXRTdGF0ZSh0aGlzLnN0YXRlKTtcbiAgfSxcblxuICB1cGRhdGVTZXQoa2V5LCB2YWwpIHtcbiAgICB0aGlzLnN0YXRlW2tleV0gPSBuZXcgU2V0KHZhbCk7XG4gICAgdGhpcy5zZXRTdGF0ZSh0aGlzLnN0YXRlLCAoKSA9PiB7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIEFycmF5LmZyb20odGhpcy5zdGF0ZVtrZXldKSk7XG4gICAgfSk7XG4gIH0sXG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcbiAgICAgIGNsYXNzTmFtZTogXCJNYWluXCJcbiAgICB9LCBSZWFjdC5jcmVhdGVFbGVtZW50KENvbnRyb2xzLCB7XG4gICAgICBvd25lZDogdGhpcy5zdGF0ZS5vd25lZCxcbiAgICAgIGV4aGF1c3RlZDogdGhpcy5zdGF0ZS5leGhhdXN0ZWQsXG4gICAgICBib29rbWFyazogdGhpcy5zdGF0ZS5ib29rbWFyayxcbiAgICAgIHVwZGF0ZUV4aGF1c3RlZDogZXhoYXVzdGVkID0+IHRoaXMudXBkYXRlU2V0KCdleGhhdXN0ZWQnLCBleGhhdXN0ZWQpLFxuICAgICAgdXBkYXRlT3duZWQ6IG93bmVkID0+IHRoaXMudXBkYXRlU2V0KCdvd25lZCcsIG93bmVkKSxcbiAgICAgIHVwZGF0ZUJvb2ttYXJrOiBib29rbWFyayA9PiB0aGlzLnVwZGF0ZVNldCgnYm9va21hcmsnLCBib29rbWFyayksXG4gICAgICB0eXBlVmlzaWJsZTogdGhpcy5zdGF0ZS5zaG93LFxuICAgICAgb25DaGFuZ2VWaXNpYmxlOiBzaG93ID0+IHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBzaG93XG4gICAgICB9KVxuICAgIH0pLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaHJcIiwgbnVsbCksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU3VtbWFyeSwge1xuICAgICAgb3duZWQ6IHRoaXMuc3RhdGUub3duZWQsXG4gICAgICBleGhhdXN0ZWQ6IHRoaXMuc3RhdGUuZXhoYXVzdGVkXG4gICAgfSksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJoclwiLCBudWxsKSwgUmVhY3QuY3JlYXRlRWxlbWVudChQbGFuZXRMaXN0LCB7XG4gICAgICB1cGRhdGVFeGhhdXN0ZWQ6IGV4aGF1c3RlZCA9PiB0aGlzLnVwZGF0ZVNldCgnZXhoYXVzdGVkJywgZXhoYXVzdGVkKSxcbiAgICAgIHVwZGF0ZU93bmVkOiBvd25lZCA9PiB0aGlzLnVwZGF0ZVNldCgnb3duZWQnLCBvd25lZCksXG4gICAgICBvd25lZDogdGhpcy5zdGF0ZS5vd25lZCxcbiAgICAgIGV4aGF1c3RlZDogdGhpcy5zdGF0ZS5leGhhdXN0ZWQsXG4gICAgICBzaG93OiB0aGlzLnN0YXRlLnNob3dcbiAgICB9KSk7XG4gIH1cblxufSk7XG5tb2R1bGUuZXhwb3J0cyA9IE1haW47IiwiZnVuY3Rpb24gX2V4dGVuZHMoKSB7IF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTsgcmV0dXJuIF9leHRlbmRzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IH1cblxucmVxdWlyZSgnLi9wbGFuZXRMaXN0Lmxlc3MnKTtcblxuY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5jb25zdCBjcmVhdGVDbGFzcyA9IHJlcXVpcmUoJ2NyZWF0ZS1yZWFjdC1jbGFzcycpO1xuXG5jb25zdCBjeCA9IHJlcXVpcmUoJ2NsYXNzbmFtZXMnKTtcblxuY29uc3QgUGxhbmV0cyA9IHJlcXVpcmUoJ3NoYXJlZC9wbGFuZXRzLnlhbWwnKTtcblxuY29uc3QgUGxhbmV0ID0gcmVxdWlyZSgnLi4vcGxhbmV0L3BsYW5ldC5qc3gnKTtcblxuY29uc3QgUGxhbmV0TGlzdCA9IGNyZWF0ZUNsYXNzKHtcbiAgZGlzcGxheU5hbWU6ICdQbGFuZXRMaXN0JyxcblxuICBnZXREZWZhdWx0UHJvcHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZUV4aGF1c3RlZDogKCkgPT4ge30sXG4gICAgICB1cGRhdGVPd25lZDogKCkgPT4ge30sXG4gICAgICBvd25lZDogbmV3IFNldChbXSksXG4gICAgICBleGhhdXN0ZWQ6IG5ldyBTZXQoW10pLFxuICAgICAgc2hvdzogJ293bmVkJ1xuICAgIH07XG4gIH0sXG5cbiAgZ2V0SW5pdGlhbFN0YXRlKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzb3J0OiAnbmFtZScgLy8naW5mbHVlbmNlJywgJ3Jlc291cmNlJ1xuXG4gICAgfTtcbiAgfSxcblxuICBleGhhdXN0KG5hbWUpIHtcbiAgICBpZiAoIXRoaXMucHJvcHMub3duZWQuaGFzKG5hbWUpKSByZXR1cm47XG4gICAgdGhpcy5wcm9wcy5leGhhdXN0ZWQuaGFzKG5hbWUpID8gdGhpcy5wcm9wcy5leGhhdXN0ZWQuZGVsZXRlKG5hbWUpIDogdGhpcy5wcm9wcy5leGhhdXN0ZWQuYWRkKG5hbWUpO1xuICAgIHRoaXMucHJvcHMudXBkYXRlRXhoYXVzdGVkKHRoaXMucHJvcHMuZXhoYXVzdGVkKTtcbiAgfSxcblxuICBvd24obmFtZSkge1xuICAgIHRoaXMucHJvcHMub3duZWQuaGFzKG5hbWUpID8gdGhpcy5wcm9wcy5vd25lZC5kZWxldGUobmFtZSkgOiB0aGlzLnByb3BzLm93bmVkLmFkZChuYW1lKTtcbiAgICB0aGlzLnByb3BzLnVwZGF0ZU93bmVkKHRoaXMucHJvcHMub3duZWQpO1xuICB9LFxuXG4gIGdldFNvcnRlZCgpIHtcbiAgICBjb25zdCBzb3J0VGVybSA9IHRoaXMuc3RhdGUuc29ydDtcbiAgICBsZXQgcmVzdWx0ID0gUGxhbmV0cy5zb3J0KChhLCBiKSA9PiBhLm5hbWUubG9jYWxlQ29tcGFyZShiLm5hbWUpKTtcbiAgICBpZiAoc29ydFRlcm0gPT0gJ2luZmx1ZW5jZScpIHJldHVybiByZXN1bHQuc29ydCgoYSwgYikgPT4gYi5pbmZsdWVuY2UgLSBhLmluZmx1ZW5jZSk7XG4gICAgaWYgKHNvcnRUZXJtID09ICdyZXNvdXJjZScpIHJldHVybiByZXN1bHQuc29ydCgoYSwgYikgPT4gYi5yZXNvdXJjZSAtIGEucmVzb3VyY2UpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH0sXG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcbiAgICAgIGNsYXNzTmFtZTogXCJQbGFuZXRMaXN0XCJcbiAgICB9LCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcbiAgICAgIGNsYXNzTmFtZTogXCJzb3J0aW5nXCJcbiAgICB9LCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcbiAgICAgIGNsYXNzTmFtZTogY3goJ25hbWUnLCB7XG4gICAgICAgIHNlbGVjdGVkOiB0aGlzLnN0YXRlLnNvcnQgPT0gJ25hbWUnXG4gICAgICB9KSxcbiAgICAgIG9uQ2xpY2s6ICgpID0+IHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBzb3J0OiAnbmFtZSdcbiAgICAgIH0pXG4gICAgfSwgXCJuYW1lXCIpLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcbiAgICAgIGNsYXNzTmFtZTogY3goJ3Jlc291cmNlJywge1xuICAgICAgICBzZWxlY3RlZDogdGhpcy5zdGF0ZS5zb3J0ID09ICdyZXNvdXJjZSdcbiAgICAgIH0pLFxuICAgICAgb25DbGljazogKCkgPT4gdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHNvcnQ6ICdyZXNvdXJjZSdcbiAgICAgIH0pXG4gICAgfSwgXCJyZXNvdXJjZVwiKSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XG4gICAgICBjbGFzc05hbWU6IGN4KCdpbmZsdWVuY2UnLCB7XG4gICAgICAgIHNlbGVjdGVkOiB0aGlzLnN0YXRlLnNvcnQgPT0gJ2luZmx1ZW5jZSdcbiAgICAgIH0pLFxuICAgICAgb25DbGljazogKCkgPT4gdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHNvcnQ6ICdpbmZsdWVuY2UnXG4gICAgICB9KVxuICAgIH0sIFwiaW5mbHVcIikpLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcbiAgICAgIGNsYXNzTmFtZTogY3goJ3BsYW5ldHMnLCB0aGlzLnByb3BzLnNob3cpXG4gICAgfSwgdGhpcy5nZXRTb3J0ZWQoKS5tYXAocGxhbmV0ID0+IHtcbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFBsYW5ldCwgX2V4dGVuZHMoe1xuICAgICAgICBrZXk6IHBsYW5ldC5uYW1lLFxuICAgICAgICBvblByZXNzOiAoKSA9PiB0aGlzLmV4aGF1c3QocGxhbmV0Lm5hbWUpLFxuICAgICAgICBvbkxvbmdQcmVzczogKCkgPT4gdGhpcy5vd24ocGxhbmV0Lm5hbWUpLFxuICAgICAgICBleGhhdXN0ZWQ6IHRoaXMucHJvcHMuZXhoYXVzdGVkLmhhcyhwbGFuZXQubmFtZSksXG4gICAgICAgIG93bmVkOiB0aGlzLnByb3BzLm93bmVkLmhhcyhwbGFuZXQubmFtZSlcbiAgICAgIH0sIHBsYW5ldCkpO1xuICAgIH0pKSk7XG4gIH1cblxufSk7XG5tb2R1bGUuZXhwb3J0cyA9IFBsYW5ldExpc3Q7IiwicmVxdWlyZSgnLi9wbGFuZXQubGVzcycpO1xuXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IGNyZWF0ZUNsYXNzID0gcmVxdWlyZSgnY3JlYXRlLXJlYWN0LWNsYXNzJyk7XG5cbmNvbnN0IGN4ID0gcmVxdWlyZSgnY2xhc3NuYW1lcycpO1xuXG5jb25zdCBMb25nUHJlc3MgPSByZXF1aXJlKCdzaGFyZWQvbG9uZ1ByZXNzLmpzeCcpO1xuXG5jb25zdCBQbGFuZXQgPSBjcmVhdGVDbGFzcyh7XG4gIGdldERlZmF1bHRQcm9wcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogJycsXG4gICAgICBleGhhdXN0ZWQ6IGZhbHNlLFxuICAgICAgb3duZWQ6IGZhbHNlLFxuICAgICAgaW5mbHVlbmNlOiAwLFxuICAgICAgcmVzb3VyY2U6IDAsXG4gICAgICB0eXBlOiBmYWxzZSxcbiAgICAgIG9uUHJlc3M6ICgpID0+IHt9LFxuICAgICAgb25Mb25nUHJlc3M6ICgpID0+IHt9XG4gICAgfTtcbiAgfSxcblxuICByZW5kZXJUeXBlKCkge1xuICAgIGlmICghdGhpcy5wcm9wcy50eXBlKSByZXR1cm4gbnVsbDtcbiAgICBjb25zdCB0eXBlcyA9IHtcbiAgICAgIGhvbWU6ICdob21lJyxcbiAgICAgIHllbGxvdzogJ2NpcmNsZScsXG4gICAgICByZWQ6ICdjaXJjbGUnLFxuICAgICAgYmx1ZTogJ2NpcmNsZScsXG4gICAgICBncmVlbjogJ2NpcmNsZSdcbiAgICB9O1xuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaVwiLCB7XG4gICAgICBjbGFzc05hbWU6IGBmYSBmYS0ke3R5cGVzW3RoaXMucHJvcHMudHlwZV19ICR7dGhpcy5wcm9wcy50eXBlfWBcbiAgICB9KTtcbiAgfSxcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgZXhoYXVzdGVkLFxuICAgICAgb3duZWRcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChMb25nUHJlc3MsIHtcbiAgICAgIGNsYXNzTmFtZTogY3goJ1BsYW5ldCcsIHtcbiAgICAgICAgZXhoYXVzdGVkLFxuICAgICAgICBvd25lZCxcbiAgICAgICAgdW5vd25lZDogIW93bmVkXG4gICAgICB9KSxcbiAgICAgIG9uUHJlc3M6IHRoaXMucHJvcHMub25QcmVzcyxcbiAgICAgIG9uTG9uZ1ByZXNzOiB0aGlzLnByb3BzLm9uTG9uZ1ByZXNzXG4gICAgfSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XG4gICAgICBjbGFzc05hbWU6IFwibmFtZVwiXG4gICAgfSwgdGhpcy5wcm9wcy5uYW1lLCB0aGlzLnJlbmRlclR5cGUoKSksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1xuICAgICAgY2xhc3NOYW1lOiBcInJlc291cmNlXCJcbiAgICB9LCB0aGlzLnByb3BzLnJlc291cmNlKSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XG4gICAgICBjbGFzc05hbWU6IFwiaW5mbHVlbmNlXCJcbiAgICB9LCB0aGlzLnByb3BzLmluZmx1ZW5jZSkpO1xuICB9XG5cbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBQbGFuZXQ7IiwicmVxdWlyZSgnLi9zdW1tYXJ5Lmxlc3MnKTtcblxuY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5jb25zdCBjcmVhdGVDbGFzcyA9IHJlcXVpcmUoJ2NyZWF0ZS1yZWFjdC1jbGFzcycpO1xuXG5jb25zdCBjeCA9IHJlcXVpcmUoJ2NsYXNzbmFtZXMnKTtcblxuY29uc3QgUGxhbmV0cyA9IHJlcXVpcmUoJ3NoYXJlZC9wbGFuZXRzLnlhbWwnKTtcblxuY29uc3QgU3VtbWFyeSA9IGNyZWF0ZUNsYXNzKHtcbiAgZGlzcGxheU5hbWU6ICdTdW1tYXJ5JyxcblxuICBnZXREZWZhdWx0UHJvcHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG93bmVkOiBuZXcgU2V0KFtdKSxcbiAgICAgIGV4aGF1c3RlZDogbmV3IFNldChbXSlcbiAgICB9O1xuICB9LFxuXG4gIGdldFN1bSgpIHtcbiAgICBjb25zdCBvd25lZCA9IFBsYW5ldHMuZmlsdGVyKHBsYW5ldCA9PiB0aGlzLnByb3BzLm93bmVkLmhhcyhwbGFuZXQubmFtZSkpO1xuICAgIHJldHVybiBvd25lZC5yZWR1Y2UoKGFjYywgcGxhbmV0KSA9PiB7XG4gICAgICBhY2MuaW5mbHVlbmNlX3RvdGFsICs9IHBsYW5ldC5pbmZsdWVuY2U7XG4gICAgICBhY2MucmVzb3VyY2VfdG90YWwgKz0gcGxhbmV0LnJlc291cmNlO1xuXG4gICAgICBpZiAoIXRoaXMucHJvcHMuZXhoYXVzdGVkLmhhcyhwbGFuZXQubmFtZSkpIHtcbiAgICAgICAgYWNjLmluZmx1ZW5jZSArPSBwbGFuZXQuaW5mbHVlbmNlO1xuICAgICAgICBhY2MucmVzb3VyY2UgKz0gcGxhbmV0LnJlc291cmNlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHtcbiAgICAgIGluZmx1ZW5jZTogMCxcbiAgICAgIGluZmx1ZW5jZV90b3RhbDogMCxcbiAgICAgIHJlc291cmNlOiAwLFxuICAgICAgcmVzb3VyY2VfdG90YWw6IDBcbiAgICB9KTtcbiAgfSxcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgY291bnQgPSB0aGlzLmdldFN1bSgpO1xuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcbiAgICAgIGNsYXNzTmFtZTogXCJTdW1tYXJ5XCJcbiAgICB9LCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcbiAgICAgIGNsYXNzTmFtZTogXCJyZXNvdXJjZVwiXG4gICAgfSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIG51bGwsIFwicmVzb3VyY2VcIiksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJoMlwiLCBudWxsLCBjb3VudC5yZXNvdXJjZSksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzbWFsbFwiLCBudWxsLCBjb3VudC5yZXNvdXJjZV90b3RhbCkpLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcbiAgICAgIGNsYXNzTmFtZTogXCJpbmZsdWVuY2VcIlxuICAgIH0sIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCBudWxsLCBcImluZmx1ZW5jZVwiKSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImgyXCIsIG51bGwsIGNvdW50LmluZmx1ZW5jZSksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzbWFsbFwiLCBudWxsLCBjb3VudC5pbmZsdWVuY2VfdG90YWwpKSk7XG4gIH1cblxufSk7XG5tb2R1bGUuZXhwb3J0cyA9IFN1bW1hcnk7IiwiY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5jb25zdCBjcmVhdGVDbGFzcyA9IHJlcXVpcmUoJ2NyZWF0ZS1yZWFjdC1jbGFzcycpO1xuXG5jb25zdCBMb25nUHJlc3MgPSBjcmVhdGVDbGFzcyh7XG4gIGdldERlZmF1bHRQcm9wcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgd2FpdDogNTAwLFxuICAgICAgb25QcmVzczogKCkgPT4ge30sXG4gICAgICBvbkxvbmdQcmVzczogKCkgPT4ge31cbiAgICB9O1xuICB9LFxuXG4gIHRpbWVyOiBudWxsLFxuXG4gIGhhbmRsZVByZXNzKCkge1xuICAgIHRoaXMudGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMucHJvcHMub25Mb25nUHJlc3MoKTtcbiAgICAgIHRoaXMudGltZXIgPSBmYWxzZTtcbiAgICB9LCB0aGlzLnByb3BzLndhaXQpO1xuICB9LFxuXG4gIGhhbmRsZVJlbGVhc2UoKSB7XG4gICAgaWYgKHRoaXMudGltZXIgIT09IGZhbHNlKSB0aGlzLnByb3BzLm9uUHJlc3MoKTtcbiAgICBjbGVhckludGVydmFsKHRoaXMudGltZXIpO1xuICB9LFxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XG4gICAgICBjbGFzc05hbWU6IHRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgb25Nb3VzZURvd246IHRoaXMuaGFuZGxlUHJlc3MsXG4gICAgICBvbk1vdXNlVXA6IHRoaXMuaGFuZGxlUmVsZWFzZVxuICAgIH0sIHRoaXMucHJvcHMuY2hpbGRyZW4pO1xuICB9XG5cbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBMb25nUHJlc3M7IiwibW9kdWxlLmV4cG9ydHM9W3tcIm5hbWVcIjpcIkFieXpcIixcInJlc291cmNlXCI6MyxcImluZmx1ZW5jZVwiOjAsXCJ0eXBlXCI6ZmFsc2V9LHtcIm5hbWVcIjpcIkFyaW5hbVwiLFwicmVzb3VyY2VcIjoxLFwiaW5mbHVlbmNlXCI6MixcInR5cGVcIjpmYWxzZX0se1wibmFtZVwiOlwiQXJub3JcIixcInJlc291cmNlXCI6MixcImluZmx1ZW5jZVwiOjEsXCJ0eXBlXCI6ZmFsc2V9LHtcIm5hbWVcIjpcIkJlcmVnXCIsXCJyZXNvdXJjZVwiOjMsXCJpbmZsdWVuY2VcIjoxLFwidHlwZVwiOmZhbHNlfSx7XCJuYW1lXCI6XCJDZW50YXVyaVwiLFwicmVzb3VyY2VcIjoxLFwiaW5mbHVlbmNlXCI6MyxcInR5cGVcIjpmYWxzZX0se1wibmFtZVwiOlwiQ29vcm5lZXFcIixcInJlc291cmNlXCI6MSxcImluZmx1ZW5jZVwiOjIsXCJ0eXBlXCI6ZmFsc2V9LHtcIm5hbWVcIjpcIkRhbCBCb290aGFcIixcInJlc291cmNlXCI6MCxcImluZmx1ZW5jZVwiOjIsXCJ0eXBlXCI6ZmFsc2V9LHtcIm5hbWVcIjpcIkZyaWFcIixcInJlc291cmNlXCI6MixcImluZmx1ZW5jZVwiOjAsXCJ0eXBlXCI6ZmFsc2V9LHtcIm5hbWVcIjpcIkdyYWxcIixcInJlc291cmNlXCI6MSxcImluZmx1ZW5jZVwiOjEsXCJ0eXBlXCI6XCJibHVlXCJ9LHtcIm5hbWVcIjpcIkxhemFyXCIsXCJyZXNvdXJjZVwiOjEsXCJpbmZsdWVuY2VcIjowLFwidHlwZVwiOlwieWVsbG93XCJ9LHtcIm5hbWVcIjpcIkxpcnRhIElWXCIsXCJyZXNvdXJjZVwiOjIsXCJpbmZsdWVuY2VcIjozLFwidHlwZVwiOmZhbHNlfSx7XCJuYW1lXCI6XCJMb2RvciArIEJldGFcIixcInJlc291cmNlXCI6MyxcImluZmx1ZW5jZVwiOjEsXCJ0eXBlXCI6ZmFsc2V9LHtcIm5hbWVcIjpcIkxvclwiLFwicmVzb3VyY2VcIjoxLFwiaW5mbHVlbmNlXCI6MixcInR5cGVcIjpmYWxzZX0se1wibmFtZVwiOlwiTWVjYXRvbCBSZXhcIixcInJlc291cmNlXCI6MSxcImluZmx1ZW5jZVwiOjYsXCJ0eXBlXCI6ZmFsc2V9LHtcIm5hbWVcIjpcIk1lZXJcIixcInJlc291cmNlXCI6MCxcImluZmx1ZW5jZVwiOjQsXCJ0eXBlXCI6XCJyZWRcIn0se1wibmFtZVwiOlwiTWVoYXIgWHVsbFwiLFwicmVzb3VyY2VcIjoxLFwiaW5mbHVlbmNlXCI6MyxcInR5cGVcIjpcInJlZFwifSx7XCJuYW1lXCI6XCJNZWxsb25cIixcInJlc291cmNlXCI6MCxcImluZmx1ZW5jZVwiOjIsXCJ0eXBlXCI6ZmFsc2V9LHtcIm5hbWVcIjpcIk5ldyBBbGJpb25cIixcInJlc291cmNlXCI6MSxcImluZmx1ZW5jZVwiOjEsXCJ0eXBlXCI6XCJncmVlblwifSx7XCJuYW1lXCI6XCJRdWFubiArIEFscGhhXCIsXCJyZXNvdXJjZVwiOjIsXCJpbmZsdWVuY2VcIjoxLFwidHlwZVwiOmZhbHNlfSx7XCJuYW1lXCI6XCJRdWNlbiduXCIsXCJyZXNvdXJjZVwiOjEsXCJpbmZsdWVuY2VcIjoyLFwidHlwZVwiOmZhbHNlfSx7XCJuYW1lXCI6XCJSYXJyb25cIixcInJlc291cmNlXCI6MCxcImluZmx1ZW5jZVwiOjMsXCJ0eXBlXCI6ZmFsc2V9LHtcIm5hbWVcIjpcIlJlc2N1bG9uXCIsXCJyZXNvdXJjZVwiOjIsXCJpbmZsdWVuY2VcIjowLFwidHlwZVwiOmZhbHNlfSx7XCJuYW1lXCI6XCJTYWt1bGFnXCIsXCJyZXNvdXJjZVwiOjIsXCJpbmZsdWVuY2VcIjoxLFwidHlwZVwiOmZhbHNlfSx7XCJuYW1lXCI6XCJTYXVkb3JcIixcInJlc291cmNlXCI6MixcImluZmx1ZW5jZVwiOjIsXCJ0eXBlXCI6ZmFsc2V9LHtcIm5hbWVcIjpcIlN0YXJwb2ludFwiLFwicmVzb3VyY2VcIjozLFwiaW5mbHVlbmNlXCI6MSxcInR5cGVcIjpmYWxzZX0se1wibmFtZVwiOlwiVGFyJ01hbm5cIixcInJlc291cmNlXCI6MSxcImluZmx1ZW5jZVwiOjEsXCJ0eXBlXCI6XCJncmVlblwifSx7XCJuYW1lXCI6XCJUZXF1J3JhblwiLFwicmVzb3VyY2VcIjoyLFwiaW5mbHVlbmNlXCI6MCxcInR5cGVcIjpmYWxzZX0se1wibmFtZVwiOlwiVGhpYmFoXCIsXCJyZXNvdXJjZVwiOjEsXCJpbmZsdWVuY2VcIjoxLFwidHlwZVwiOlwiYmx1ZVwifSx7XCJuYW1lXCI6XCJUb3JrYW5cIixcInJlc291cmNlXCI6MCxcImluZmx1ZW5jZVwiOjMsXCJ0eXBlXCI6ZmFsc2V9LHtcIm5hbWVcIjpcIlZlZnV0IElJXCIsXCJyZXNvdXJjZVwiOjIsXCJpbmZsdWVuY2VcIjoyLFwidHlwZVwiOmZhbHNlfSx7XCJuYW1lXCI6XCJXZWxsb25cIixcInJlc291cmNlXCI6MSxcImluZmx1ZW5jZVwiOjIsXCJ0eXBlXCI6XCJ5ZWxsb3dcIn0se1wibmFtZVwiOlwiWFhlaGFuXCIsXCJyZXNvdXJjZVwiOjEsXCJpbmZsdWVuY2VcIjoxLFwidHlwZVwiOmZhbHNlfSx7XCJuYW1lXCI6XCJab2hiYXRcIixcInJlc291cmNlXCI6MyxcImluZmx1ZW5jZVwiOjEsXCJ0eXBlXCI6ZmFsc2V9LHtcIm5hbWVcIjpcIkNyZXVzc1wiLFwicmVzb3VyY2VcIjo0LFwiaW5mbHVlbmNlXCI6MixcInR5cGVcIjpcImhvbWVcIn0se1wibmFtZVwiOlwiSGVyY2FudFwiLFwicmVzb3VyY2VcIjoxLFwiaW5mbHVlbmNlXCI6MSxcInR5cGVcIjpcImhvbWVcIn0se1wibmFtZVwiOlwiQXJyZXR6ZVwiLFwicmVzb3VyY2VcIjoyLFwiaW5mbHVlbmNlXCI6MCxcInR5cGVcIjpcImhvbWVcIn0se1wibmFtZVwiOlwiS2FtZG9yblwiLFwicmVzb3VyY2VcIjowLFwiaW5mbHVlbmNlXCI6MSxcInR5cGVcIjpcImhvbWVcIn0se1wibmFtZVwiOlwiSm9sXCIsXCJyZXNvdXJjZVwiOjEsXCJpbmZsdWVuY2VcIjoyLFwidHlwZVwiOlwiaG9tZVwifSx7XCJuYW1lXCI6XCJOYXJcIixcInJlc291cmNlXCI6MixcImluZmx1ZW5jZVwiOjMsXCJ0eXBlXCI6XCJob21lXCJ9LHtcIm5hbWVcIjpcIlswLjAuMF1cIixcInJlc291cmNlXCI6NSxcImluZmx1ZW5jZVwiOjAsXCJ0eXBlXCI6XCJob21lXCJ9LHtcIm5hbWVcIjpcIkFyYyBQcmltZVwiLFwicmVzb3VyY2VcIjo0LFwiaW5mbHVlbmNlXCI6MCxcInR5cGVcIjpcImhvbWVcIn0se1wibmFtZVwiOlwiV3JlbiBUZXJyYVwiLFwicmVzb3VyY2VcIjoyLFwiaW5mbHVlbmNlXCI6MSxcInR5cGVcIjpcImhvbWVcIn0se1wibmFtZVwiOlwiTW9sbCBQcmltdXNcIixcInJlc291cmNlXCI6NCxcImluZmx1ZW5jZVwiOjEsXCJ0eXBlXCI6XCJob21lXCJ9LHtcIm5hbWVcIjpcIk11dWF0XCIsXCJyZXNvdXJjZVwiOjQsXCJpbmZsdWVuY2VcIjoxLFwidHlwZVwiOlwiaG9tZVwifSx7XCJuYW1lXCI6XCJEcnVhYVwiLFwicmVzb3VyY2VcIjozLFwiaW5mbHVlbmNlXCI6MSxcInR5cGVcIjpcImhvbWVcIn0se1wibmFtZVwiOlwiTWFhbHV1a1wiLFwicmVzb3VyY2VcIjowLFwiaW5mbHVlbmNlXCI6MixcInR5cGVcIjpcImhvbWVcIn0se1wibmFtZVwiOlwiTW9yZGFpIElJXCIsXCJyZXNvdXJjZVwiOjQsXCJpbmZsdWVuY2VcIjowLFwidHlwZVwiOlwiaG9tZVwifSx7XCJuYW1lXCI6XCJMaXNpcyBJSVwiLFwicmVzb3VyY2VcIjoxLFwiaW5mbHVlbmNlXCI6MCxcInR5cGVcIjpcImhvbWVcIn0se1wibmFtZVwiOlwiUmFnaFwiLFwicmVzb3VyY2VcIjoyLFwiaW5mbHVlbmNlXCI6MSxcInR5cGVcIjpcImhvbWVcIn0se1wibmFtZVwiOlwiVHJlbidMYWtcIixcInJlc291cmNlXCI6MSxcImluZmx1ZW5jZVwiOjAsXCJ0eXBlXCI6XCJob21lXCJ9LHtcIm5hbWVcIjpcIlF1aW5hcnJhXCIsXCJyZXNvdXJjZVwiOjMsXCJpbmZsdWVuY2VcIjoxLFwidHlwZVwiOlwiaG9tZVwifSx7XCJuYW1lXCI6XCJKb3JkXCIsXCJyZXNvdXJjZVwiOjQsXCJpbmZsdWVuY2VcIjoyLFwidHlwZVwiOlwiaG9tZVwifSx7XCJuYW1lXCI6XCJXaW5udVwiLFwicmVzb3VyY2VcIjozLFwiaW5mbHVlbmNlXCI6NCxcInR5cGVcIjpcImhvbWVcIn0se1wibmFtZVwiOlwiQXJjaG9uIFdyZW5cIixcInJlc291cmNlXCI6MixcImluZmx1ZW5jZVwiOjMsXCJ0eXBlXCI6XCJob21lXCJ9LHtcIm5hbWVcIjpcIkFyY2hvbiBUYXVcIixcInJlc291cmNlXCI6MSxcImluZmx1ZW5jZVwiOjEsXCJ0eXBlXCI6XCJob21lXCJ9LHtcIm5hbWVcIjpcIkRhcmllblwiLFwicmVzb3VyY2VcIjo0LFwiaW5mbHVlbmNlXCI6NCxcInR5cGVcIjpcImhvbWVcIn0se1wibmFtZVwiOlwiUmV0aWxsaW9uXCIsXCJyZXNvdXJjZVwiOjIsXCJpbmZsdWVuY2VcIjozLFwidHlwZVwiOlwiaG9tZVwifSx7XCJuYW1lXCI6XCJTaGFsbG9xXCIsXCJyZXNvdXJjZVwiOjEsXCJpbmZsdWVuY2VcIjoyLFwidHlwZVwiOlwiaG9tZVwifV0iXX0=
