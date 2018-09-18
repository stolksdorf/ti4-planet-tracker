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
      className: "btn refresh",
      wait: 800,
      onPress: () => this.props.updateExhausted(new Set([])),
      onLongPress: () => {
        this.props.updateExhausted(new Set([]));
        this.props.updateOwned(new Set([]));
      }
    }, React.createElement("i", {
      className: "fa fa-refresh"
    })), React.createElement(LongPress, {
      className: "btn ownership",
      onPress: this.toggleShow,
      onLongPress: () => this.props.onChangeVisible('both')
    }, React.createElement("i", {
      className: cx('fa', {
        'fa-circle': this.props.typeVisible == 'owned',
        'fa-circle-o': this.props.typeVisible == 'not_owned',
        'fa-stop-circle-o': this.props.typeVisible == 'both'
      })
    })), React.createElement(LongPress, {
      className: "btn bookmark",
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
    }), React.createElement(Summary, {
      owned: this.state.owned,
      exhausted: this.state.exhausted
    }), React.createElement(PlanetList, {
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
require('C:\\Dropbox\\root\\Programming\\Javascript\\ti4-planet-tracker\\client\\shared\\reset.less');
},{"C:\\Dropbox\\root\\Programming\\Javascript\\ti4-planet-tracker\\client\\shared\\reset.less":12}],4:[function(require,module,exports){
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
    if (this.props.owned.has(name)) {
      this.props.owned.delete(name);
      this.props.exhausted.delete(name);
      this.props.updateExhausted(this.props.exhausted);
    } else {
      this.props.owned.add(name);
    }

    this.props.updateOwned(this.props.owned);
  },

  getSorted() {
    const sortTerm = this.state.sort;
    const result = Planets.sort((a, b) => a.name.localeCompare(b.name));
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
    }, React.createElement("i", {
      className: "fa fa-cubes"
    })), React.createElement("div", {
      className: cx('influence', {
        selected: this.state.sort == 'influence'
      }),
      onClick: () => this.setState({
        sort: 'influence'
      })
    }, React.createElement("i", {
      className: "fa fa-gg"
    }))), React.createElement("div", {
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
    }, React.createElement("label", null, "resource"), React.createElement("h2", null, count.resource), React.createElement("small", null, count.resource_total), React.createElement("i", {
      className: "fa fa-cubes"
    })), React.createElement("div", {
      className: "influence"
    }, React.createElement("label", null, "influence"), React.createElement("h2", null, count.influence), React.createElement("small", null, count.influence_total), React.createElement("i", {
      className: "fa fa-gg"
    })));
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
},{}],12:[function(require,module,exports){
arguments[4][2][0].apply(exports,arguments)
},{"dup":2}]},{},[])("C:\\Dropbox\\root\\Programming\\Javascript\\ti4-planet-tracker\\client\\main\\main.jsx")
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvbWFpbi9jb250cm9scy9jb250cm9scy5qc3giLCJjbGllbnQvbWFpbi9jb250cm9scy9jb250cm9scy5sZXNzIiwiY2xpZW50L21haW4vbWFpbi5qc3giLCJjbGllbnQvbWFpbi9tYWluLmxlc3MiLCJjbGllbnQvbWFpbi9wbGFuZXRMaXN0L3BsYW5ldExpc3QuanN4IiwiY2xpZW50L21haW4vcGxhbmV0L3BsYW5ldC5qc3giLCJjbGllbnQvbWFpbi9zdW1tYXJ5L3N1bW1hcnkuanN4IiwiY2xpZW50L3NoYXJlZC9sb25nUHJlc3MuanN4IiwiY2xpZW50L3NoYXJlZC9wbGFuZXRzLnlhbWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwRkE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakZBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3hHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDN0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJyZXF1aXJlKCcuL2NvbnRyb2xzLmxlc3MnKTtcblxuY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5jb25zdCBjcmVhdGVDbGFzcyA9IHJlcXVpcmUoJ2NyZWF0ZS1yZWFjdC1jbGFzcycpO1xuXG5jb25zdCBjeCA9IHJlcXVpcmUoJ2NsYXNzbmFtZXMnKTtcblxuY29uc3QgTG9uZ1ByZXNzID0gcmVxdWlyZSgnc2hhcmVkL2xvbmdQcmVzcy5qc3gnKTtcblxuY29uc3QgaXNTYW1lID0gKHNldEEsIHNldEIpID0+IHtcbiAgaWYgKHNldEEuc2l6ZSAhPT0gc2V0Qi5zaXplKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiBBcnJheS5mcm9tKHNldEEpLmV2ZXJ5KHZhbCA9PiBzZXRCLmhhcyh2YWwpKTtcbn07XG5cbmNvbnN0IENvbnRyb2xzID0gY3JlYXRlQ2xhc3Moe1xuICBkaXNwbGF5TmFtZTogJ0NvbnRyb2xzJyxcblxuICBnZXREZWZhdWx0UHJvcHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGVWaXNpYmxlOiAnbm90X293bmVkJyxcbiAgICAgIC8vJ293bmVkJywgJ2JvdGgnXG4gICAgICBvbkNoYW5nZVZpc2libGU6ICgpID0+IHt9LFxuICAgICAgb3duZWQ6IG5ldyBTZXQoW10pLFxuICAgICAgZXhoYXVzdGVkOiBuZXcgU2V0KFtdKSxcbiAgICAgIGJvb2ttYXJrOiBuZXcgU2V0KFtdKSxcbiAgICAgIHVwZGF0ZUV4aGF1c3RlZDogKCkgPT4ge30sXG4gICAgICB1cGRhdGVPd25lZDogKCkgPT4ge30sXG4gICAgICB1cGRhdGVCb29rbWFyazogKCkgPT4ge31cbiAgICB9O1xuICB9LFxuXG4gIHRvZ2dsZVNob3coKSB7XG4gICAgLy8gaWYodGhpcy5wcm9wcy50eXBlVmlzaWJsZSA9PSAnYm90aCcpIHJldHVybiB0aGlzLnByb3BzLm9uQ2hhbmdlVmlzaWJsZSgnb3duZWQnKTtcbiAgICAvLyBpZih0aGlzLnByb3BzLnR5cGVWaXNpYmxlID09ICdvd25lZCcpIHJldHVybiB0aGlzLnByb3BzLm9uQ2hhbmdlVmlzaWJsZSgnbm90X293bmVkJyk7XG4gICAgLy8gaWYodGhpcy5wcm9wcy50eXBlVmlzaWJsZSA9PSAnbm90X293bmVkJykgcmV0dXJuIHRoaXMucHJvcHMub25DaGFuZ2VWaXNpYmxlKCdib3RoJyk7XG4gICAgaWYgKHRoaXMucHJvcHMudHlwZVZpc2libGUgPT0gJ2JvdGgnKSByZXR1cm4gdGhpcy5wcm9wcy5vbkNoYW5nZVZpc2libGUoJ293bmVkJyk7XG4gICAgaWYgKHRoaXMucHJvcHMudHlwZVZpc2libGUgPT0gJ293bmVkJykgcmV0dXJuIHRoaXMucHJvcHMub25DaGFuZ2VWaXNpYmxlKCdub3Rfb3duZWQnKTtcbiAgICBpZiAodGhpcy5wcm9wcy50eXBlVmlzaWJsZSA9PSAnbm90X293bmVkJykgcmV0dXJuIHRoaXMucHJvcHMub25DaGFuZ2VWaXNpYmxlKCdvd25lZCcpO1xuICB9LFxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB0ZW1wID0gaXNTYW1lKHRoaXMucHJvcHMuZXhoYXVzdGVkLCB0aGlzLnByb3BzLmJvb2ttYXJrKTtcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XG4gICAgICBjbGFzc05hbWU6IFwiQ29udHJvbHNcIlxuICAgIH0sIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTG9uZ1ByZXNzLCB7XG4gICAgICBjbGFzc05hbWU6IFwiYnRuIHJlZnJlc2hcIixcbiAgICAgIHdhaXQ6IDgwMCxcbiAgICAgIG9uUHJlc3M6ICgpID0+IHRoaXMucHJvcHMudXBkYXRlRXhoYXVzdGVkKG5ldyBTZXQoW10pKSxcbiAgICAgIG9uTG9uZ1ByZXNzOiAoKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMudXBkYXRlRXhoYXVzdGVkKG5ldyBTZXQoW10pKTtcbiAgICAgICAgdGhpcy5wcm9wcy51cGRhdGVPd25lZChuZXcgU2V0KFtdKSk7XG4gICAgICB9XG4gICAgfSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImlcIiwge1xuICAgICAgY2xhc3NOYW1lOiBcImZhIGZhLXJlZnJlc2hcIlxuICAgIH0pKSwgUmVhY3QuY3JlYXRlRWxlbWVudChMb25nUHJlc3MsIHtcbiAgICAgIGNsYXNzTmFtZTogXCJidG4gb3duZXJzaGlwXCIsXG4gICAgICBvblByZXNzOiB0aGlzLnRvZ2dsZVNob3csXG4gICAgICBvbkxvbmdQcmVzczogKCkgPT4gdGhpcy5wcm9wcy5vbkNoYW5nZVZpc2libGUoJ2JvdGgnKVxuICAgIH0sIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpXCIsIHtcbiAgICAgIGNsYXNzTmFtZTogY3goJ2ZhJywge1xuICAgICAgICAnZmEtY2lyY2xlJzogdGhpcy5wcm9wcy50eXBlVmlzaWJsZSA9PSAnb3duZWQnLFxuICAgICAgICAnZmEtY2lyY2xlLW8nOiB0aGlzLnByb3BzLnR5cGVWaXNpYmxlID09ICdub3Rfb3duZWQnLFxuICAgICAgICAnZmEtc3RvcC1jaXJjbGUtbyc6IHRoaXMucHJvcHMudHlwZVZpc2libGUgPT0gJ2JvdGgnXG4gICAgICB9KVxuICAgIH0pKSwgUmVhY3QuY3JlYXRlRWxlbWVudChMb25nUHJlc3MsIHtcbiAgICAgIGNsYXNzTmFtZTogXCJidG4gYm9va21hcmtcIixcbiAgICAgIG9uUHJlc3M6ICgpID0+IHtcbiAgICAgICAgY29uc3QgdGVtcCA9IHRoaXMucHJvcHMuYm9va21hcms7XG4gICAgICAgIHRoaXMucHJvcHMudXBkYXRlQm9va21hcmsodGhpcy5wcm9wcy5leGhhdXN0ZWQpO1xuICAgICAgICB0aGlzLnByb3BzLnVwZGF0ZUV4aGF1c3RlZCh0ZW1wKTtcbiAgICAgIH0sXG4gICAgICBvbkxvbmdQcmVzczogKCkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLnVwZGF0ZUJvb2ttYXJrKHRoaXMucHJvcHMuZXhoYXVzdGVkKTtcbiAgICAgIH1cbiAgICB9LCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaVwiLCB7XG4gICAgICBjbGFzc05hbWU6IGN4KCdmYScsIHtcbiAgICAgICAgJ2ZhLWJvb2ttYXJrLW8nOiB0ZW1wLFxuICAgICAgICAnZmEtYm9va21hcmsnOiAhdGVtcFxuICAgICAgfSlcbiAgICB9KSkpO1xuICB9XG5cbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBDb250cm9sczsiLCIiLCJyZXF1aXJlKCcuL21haW4ubGVzcycpO1xuXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IGNyZWF0ZUNsYXNzID0gcmVxdWlyZSgnY3JlYXRlLXJlYWN0LWNsYXNzJyk7XG5cbmNvbnN0IGN4ID0gcmVxdWlyZSgnY2xhc3NuYW1lcycpO1xuXG5jb25zdCBDb250cm9scyA9IHJlcXVpcmUoJy4vY29udHJvbHMvY29udHJvbHMuanN4Jyk7XG5cbmNvbnN0IFN1bW1hcnkgPSByZXF1aXJlKCcuL3N1bW1hcnkvc3VtbWFyeS5qc3gnKTtcblxuY29uc3QgUGxhbmV0TGlzdCA9IHJlcXVpcmUoJy4vcGxhbmV0TGlzdC9wbGFuZXRMaXN0LmpzeCcpO1xuXG5jb25zdCBNYWluID0gY3JlYXRlQ2xhc3Moe1xuICBkaXNwbGF5TmFtZTogJ01haW4nLFxuXG4gIGdldERlZmF1bHRQcm9wcygpIHtcbiAgICByZXR1cm4ge307XG4gIH0sXG5cbiAgZ2V0SW5pdGlhbFN0YXRlKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzaG93OiAnb3duZWQnLFxuICAgICAgLy8gJ293bmVkJywgJ25vdF9vd25lZCdcbiAgICAgIGV4aGF1c3RlZDogbmV3IFNldChbXSksXG4gICAgICBvd25lZDogbmV3IFNldChbXSksXG4gICAgICBib29rbWFyazogbmV3IFNldChbXSlcbiAgICB9O1xuICB9LFxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZXhoYXVzdGVkJykpIHtcbiAgICAgIHRoaXMuc3RhdGUuZXhoYXVzdGVkID0gbmV3IFNldChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZXhoYXVzdGVkJykuc3BsaXQoJywnKSk7XG4gICAgfVxuXG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdvd25lZCcpKSB7XG4gICAgICB0aGlzLnN0YXRlLm93bmVkID0gbmV3IFNldChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnb3duZWQnKS5zcGxpdCgnLCcpKTtcbiAgICB9XG5cbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2Jvb2ttYXJrJykpIHtcbiAgICAgIHRoaXMuc3RhdGUuYm9va21hcmsgPSBuZXcgU2V0KGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdib29rbWFyaycpLnNwbGl0KCcsJykpO1xuICAgIH1cblxuICAgIHRoaXMuc2V0U3RhdGUodGhpcy5zdGF0ZSk7XG4gIH0sXG5cbiAgdXBkYXRlU2V0KGtleSwgdmFsKSB7XG4gICAgdGhpcy5zdGF0ZVtrZXldID0gbmV3IFNldCh2YWwpO1xuICAgIHRoaXMuc2V0U3RhdGUodGhpcy5zdGF0ZSwgKCkgPT4ge1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBBcnJheS5mcm9tKHRoaXMuc3RhdGVba2V5XSkpO1xuICAgIH0pO1xuICB9LFxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XG4gICAgICBjbGFzc05hbWU6IFwiTWFpblwiXG4gICAgfSwgUmVhY3QuY3JlYXRlRWxlbWVudChDb250cm9scywge1xuICAgICAgb3duZWQ6IHRoaXMuc3RhdGUub3duZWQsXG4gICAgICBleGhhdXN0ZWQ6IHRoaXMuc3RhdGUuZXhoYXVzdGVkLFxuICAgICAgYm9va21hcms6IHRoaXMuc3RhdGUuYm9va21hcmssXG4gICAgICB1cGRhdGVFeGhhdXN0ZWQ6IGV4aGF1c3RlZCA9PiB0aGlzLnVwZGF0ZVNldCgnZXhoYXVzdGVkJywgZXhoYXVzdGVkKSxcbiAgICAgIHVwZGF0ZU93bmVkOiBvd25lZCA9PiB0aGlzLnVwZGF0ZVNldCgnb3duZWQnLCBvd25lZCksXG4gICAgICB1cGRhdGVCb29rbWFyazogYm9va21hcmsgPT4gdGhpcy51cGRhdGVTZXQoJ2Jvb2ttYXJrJywgYm9va21hcmspLFxuICAgICAgdHlwZVZpc2libGU6IHRoaXMuc3RhdGUuc2hvdyxcbiAgICAgIG9uQ2hhbmdlVmlzaWJsZTogc2hvdyA9PiB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgc2hvd1xuICAgICAgfSlcbiAgICB9KSwgUmVhY3QuY3JlYXRlRWxlbWVudChTdW1tYXJ5LCB7XG4gICAgICBvd25lZDogdGhpcy5zdGF0ZS5vd25lZCxcbiAgICAgIGV4aGF1c3RlZDogdGhpcy5zdGF0ZS5leGhhdXN0ZWRcbiAgICB9KSwgUmVhY3QuY3JlYXRlRWxlbWVudChQbGFuZXRMaXN0LCB7XG4gICAgICB1cGRhdGVFeGhhdXN0ZWQ6IGV4aGF1c3RlZCA9PiB0aGlzLnVwZGF0ZVNldCgnZXhoYXVzdGVkJywgZXhoYXVzdGVkKSxcbiAgICAgIHVwZGF0ZU93bmVkOiBvd25lZCA9PiB0aGlzLnVwZGF0ZVNldCgnb3duZWQnLCBvd25lZCksXG4gICAgICBvd25lZDogdGhpcy5zdGF0ZS5vd25lZCxcbiAgICAgIGV4aGF1c3RlZDogdGhpcy5zdGF0ZS5leGhhdXN0ZWQsXG4gICAgICBzaG93OiB0aGlzLnN0YXRlLnNob3dcbiAgICB9KSk7XG4gIH1cblxufSk7XG5tb2R1bGUuZXhwb3J0cyA9IE1haW47IiwicmVxdWlyZSgnQzpcXFxcRHJvcGJveFxcXFxyb290XFxcXFByb2dyYW1taW5nXFxcXEphdmFzY3JpcHRcXFxcdGk0LXBsYW5ldC10cmFja2VyXFxcXGNsaWVudFxcXFxzaGFyZWRcXFxccmVzZXQubGVzcycpOyIsImZ1bmN0aW9uIF9leHRlbmRzKCkgeyBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07IHJldHVybiBfZXh0ZW5kcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9XG5cbnJlcXVpcmUoJy4vcGxhbmV0TGlzdC5sZXNzJyk7XG5cbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuY29uc3QgY3JlYXRlQ2xhc3MgPSByZXF1aXJlKCdjcmVhdGUtcmVhY3QtY2xhc3MnKTtcblxuY29uc3QgY3ggPSByZXF1aXJlKCdjbGFzc25hbWVzJyk7XG5cbmNvbnN0IFBsYW5ldHMgPSByZXF1aXJlKCdzaGFyZWQvcGxhbmV0cy55YW1sJyk7XG5cbmNvbnN0IFBsYW5ldCA9IHJlcXVpcmUoJy4uL3BsYW5ldC9wbGFuZXQuanN4Jyk7XG5cbmNvbnN0IFBsYW5ldExpc3QgPSBjcmVhdGVDbGFzcyh7XG4gIGRpc3BsYXlOYW1lOiAnUGxhbmV0TGlzdCcsXG5cbiAgZ2V0RGVmYXVsdFByb3BzKCkge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGVFeGhhdXN0ZWQ6ICgpID0+IHt9LFxuICAgICAgdXBkYXRlT3duZWQ6ICgpID0+IHt9LFxuICAgICAgb3duZWQ6IG5ldyBTZXQoW10pLFxuICAgICAgZXhoYXVzdGVkOiBuZXcgU2V0KFtdKSxcbiAgICAgIHNob3c6ICdvd25lZCdcbiAgICB9O1xuICB9LFxuXG4gIGdldEluaXRpYWxTdGF0ZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc29ydDogJ25hbWUnIC8vJ2luZmx1ZW5jZScsICdyZXNvdXJjZSdcblxuICAgIH07XG4gIH0sXG5cbiAgZXhoYXVzdChuYW1lKSB7XG4gICAgaWYgKCF0aGlzLnByb3BzLm93bmVkLmhhcyhuYW1lKSkgcmV0dXJuO1xuICAgIHRoaXMucHJvcHMuZXhoYXVzdGVkLmhhcyhuYW1lKSA/IHRoaXMucHJvcHMuZXhoYXVzdGVkLmRlbGV0ZShuYW1lKSA6IHRoaXMucHJvcHMuZXhoYXVzdGVkLmFkZChuYW1lKTtcbiAgICB0aGlzLnByb3BzLnVwZGF0ZUV4aGF1c3RlZCh0aGlzLnByb3BzLmV4aGF1c3RlZCk7XG4gIH0sXG5cbiAgb3duKG5hbWUpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5vd25lZC5oYXMobmFtZSkpIHtcbiAgICAgIHRoaXMucHJvcHMub3duZWQuZGVsZXRlKG5hbWUpO1xuICAgICAgdGhpcy5wcm9wcy5leGhhdXN0ZWQuZGVsZXRlKG5hbWUpO1xuICAgICAgdGhpcy5wcm9wcy51cGRhdGVFeGhhdXN0ZWQodGhpcy5wcm9wcy5leGhhdXN0ZWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnByb3BzLm93bmVkLmFkZChuYW1lKTtcbiAgICB9XG5cbiAgICB0aGlzLnByb3BzLnVwZGF0ZU93bmVkKHRoaXMucHJvcHMub3duZWQpO1xuICB9LFxuXG4gIGdldFNvcnRlZCgpIHtcbiAgICBjb25zdCBzb3J0VGVybSA9IHRoaXMuc3RhdGUuc29ydDtcbiAgICBjb25zdCByZXN1bHQgPSBQbGFuZXRzLnNvcnQoKGEsIGIpID0+IGEubmFtZS5sb2NhbGVDb21wYXJlKGIubmFtZSkpO1xuICAgIGlmIChzb3J0VGVybSA9PSAnaW5mbHVlbmNlJykgcmV0dXJuIHJlc3VsdC5zb3J0KChhLCBiKSA9PiBiLmluZmx1ZW5jZSAtIGEuaW5mbHVlbmNlKTtcbiAgICBpZiAoc29ydFRlcm0gPT0gJ3Jlc291cmNlJykgcmV0dXJuIHJlc3VsdC5zb3J0KChhLCBiKSA9PiBiLnJlc291cmNlIC0gYS5yZXNvdXJjZSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSxcblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1xuICAgICAgY2xhc3NOYW1lOiBcIlBsYW5ldExpc3RcIlxuICAgIH0sIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1xuICAgICAgY2xhc3NOYW1lOiBcInNvcnRpbmdcIlxuICAgIH0sIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1xuICAgICAgY2xhc3NOYW1lOiBjeCgnbmFtZScsIHtcbiAgICAgICAgc2VsZWN0ZWQ6IHRoaXMuc3RhdGUuc29ydCA9PSAnbmFtZSdcbiAgICAgIH0pLFxuICAgICAgb25DbGljazogKCkgPT4gdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHNvcnQ6ICduYW1lJ1xuICAgICAgfSlcbiAgICB9LCBcIm5hbWVcIiksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1xuICAgICAgY2xhc3NOYW1lOiBjeCgncmVzb3VyY2UnLCB7XG4gICAgICAgIHNlbGVjdGVkOiB0aGlzLnN0YXRlLnNvcnQgPT0gJ3Jlc291cmNlJ1xuICAgICAgfSksXG4gICAgICBvbkNsaWNrOiAoKSA9PiB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgc29ydDogJ3Jlc291cmNlJ1xuICAgICAgfSlcbiAgICB9LCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaVwiLCB7XG4gICAgICBjbGFzc05hbWU6IFwiZmEgZmEtY3ViZXNcIlxuICAgIH0pKSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XG4gICAgICBjbGFzc05hbWU6IGN4KCdpbmZsdWVuY2UnLCB7XG4gICAgICAgIHNlbGVjdGVkOiB0aGlzLnN0YXRlLnNvcnQgPT0gJ2luZmx1ZW5jZSdcbiAgICAgIH0pLFxuICAgICAgb25DbGljazogKCkgPT4gdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHNvcnQ6ICdpbmZsdWVuY2UnXG4gICAgICB9KVxuICAgIH0sIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpXCIsIHtcbiAgICAgIGNsYXNzTmFtZTogXCJmYSBmYS1nZ1wiXG4gICAgfSkpKSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XG4gICAgICBjbGFzc05hbWU6IGN4KCdwbGFuZXRzJywgdGhpcy5wcm9wcy5zaG93KVxuICAgIH0sIHRoaXMuZ2V0U29ydGVkKCkubWFwKHBsYW5ldCA9PiB7XG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChQbGFuZXQsIF9leHRlbmRzKHtcbiAgICAgICAga2V5OiBwbGFuZXQubmFtZSxcbiAgICAgICAgb25QcmVzczogKCkgPT4gdGhpcy5leGhhdXN0KHBsYW5ldC5uYW1lKSxcbiAgICAgICAgb25Mb25nUHJlc3M6ICgpID0+IHRoaXMub3duKHBsYW5ldC5uYW1lKSxcbiAgICAgICAgZXhoYXVzdGVkOiB0aGlzLnByb3BzLmV4aGF1c3RlZC5oYXMocGxhbmV0Lm5hbWUpLFxuICAgICAgICBvd25lZDogdGhpcy5wcm9wcy5vd25lZC5oYXMocGxhbmV0Lm5hbWUpXG4gICAgICB9LCBwbGFuZXQpKTtcbiAgICB9KSkpO1xuICB9XG5cbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBQbGFuZXRMaXN0OyIsInJlcXVpcmUoJy4vcGxhbmV0Lmxlc3MnKTtcblxuY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5jb25zdCBjcmVhdGVDbGFzcyA9IHJlcXVpcmUoJ2NyZWF0ZS1yZWFjdC1jbGFzcycpO1xuXG5jb25zdCBjeCA9IHJlcXVpcmUoJ2NsYXNzbmFtZXMnKTtcblxuY29uc3QgTG9uZ1ByZXNzID0gcmVxdWlyZSgnc2hhcmVkL2xvbmdQcmVzcy5qc3gnKTtcblxuY29uc3QgUGxhbmV0ID0gY3JlYXRlQ2xhc3Moe1xuICBnZXREZWZhdWx0UHJvcHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6ICcnLFxuICAgICAgZXhoYXVzdGVkOiBmYWxzZSxcbiAgICAgIG93bmVkOiBmYWxzZSxcbiAgICAgIGluZmx1ZW5jZTogMCxcbiAgICAgIHJlc291cmNlOiAwLFxuICAgICAgdHlwZTogZmFsc2UsXG4gICAgICBvblByZXNzOiAoKSA9PiB7fSxcbiAgICAgIG9uTG9uZ1ByZXNzOiAoKSA9PiB7fVxuICAgIH07XG4gIH0sXG5cbiAgcmVuZGVyVHlwZSgpIHtcbiAgICBpZiAoIXRoaXMucHJvcHMudHlwZSkgcmV0dXJuIG51bGw7XG4gICAgY29uc3QgdHlwZXMgPSB7XG4gICAgICBob21lOiAnaG9tZScsXG4gICAgICB5ZWxsb3c6ICdjaXJjbGUnLFxuICAgICAgcmVkOiAnY2lyY2xlJyxcbiAgICAgIGJsdWU6ICdjaXJjbGUnLFxuICAgICAgZ3JlZW46ICdjaXJjbGUnXG4gICAgfTtcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcImlcIiwge1xuICAgICAgY2xhc3NOYW1lOiBgZmEgZmEtJHt0eXBlc1t0aGlzLnByb3BzLnR5cGVdfSAke3RoaXMucHJvcHMudHlwZX1gXG4gICAgfSk7XG4gIH0sXG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGV4aGF1c3RlZCxcbiAgICAgIG93bmVkXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTG9uZ1ByZXNzLCB7XG4gICAgICBjbGFzc05hbWU6IGN4KCdQbGFuZXQnLCB7XG4gICAgICAgIGV4aGF1c3RlZCxcbiAgICAgICAgb3duZWQsXG4gICAgICAgIHVub3duZWQ6ICFvd25lZFxuICAgICAgfSksXG4gICAgICBvblByZXNzOiB0aGlzLnByb3BzLm9uUHJlc3MsXG4gICAgICBvbkxvbmdQcmVzczogdGhpcy5wcm9wcy5vbkxvbmdQcmVzc1xuICAgIH0sIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1xuICAgICAgY2xhc3NOYW1lOiBcIm5hbWVcIlxuICAgIH0sIHRoaXMucHJvcHMubmFtZSwgdGhpcy5yZW5kZXJUeXBlKCkpLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcbiAgICAgIGNsYXNzTmFtZTogXCJyZXNvdXJjZVwiXG4gICAgfSwgdGhpcy5wcm9wcy5yZXNvdXJjZSksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1xuICAgICAgY2xhc3NOYW1lOiBcImluZmx1ZW5jZVwiXG4gICAgfSwgdGhpcy5wcm9wcy5pbmZsdWVuY2UpKTtcbiAgfVxuXG59KTtcbm1vZHVsZS5leHBvcnRzID0gUGxhbmV0OyIsInJlcXVpcmUoJy4vc3VtbWFyeS5sZXNzJyk7XG5cbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuY29uc3QgY3JlYXRlQ2xhc3MgPSByZXF1aXJlKCdjcmVhdGUtcmVhY3QtY2xhc3MnKTtcblxuY29uc3QgY3ggPSByZXF1aXJlKCdjbGFzc25hbWVzJyk7XG5cbmNvbnN0IFBsYW5ldHMgPSByZXF1aXJlKCdzaGFyZWQvcGxhbmV0cy55YW1sJyk7XG5cbmNvbnN0IFN1bW1hcnkgPSBjcmVhdGVDbGFzcyh7XG4gIGRpc3BsYXlOYW1lOiAnU3VtbWFyeScsXG5cbiAgZ2V0RGVmYXVsdFByb3BzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBvd25lZDogbmV3IFNldChbXSksXG4gICAgICBleGhhdXN0ZWQ6IG5ldyBTZXQoW10pXG4gICAgfTtcbiAgfSxcblxuICBnZXRTdW0oKSB7XG4gICAgY29uc3Qgb3duZWQgPSBQbGFuZXRzLmZpbHRlcihwbGFuZXQgPT4gdGhpcy5wcm9wcy5vd25lZC5oYXMocGxhbmV0Lm5hbWUpKTtcbiAgICByZXR1cm4gb3duZWQucmVkdWNlKChhY2MsIHBsYW5ldCkgPT4ge1xuICAgICAgYWNjLmluZmx1ZW5jZV90b3RhbCArPSBwbGFuZXQuaW5mbHVlbmNlO1xuICAgICAgYWNjLnJlc291cmNlX3RvdGFsICs9IHBsYW5ldC5yZXNvdXJjZTtcblxuICAgICAgaWYgKCF0aGlzLnByb3BzLmV4aGF1c3RlZC5oYXMocGxhbmV0Lm5hbWUpKSB7XG4gICAgICAgIGFjYy5pbmZsdWVuY2UgKz0gcGxhbmV0LmluZmx1ZW5jZTtcbiAgICAgICAgYWNjLnJlc291cmNlICs9IHBsYW5ldC5yZXNvdXJjZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7XG4gICAgICBpbmZsdWVuY2U6IDAsXG4gICAgICBpbmZsdWVuY2VfdG90YWw6IDAsXG4gICAgICByZXNvdXJjZTogMCxcbiAgICAgIHJlc291cmNlX3RvdGFsOiAwXG4gICAgfSk7XG4gIH0sXG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGNvdW50ID0gdGhpcy5nZXRTdW0oKTtcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XG4gICAgICBjbGFzc05hbWU6IFwiU3VtbWFyeVwiXG4gICAgfSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XG4gICAgICBjbGFzc05hbWU6IFwicmVzb3VyY2VcIlxuICAgIH0sIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCBudWxsLCBcInJlc291cmNlXCIpLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaDJcIiwgbnVsbCwgY291bnQucmVzb3VyY2UpLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwic21hbGxcIiwgbnVsbCwgY291bnQucmVzb3VyY2VfdG90YWwpLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaVwiLCB7XG4gICAgICBjbGFzc05hbWU6IFwiZmEgZmEtY3ViZXNcIlxuICAgIH0pKSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XG4gICAgICBjbGFzc05hbWU6IFwiaW5mbHVlbmNlXCJcbiAgICB9LCBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIiwgbnVsbCwgXCJpbmZsdWVuY2VcIiksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJoMlwiLCBudWxsLCBjb3VudC5pbmZsdWVuY2UpLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwic21hbGxcIiwgbnVsbCwgY291bnQuaW5mbHVlbmNlX3RvdGFsKSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImlcIiwge1xuICAgICAgY2xhc3NOYW1lOiBcImZhIGZhLWdnXCJcbiAgICB9KSkpO1xuICB9XG5cbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBTdW1tYXJ5OyIsImNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuY29uc3QgY3JlYXRlQ2xhc3MgPSByZXF1aXJlKCdjcmVhdGUtcmVhY3QtY2xhc3MnKTtcblxuY29uc3QgTG9uZ1ByZXNzID0gY3JlYXRlQ2xhc3Moe1xuICBnZXREZWZhdWx0UHJvcHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHdhaXQ6IDUwMCxcbiAgICAgIG9uUHJlc3M6ICgpID0+IHt9LFxuICAgICAgb25Mb25nUHJlc3M6ICgpID0+IHt9XG4gICAgfTtcbiAgfSxcblxuICB0aW1lcjogbnVsbCxcblxuICBoYW5kbGVQcmVzcygpIHtcbiAgICB0aGlzLnRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnByb3BzLm9uTG9uZ1ByZXNzKCk7XG4gICAgICB0aGlzLnRpbWVyID0gZmFsc2U7XG4gICAgfSwgdGhpcy5wcm9wcy53YWl0KTtcbiAgfSxcblxuICBoYW5kbGVSZWxlYXNlKCkge1xuICAgIGlmICh0aGlzLnRpbWVyICE9PSBmYWxzZSkgdGhpcy5wcm9wcy5vblByZXNzKCk7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVyKTtcbiAgfSxcblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1xuICAgICAgY2xhc3NOYW1lOiB0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgIG9uTW91c2VEb3duOiB0aGlzLmhhbmRsZVByZXNzLFxuICAgICAgb25Nb3VzZVVwOiB0aGlzLmhhbmRsZVJlbGVhc2VcbiAgICB9LCB0aGlzLnByb3BzLmNoaWxkcmVuKTtcbiAgfVxuXG59KTtcbm1vZHVsZS5leHBvcnRzID0gTG9uZ1ByZXNzOyIsIm1vZHVsZS5leHBvcnRzPVt7XCJuYW1lXCI6XCJBYnl6XCIsXCJyZXNvdXJjZVwiOjMsXCJpbmZsdWVuY2VcIjowLFwidHlwZVwiOmZhbHNlfSx7XCJuYW1lXCI6XCJBcmluYW1cIixcInJlc291cmNlXCI6MSxcImluZmx1ZW5jZVwiOjIsXCJ0eXBlXCI6ZmFsc2V9LHtcIm5hbWVcIjpcIkFybm9yXCIsXCJyZXNvdXJjZVwiOjIsXCJpbmZsdWVuY2VcIjoxLFwidHlwZVwiOmZhbHNlfSx7XCJuYW1lXCI6XCJCZXJlZ1wiLFwicmVzb3VyY2VcIjozLFwiaW5mbHVlbmNlXCI6MSxcInR5cGVcIjpmYWxzZX0se1wibmFtZVwiOlwiQ2VudGF1cmlcIixcInJlc291cmNlXCI6MSxcImluZmx1ZW5jZVwiOjMsXCJ0eXBlXCI6ZmFsc2V9LHtcIm5hbWVcIjpcIkNvb3JuZWVxXCIsXCJyZXNvdXJjZVwiOjEsXCJpbmZsdWVuY2VcIjoyLFwidHlwZVwiOmZhbHNlfSx7XCJuYW1lXCI6XCJEYWwgQm9vdGhhXCIsXCJyZXNvdXJjZVwiOjAsXCJpbmZsdWVuY2VcIjoyLFwidHlwZVwiOmZhbHNlfSx7XCJuYW1lXCI6XCJGcmlhXCIsXCJyZXNvdXJjZVwiOjIsXCJpbmZsdWVuY2VcIjowLFwidHlwZVwiOmZhbHNlfSx7XCJuYW1lXCI6XCJHcmFsXCIsXCJyZXNvdXJjZVwiOjEsXCJpbmZsdWVuY2VcIjoxLFwidHlwZVwiOlwiYmx1ZVwifSx7XCJuYW1lXCI6XCJMYXphclwiLFwicmVzb3VyY2VcIjoxLFwiaW5mbHVlbmNlXCI6MCxcInR5cGVcIjpcInllbGxvd1wifSx7XCJuYW1lXCI6XCJMaXJ0YSBJVlwiLFwicmVzb3VyY2VcIjoyLFwiaW5mbHVlbmNlXCI6MyxcInR5cGVcIjpmYWxzZX0se1wibmFtZVwiOlwiTG9kb3IgKyBCZXRhXCIsXCJyZXNvdXJjZVwiOjMsXCJpbmZsdWVuY2VcIjoxLFwidHlwZVwiOmZhbHNlfSx7XCJuYW1lXCI6XCJMb3JcIixcInJlc291cmNlXCI6MSxcImluZmx1ZW5jZVwiOjIsXCJ0eXBlXCI6ZmFsc2V9LHtcIm5hbWVcIjpcIk1lY2F0b2wgUmV4XCIsXCJyZXNvdXJjZVwiOjEsXCJpbmZsdWVuY2VcIjo2LFwidHlwZVwiOmZhbHNlfSx7XCJuYW1lXCI6XCJNZWVyXCIsXCJyZXNvdXJjZVwiOjAsXCJpbmZsdWVuY2VcIjo0LFwidHlwZVwiOlwicmVkXCJ9LHtcIm5hbWVcIjpcIk1laGFyIFh1bGxcIixcInJlc291cmNlXCI6MSxcImluZmx1ZW5jZVwiOjMsXCJ0eXBlXCI6XCJyZWRcIn0se1wibmFtZVwiOlwiTWVsbG9uXCIsXCJyZXNvdXJjZVwiOjAsXCJpbmZsdWVuY2VcIjoyLFwidHlwZVwiOmZhbHNlfSx7XCJuYW1lXCI6XCJOZXcgQWxiaW9uXCIsXCJyZXNvdXJjZVwiOjEsXCJpbmZsdWVuY2VcIjoxLFwidHlwZVwiOlwiZ3JlZW5cIn0se1wibmFtZVwiOlwiUXVhbm4gKyBBbHBoYVwiLFwicmVzb3VyY2VcIjoyLFwiaW5mbHVlbmNlXCI6MSxcInR5cGVcIjpmYWxzZX0se1wibmFtZVwiOlwiUXVjZW4nblwiLFwicmVzb3VyY2VcIjoxLFwiaW5mbHVlbmNlXCI6MixcInR5cGVcIjpmYWxzZX0se1wibmFtZVwiOlwiUmFycm9uXCIsXCJyZXNvdXJjZVwiOjAsXCJpbmZsdWVuY2VcIjozLFwidHlwZVwiOmZhbHNlfSx7XCJuYW1lXCI6XCJSZXNjdWxvblwiLFwicmVzb3VyY2VcIjoyLFwiaW5mbHVlbmNlXCI6MCxcInR5cGVcIjpmYWxzZX0se1wibmFtZVwiOlwiU2FrdWxhZ1wiLFwicmVzb3VyY2VcIjoyLFwiaW5mbHVlbmNlXCI6MSxcInR5cGVcIjpmYWxzZX0se1wibmFtZVwiOlwiU2F1ZG9yXCIsXCJyZXNvdXJjZVwiOjIsXCJpbmZsdWVuY2VcIjoyLFwidHlwZVwiOmZhbHNlfSx7XCJuYW1lXCI6XCJTdGFycG9pbnRcIixcInJlc291cmNlXCI6MyxcImluZmx1ZW5jZVwiOjEsXCJ0eXBlXCI6ZmFsc2V9LHtcIm5hbWVcIjpcIlRhcidNYW5uXCIsXCJyZXNvdXJjZVwiOjEsXCJpbmZsdWVuY2VcIjoxLFwidHlwZVwiOlwiZ3JlZW5cIn0se1wibmFtZVwiOlwiVGVxdSdyYW5cIixcInJlc291cmNlXCI6MixcImluZmx1ZW5jZVwiOjAsXCJ0eXBlXCI6ZmFsc2V9LHtcIm5hbWVcIjpcIlRoaWJhaFwiLFwicmVzb3VyY2VcIjoxLFwiaW5mbHVlbmNlXCI6MSxcInR5cGVcIjpcImJsdWVcIn0se1wibmFtZVwiOlwiVG9ya2FuXCIsXCJyZXNvdXJjZVwiOjAsXCJpbmZsdWVuY2VcIjozLFwidHlwZVwiOmZhbHNlfSx7XCJuYW1lXCI6XCJWZWZ1dCBJSVwiLFwicmVzb3VyY2VcIjoyLFwiaW5mbHVlbmNlXCI6MixcInR5cGVcIjpmYWxzZX0se1wibmFtZVwiOlwiV2VsbG9uXCIsXCJyZXNvdXJjZVwiOjEsXCJpbmZsdWVuY2VcIjoyLFwidHlwZVwiOlwieWVsbG93XCJ9LHtcIm5hbWVcIjpcIlhYZWhhblwiLFwicmVzb3VyY2VcIjoxLFwiaW5mbHVlbmNlXCI6MSxcInR5cGVcIjpmYWxzZX0se1wibmFtZVwiOlwiWm9oYmF0XCIsXCJyZXNvdXJjZVwiOjMsXCJpbmZsdWVuY2VcIjoxLFwidHlwZVwiOmZhbHNlfSx7XCJuYW1lXCI6XCJDcmV1c3NcIixcInJlc291cmNlXCI6NCxcImluZmx1ZW5jZVwiOjIsXCJ0eXBlXCI6XCJob21lXCJ9LHtcIm5hbWVcIjpcIkhlcmNhbnRcIixcInJlc291cmNlXCI6MSxcImluZmx1ZW5jZVwiOjEsXCJ0eXBlXCI6XCJob21lXCJ9LHtcIm5hbWVcIjpcIkFycmV0emVcIixcInJlc291cmNlXCI6MixcImluZmx1ZW5jZVwiOjAsXCJ0eXBlXCI6XCJob21lXCJ9LHtcIm5hbWVcIjpcIkthbWRvcm5cIixcInJlc291cmNlXCI6MCxcImluZmx1ZW5jZVwiOjEsXCJ0eXBlXCI6XCJob21lXCJ9LHtcIm5hbWVcIjpcIkpvbFwiLFwicmVzb3VyY2VcIjoxLFwiaW5mbHVlbmNlXCI6MixcInR5cGVcIjpcImhvbWVcIn0se1wibmFtZVwiOlwiTmFyXCIsXCJyZXNvdXJjZVwiOjIsXCJpbmZsdWVuY2VcIjozLFwidHlwZVwiOlwiaG9tZVwifSx7XCJuYW1lXCI6XCJbMC4wLjBdXCIsXCJyZXNvdXJjZVwiOjUsXCJpbmZsdWVuY2VcIjowLFwidHlwZVwiOlwiaG9tZVwifSx7XCJuYW1lXCI6XCJBcmMgUHJpbWVcIixcInJlc291cmNlXCI6NCxcImluZmx1ZW5jZVwiOjAsXCJ0eXBlXCI6XCJob21lXCJ9LHtcIm5hbWVcIjpcIldyZW4gVGVycmFcIixcInJlc291cmNlXCI6MixcImluZmx1ZW5jZVwiOjEsXCJ0eXBlXCI6XCJob21lXCJ9LHtcIm5hbWVcIjpcIk1vbGwgUHJpbXVzXCIsXCJyZXNvdXJjZVwiOjQsXCJpbmZsdWVuY2VcIjoxLFwidHlwZVwiOlwiaG9tZVwifSx7XCJuYW1lXCI6XCJNdXVhdFwiLFwicmVzb3VyY2VcIjo0LFwiaW5mbHVlbmNlXCI6MSxcInR5cGVcIjpcImhvbWVcIn0se1wibmFtZVwiOlwiRHJ1YWFcIixcInJlc291cmNlXCI6MyxcImluZmx1ZW5jZVwiOjEsXCJ0eXBlXCI6XCJob21lXCJ9LHtcIm5hbWVcIjpcIk1hYWx1dWtcIixcInJlc291cmNlXCI6MCxcImluZmx1ZW5jZVwiOjIsXCJ0eXBlXCI6XCJob21lXCJ9LHtcIm5hbWVcIjpcIk1vcmRhaSBJSVwiLFwicmVzb3VyY2VcIjo0LFwiaW5mbHVlbmNlXCI6MCxcInR5cGVcIjpcImhvbWVcIn0se1wibmFtZVwiOlwiTGlzaXMgSUlcIixcInJlc291cmNlXCI6MSxcImluZmx1ZW5jZVwiOjAsXCJ0eXBlXCI6XCJob21lXCJ9LHtcIm5hbWVcIjpcIlJhZ2hcIixcInJlc291cmNlXCI6MixcImluZmx1ZW5jZVwiOjEsXCJ0eXBlXCI6XCJob21lXCJ9LHtcIm5hbWVcIjpcIlRyZW4nTGFrXCIsXCJyZXNvdXJjZVwiOjEsXCJpbmZsdWVuY2VcIjowLFwidHlwZVwiOlwiaG9tZVwifSx7XCJuYW1lXCI6XCJRdWluYXJyYVwiLFwicmVzb3VyY2VcIjozLFwiaW5mbHVlbmNlXCI6MSxcInR5cGVcIjpcImhvbWVcIn0se1wibmFtZVwiOlwiSm9yZFwiLFwicmVzb3VyY2VcIjo0LFwiaW5mbHVlbmNlXCI6MixcInR5cGVcIjpcImhvbWVcIn0se1wibmFtZVwiOlwiV2lubnVcIixcInJlc291cmNlXCI6MyxcImluZmx1ZW5jZVwiOjQsXCJ0eXBlXCI6XCJob21lXCJ9LHtcIm5hbWVcIjpcIkFyY2hvbiBXcmVuXCIsXCJyZXNvdXJjZVwiOjIsXCJpbmZsdWVuY2VcIjozLFwidHlwZVwiOlwiaG9tZVwifSx7XCJuYW1lXCI6XCJBcmNob24gVGF1XCIsXCJyZXNvdXJjZVwiOjEsXCJpbmZsdWVuY2VcIjoxLFwidHlwZVwiOlwiaG9tZVwifSx7XCJuYW1lXCI6XCJEYXJpZW5cIixcInJlc291cmNlXCI6NCxcImluZmx1ZW5jZVwiOjQsXCJ0eXBlXCI6XCJob21lXCJ9LHtcIm5hbWVcIjpcIlJldGlsbGlvblwiLFwicmVzb3VyY2VcIjoyLFwiaW5mbHVlbmNlXCI6MyxcInR5cGVcIjpcImhvbWVcIn0se1wibmFtZVwiOlwiU2hhbGxvcVwiLFwicmVzb3VyY2VcIjoxLFwiaW5mbHVlbmNlXCI6MixcInR5cGVcIjpcImhvbWVcIn1dIl19
