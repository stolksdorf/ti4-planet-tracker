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

const {
  Title
} = require('vitreum/headtags');

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
    }, React.createElement(Title, null, "TI4 Planet Tracker"), React.createElement(Controls, {
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
},{"./controls/controls.jsx":1,"./main.less":3,"./planetList/planetList.jsx":4,"./summary/summary.jsx":8,"classnames":undefined,"create-react-class":undefined,"react":undefined,"vitreum/headtags":undefined}],3:[function(require,module,exports){
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

  handlePress(evt) {
    //evt.preventDefault();
    this.timer = setTimeout(() => {
      this.props.onLongPress();
      window.navigator.vibrate && window.navigator.vibrate(200);
      this.timer = false;
    }, this.props.wait);
  },

  handleRelease(evt) {
    evt.preventDefault();
    if (this.timer !== false) this.props.onPress();
    clearInterval(this.timer);
  },

  render() {
    return React.createElement("div", {
      className: this.props.className,
      onTouchStart: this.handlePress,
      onTouchEnd: this.handleRelease,
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvbWFpbi9jb250cm9scy9jb250cm9scy5qc3giLCJjbGllbnQvbWFpbi9jb250cm9scy9jb250cm9scy5sZXNzIiwiY2xpZW50L21haW4vbWFpbi5qc3giLCJjbGllbnQvbWFpbi9tYWluLmxlc3MiLCJjbGllbnQvbWFpbi9wbGFuZXRMaXN0L3BsYW5ldExpc3QuanN4IiwiY2xpZW50L21haW4vcGxhbmV0L3BsYW5ldC5qc3giLCJjbGllbnQvbWFpbi9zdW1tYXJ5L3N1bW1hcnkuanN4IiwiY2xpZW50L3NoYXJlZC9sb25nUHJlc3MuanN4IiwiY2xpZW50L3NoYXJlZC9wbGFuZXRzLnlhbWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwRkE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRkE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDeEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUM3REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDeERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJyZXF1aXJlKCcuL2NvbnRyb2xzLmxlc3MnKTtcblxuY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5jb25zdCBjcmVhdGVDbGFzcyA9IHJlcXVpcmUoJ2NyZWF0ZS1yZWFjdC1jbGFzcycpO1xuXG5jb25zdCBjeCA9IHJlcXVpcmUoJ2NsYXNzbmFtZXMnKTtcblxuY29uc3QgTG9uZ1ByZXNzID0gcmVxdWlyZSgnc2hhcmVkL2xvbmdQcmVzcy5qc3gnKTtcblxuY29uc3QgaXNTYW1lID0gKHNldEEsIHNldEIpID0+IHtcbiAgaWYgKHNldEEuc2l6ZSAhPT0gc2V0Qi5zaXplKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiBBcnJheS5mcm9tKHNldEEpLmV2ZXJ5KHZhbCA9PiBzZXRCLmhhcyh2YWwpKTtcbn07XG5cbmNvbnN0IENvbnRyb2xzID0gY3JlYXRlQ2xhc3Moe1xuICBkaXNwbGF5TmFtZTogJ0NvbnRyb2xzJyxcblxuICBnZXREZWZhdWx0UHJvcHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGVWaXNpYmxlOiAnbm90X293bmVkJyxcbiAgICAgIC8vJ293bmVkJywgJ2JvdGgnXG4gICAgICBvbkNoYW5nZVZpc2libGU6ICgpID0+IHt9LFxuICAgICAgb3duZWQ6IG5ldyBTZXQoW10pLFxuICAgICAgZXhoYXVzdGVkOiBuZXcgU2V0KFtdKSxcbiAgICAgIGJvb2ttYXJrOiBuZXcgU2V0KFtdKSxcbiAgICAgIHVwZGF0ZUV4aGF1c3RlZDogKCkgPT4ge30sXG4gICAgICB1cGRhdGVPd25lZDogKCkgPT4ge30sXG4gICAgICB1cGRhdGVCb29rbWFyazogKCkgPT4ge31cbiAgICB9O1xuICB9LFxuXG4gIHRvZ2dsZVNob3coKSB7XG4gICAgLy8gaWYodGhpcy5wcm9wcy50eXBlVmlzaWJsZSA9PSAnYm90aCcpIHJldHVybiB0aGlzLnByb3BzLm9uQ2hhbmdlVmlzaWJsZSgnb3duZWQnKTtcbiAgICAvLyBpZih0aGlzLnByb3BzLnR5cGVWaXNpYmxlID09ICdvd25lZCcpIHJldHVybiB0aGlzLnByb3BzLm9uQ2hhbmdlVmlzaWJsZSgnbm90X293bmVkJyk7XG4gICAgLy8gaWYodGhpcy5wcm9wcy50eXBlVmlzaWJsZSA9PSAnbm90X293bmVkJykgcmV0dXJuIHRoaXMucHJvcHMub25DaGFuZ2VWaXNpYmxlKCdib3RoJyk7XG4gICAgaWYgKHRoaXMucHJvcHMudHlwZVZpc2libGUgPT0gJ2JvdGgnKSByZXR1cm4gdGhpcy5wcm9wcy5vbkNoYW5nZVZpc2libGUoJ293bmVkJyk7XG4gICAgaWYgKHRoaXMucHJvcHMudHlwZVZpc2libGUgPT0gJ293bmVkJykgcmV0dXJuIHRoaXMucHJvcHMub25DaGFuZ2VWaXNpYmxlKCdub3Rfb3duZWQnKTtcbiAgICBpZiAodGhpcy5wcm9wcy50eXBlVmlzaWJsZSA9PSAnbm90X293bmVkJykgcmV0dXJuIHRoaXMucHJvcHMub25DaGFuZ2VWaXNpYmxlKCdvd25lZCcpO1xuICB9LFxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB0ZW1wID0gaXNTYW1lKHRoaXMucHJvcHMuZXhoYXVzdGVkLCB0aGlzLnByb3BzLmJvb2ttYXJrKTtcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XG4gICAgICBjbGFzc05hbWU6IFwiQ29udHJvbHNcIlxuICAgIH0sIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTG9uZ1ByZXNzLCB7XG4gICAgICBjbGFzc05hbWU6IFwiYnRuIHJlZnJlc2hcIixcbiAgICAgIHdhaXQ6IDgwMCxcbiAgICAgIG9uUHJlc3M6ICgpID0+IHRoaXMucHJvcHMudXBkYXRlRXhoYXVzdGVkKG5ldyBTZXQoW10pKSxcbiAgICAgIG9uTG9uZ1ByZXNzOiAoKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMudXBkYXRlRXhoYXVzdGVkKG5ldyBTZXQoW10pKTtcbiAgICAgICAgdGhpcy5wcm9wcy51cGRhdGVPd25lZChuZXcgU2V0KFtdKSk7XG4gICAgICB9XG4gICAgfSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImlcIiwge1xuICAgICAgY2xhc3NOYW1lOiBcImZhIGZhLXJlZnJlc2hcIlxuICAgIH0pKSwgUmVhY3QuY3JlYXRlRWxlbWVudChMb25nUHJlc3MsIHtcbiAgICAgIGNsYXNzTmFtZTogXCJidG4gb3duZXJzaGlwXCIsXG4gICAgICBvblByZXNzOiB0aGlzLnRvZ2dsZVNob3csXG4gICAgICBvbkxvbmdQcmVzczogKCkgPT4gdGhpcy5wcm9wcy5vbkNoYW5nZVZpc2libGUoJ2JvdGgnKVxuICAgIH0sIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpXCIsIHtcbiAgICAgIGNsYXNzTmFtZTogY3goJ2ZhJywge1xuICAgICAgICAnZmEtY2lyY2xlJzogdGhpcy5wcm9wcy50eXBlVmlzaWJsZSA9PSAnb3duZWQnLFxuICAgICAgICAnZmEtY2lyY2xlLW8nOiB0aGlzLnByb3BzLnR5cGVWaXNpYmxlID09ICdub3Rfb3duZWQnLFxuICAgICAgICAnZmEtc3RvcC1jaXJjbGUtbyc6IHRoaXMucHJvcHMudHlwZVZpc2libGUgPT0gJ2JvdGgnXG4gICAgICB9KVxuICAgIH0pKSwgUmVhY3QuY3JlYXRlRWxlbWVudChMb25nUHJlc3MsIHtcbiAgICAgIGNsYXNzTmFtZTogXCJidG4gYm9va21hcmtcIixcbiAgICAgIG9uUHJlc3M6ICgpID0+IHtcbiAgICAgICAgY29uc3QgdGVtcCA9IHRoaXMucHJvcHMuYm9va21hcms7XG4gICAgICAgIHRoaXMucHJvcHMudXBkYXRlQm9va21hcmsodGhpcy5wcm9wcy5leGhhdXN0ZWQpO1xuICAgICAgICB0aGlzLnByb3BzLnVwZGF0ZUV4aGF1c3RlZCh0ZW1wKTtcbiAgICAgIH0sXG4gICAgICBvbkxvbmdQcmVzczogKCkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLnVwZGF0ZUJvb2ttYXJrKHRoaXMucHJvcHMuZXhoYXVzdGVkKTtcbiAgICAgIH1cbiAgICB9LCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaVwiLCB7XG4gICAgICBjbGFzc05hbWU6IGN4KCdmYScsIHtcbiAgICAgICAgJ2ZhLWJvb2ttYXJrLW8nOiB0ZW1wLFxuICAgICAgICAnZmEtYm9va21hcmsnOiAhdGVtcFxuICAgICAgfSlcbiAgICB9KSkpO1xuICB9XG5cbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBDb250cm9sczsiLCIiLCJyZXF1aXJlKCcuL21haW4ubGVzcycpO1xuXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IGNyZWF0ZUNsYXNzID0gcmVxdWlyZSgnY3JlYXRlLXJlYWN0LWNsYXNzJyk7XG5cbmNvbnN0IGN4ID0gcmVxdWlyZSgnY2xhc3NuYW1lcycpO1xuXG5jb25zdCBDb250cm9scyA9IHJlcXVpcmUoJy4vY29udHJvbHMvY29udHJvbHMuanN4Jyk7XG5cbmNvbnN0IFN1bW1hcnkgPSByZXF1aXJlKCcuL3N1bW1hcnkvc3VtbWFyeS5qc3gnKTtcblxuY29uc3QgUGxhbmV0TGlzdCA9IHJlcXVpcmUoJy4vcGxhbmV0TGlzdC9wbGFuZXRMaXN0LmpzeCcpO1xuXG5jb25zdCB7XG4gIFRpdGxlXG59ID0gcmVxdWlyZSgndml0cmV1bS9oZWFkdGFncycpO1xuXG5jb25zdCBNYWluID0gY3JlYXRlQ2xhc3Moe1xuICBkaXNwbGF5TmFtZTogJ01haW4nLFxuXG4gIGdldERlZmF1bHRQcm9wcygpIHtcbiAgICByZXR1cm4ge307XG4gIH0sXG5cbiAgZ2V0SW5pdGlhbFN0YXRlKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzaG93OiAnb3duZWQnLFxuICAgICAgLy8gJ293bmVkJywgJ25vdF9vd25lZCdcbiAgICAgIGV4aGF1c3RlZDogbmV3IFNldChbXSksXG4gICAgICBvd25lZDogbmV3IFNldChbXSksXG4gICAgICBib29rbWFyazogbmV3IFNldChbXSlcbiAgICB9O1xuICB9LFxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZXhoYXVzdGVkJykpIHtcbiAgICAgIHRoaXMuc3RhdGUuZXhoYXVzdGVkID0gbmV3IFNldChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZXhoYXVzdGVkJykuc3BsaXQoJywnKSk7XG4gICAgfVxuXG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdvd25lZCcpKSB7XG4gICAgICB0aGlzLnN0YXRlLm93bmVkID0gbmV3IFNldChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnb3duZWQnKS5zcGxpdCgnLCcpKTtcbiAgICB9XG5cbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2Jvb2ttYXJrJykpIHtcbiAgICAgIHRoaXMuc3RhdGUuYm9va21hcmsgPSBuZXcgU2V0KGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdib29rbWFyaycpLnNwbGl0KCcsJykpO1xuICAgIH1cblxuICAgIHRoaXMuc2V0U3RhdGUodGhpcy5zdGF0ZSk7XG4gIH0sXG5cbiAgdXBkYXRlU2V0KGtleSwgdmFsKSB7XG4gICAgdGhpcy5zdGF0ZVtrZXldID0gbmV3IFNldCh2YWwpO1xuICAgIHRoaXMuc2V0U3RhdGUodGhpcy5zdGF0ZSwgKCkgPT4ge1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBBcnJheS5mcm9tKHRoaXMuc3RhdGVba2V5XSkpO1xuICAgIH0pO1xuICB9LFxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XG4gICAgICBjbGFzc05hbWU6IFwiTWFpblwiXG4gICAgfSwgUmVhY3QuY3JlYXRlRWxlbWVudChUaXRsZSwgbnVsbCwgXCJUSTQgUGxhbmV0IFRyYWNrZXJcIiksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ29udHJvbHMsIHtcbiAgICAgIG93bmVkOiB0aGlzLnN0YXRlLm93bmVkLFxuICAgICAgZXhoYXVzdGVkOiB0aGlzLnN0YXRlLmV4aGF1c3RlZCxcbiAgICAgIGJvb2ttYXJrOiB0aGlzLnN0YXRlLmJvb2ttYXJrLFxuICAgICAgdXBkYXRlRXhoYXVzdGVkOiBleGhhdXN0ZWQgPT4gdGhpcy51cGRhdGVTZXQoJ2V4aGF1c3RlZCcsIGV4aGF1c3RlZCksXG4gICAgICB1cGRhdGVPd25lZDogb3duZWQgPT4gdGhpcy51cGRhdGVTZXQoJ293bmVkJywgb3duZWQpLFxuICAgICAgdXBkYXRlQm9va21hcms6IGJvb2ttYXJrID0+IHRoaXMudXBkYXRlU2V0KCdib29rbWFyaycsIGJvb2ttYXJrKSxcbiAgICAgIHR5cGVWaXNpYmxlOiB0aGlzLnN0YXRlLnNob3csXG4gICAgICBvbkNoYW5nZVZpc2libGU6IHNob3cgPT4gdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHNob3dcbiAgICAgIH0pXG4gICAgfSksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU3VtbWFyeSwge1xuICAgICAgb3duZWQ6IHRoaXMuc3RhdGUub3duZWQsXG4gICAgICBleGhhdXN0ZWQ6IHRoaXMuc3RhdGUuZXhoYXVzdGVkXG4gICAgfSksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUGxhbmV0TGlzdCwge1xuICAgICAgdXBkYXRlRXhoYXVzdGVkOiBleGhhdXN0ZWQgPT4gdGhpcy51cGRhdGVTZXQoJ2V4aGF1c3RlZCcsIGV4aGF1c3RlZCksXG4gICAgICB1cGRhdGVPd25lZDogb3duZWQgPT4gdGhpcy51cGRhdGVTZXQoJ293bmVkJywgb3duZWQpLFxuICAgICAgb3duZWQ6IHRoaXMuc3RhdGUub3duZWQsXG4gICAgICBleGhhdXN0ZWQ6IHRoaXMuc3RhdGUuZXhoYXVzdGVkLFxuICAgICAgc2hvdzogdGhpcy5zdGF0ZS5zaG93XG4gICAgfSkpO1xuICB9XG5cbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBNYWluOyIsInJlcXVpcmUoJ0M6XFxcXERyb3Bib3hcXFxccm9vdFxcXFxQcm9ncmFtbWluZ1xcXFxKYXZhc2NyaXB0XFxcXHRpNC1wbGFuZXQtdHJhY2tlclxcXFxjbGllbnRcXFxcc2hhcmVkXFxcXHJlc2V0Lmxlc3MnKTsiLCJmdW5jdGlvbiBfZXh0ZW5kcygpIHsgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9OyByZXR1cm4gX2V4dGVuZHMuYXBwbHkodGhpcywgYXJndW1lbnRzKTsgfVxuXG5yZXF1aXJlKCcuL3BsYW5ldExpc3QubGVzcycpO1xuXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IGNyZWF0ZUNsYXNzID0gcmVxdWlyZSgnY3JlYXRlLXJlYWN0LWNsYXNzJyk7XG5cbmNvbnN0IGN4ID0gcmVxdWlyZSgnY2xhc3NuYW1lcycpO1xuXG5jb25zdCBQbGFuZXRzID0gcmVxdWlyZSgnc2hhcmVkL3BsYW5ldHMueWFtbCcpO1xuXG5jb25zdCBQbGFuZXQgPSByZXF1aXJlKCcuLi9wbGFuZXQvcGxhbmV0LmpzeCcpO1xuXG5jb25zdCBQbGFuZXRMaXN0ID0gY3JlYXRlQ2xhc3Moe1xuICBkaXNwbGF5TmFtZTogJ1BsYW5ldExpc3QnLFxuXG4gIGdldERlZmF1bHRQcm9wcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlRXhoYXVzdGVkOiAoKSA9PiB7fSxcbiAgICAgIHVwZGF0ZU93bmVkOiAoKSA9PiB7fSxcbiAgICAgIG93bmVkOiBuZXcgU2V0KFtdKSxcbiAgICAgIGV4aGF1c3RlZDogbmV3IFNldChbXSksXG4gICAgICBzaG93OiAnb3duZWQnXG4gICAgfTtcbiAgfSxcblxuICBnZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHNvcnQ6ICduYW1lJyAvLydpbmZsdWVuY2UnLCAncmVzb3VyY2UnXG5cbiAgICB9O1xuICB9LFxuXG4gIGV4aGF1c3QobmFtZSkge1xuICAgIGlmICghdGhpcy5wcm9wcy5vd25lZC5oYXMobmFtZSkpIHJldHVybjtcbiAgICB0aGlzLnByb3BzLmV4aGF1c3RlZC5oYXMobmFtZSkgPyB0aGlzLnByb3BzLmV4aGF1c3RlZC5kZWxldGUobmFtZSkgOiB0aGlzLnByb3BzLmV4aGF1c3RlZC5hZGQobmFtZSk7XG4gICAgdGhpcy5wcm9wcy51cGRhdGVFeGhhdXN0ZWQodGhpcy5wcm9wcy5leGhhdXN0ZWQpO1xuICB9LFxuXG4gIG93bihuYW1lKSB7XG4gICAgaWYgKHRoaXMucHJvcHMub3duZWQuaGFzKG5hbWUpKSB7XG4gICAgICB0aGlzLnByb3BzLm93bmVkLmRlbGV0ZShuYW1lKTtcbiAgICAgIHRoaXMucHJvcHMuZXhoYXVzdGVkLmRlbGV0ZShuYW1lKTtcbiAgICAgIHRoaXMucHJvcHMudXBkYXRlRXhoYXVzdGVkKHRoaXMucHJvcHMuZXhoYXVzdGVkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wcm9wcy5vd25lZC5hZGQobmFtZSk7XG4gICAgfVxuXG4gICAgdGhpcy5wcm9wcy51cGRhdGVPd25lZCh0aGlzLnByb3BzLm93bmVkKTtcbiAgfSxcblxuICBnZXRTb3J0ZWQoKSB7XG4gICAgY29uc3Qgc29ydFRlcm0gPSB0aGlzLnN0YXRlLnNvcnQ7XG4gICAgY29uc3QgcmVzdWx0ID0gUGxhbmV0cy5zb3J0KChhLCBiKSA9PiBhLm5hbWUubG9jYWxlQ29tcGFyZShiLm5hbWUpKTtcbiAgICBpZiAoc29ydFRlcm0gPT0gJ2luZmx1ZW5jZScpIHJldHVybiByZXN1bHQuc29ydCgoYSwgYikgPT4gYi5pbmZsdWVuY2UgLSBhLmluZmx1ZW5jZSk7XG4gICAgaWYgKHNvcnRUZXJtID09ICdyZXNvdXJjZScpIHJldHVybiByZXN1bHQuc29ydCgoYSwgYikgPT4gYi5yZXNvdXJjZSAtIGEucmVzb3VyY2UpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH0sXG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcbiAgICAgIGNsYXNzTmFtZTogXCJQbGFuZXRMaXN0XCJcbiAgICB9LCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcbiAgICAgIGNsYXNzTmFtZTogXCJzb3J0aW5nXCJcbiAgICB9LCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcbiAgICAgIGNsYXNzTmFtZTogY3goJ25hbWUnLCB7XG4gICAgICAgIHNlbGVjdGVkOiB0aGlzLnN0YXRlLnNvcnQgPT0gJ25hbWUnXG4gICAgICB9KSxcbiAgICAgIG9uQ2xpY2s6ICgpID0+IHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBzb3J0OiAnbmFtZSdcbiAgICAgIH0pXG4gICAgfSwgXCJuYW1lXCIpLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcbiAgICAgIGNsYXNzTmFtZTogY3goJ3Jlc291cmNlJywge1xuICAgICAgICBzZWxlY3RlZDogdGhpcy5zdGF0ZS5zb3J0ID09ICdyZXNvdXJjZSdcbiAgICAgIH0pLFxuICAgICAgb25DbGljazogKCkgPT4gdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHNvcnQ6ICdyZXNvdXJjZSdcbiAgICAgIH0pXG4gICAgfSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImlcIiwge1xuICAgICAgY2xhc3NOYW1lOiBcImZhIGZhLWN1YmVzXCJcbiAgICB9KSksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1xuICAgICAgY2xhc3NOYW1lOiBjeCgnaW5mbHVlbmNlJywge1xuICAgICAgICBzZWxlY3RlZDogdGhpcy5zdGF0ZS5zb3J0ID09ICdpbmZsdWVuY2UnXG4gICAgICB9KSxcbiAgICAgIG9uQ2xpY2s6ICgpID0+IHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBzb3J0OiAnaW5mbHVlbmNlJ1xuICAgICAgfSlcbiAgICB9LCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaVwiLCB7XG4gICAgICBjbGFzc05hbWU6IFwiZmEgZmEtZ2dcIlxuICAgIH0pKSksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1xuICAgICAgY2xhc3NOYW1lOiBjeCgncGxhbmV0cycsIHRoaXMucHJvcHMuc2hvdylcbiAgICB9LCB0aGlzLmdldFNvcnRlZCgpLm1hcChwbGFuZXQgPT4ge1xuICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUGxhbmV0LCBfZXh0ZW5kcyh7XG4gICAgICAgIGtleTogcGxhbmV0Lm5hbWUsXG4gICAgICAgIG9uUHJlc3M6ICgpID0+IHRoaXMuZXhoYXVzdChwbGFuZXQubmFtZSksXG4gICAgICAgIG9uTG9uZ1ByZXNzOiAoKSA9PiB0aGlzLm93bihwbGFuZXQubmFtZSksXG4gICAgICAgIGV4aGF1c3RlZDogdGhpcy5wcm9wcy5leGhhdXN0ZWQuaGFzKHBsYW5ldC5uYW1lKSxcbiAgICAgICAgb3duZWQ6IHRoaXMucHJvcHMub3duZWQuaGFzKHBsYW5ldC5uYW1lKVxuICAgICAgfSwgcGxhbmV0KSk7XG4gICAgfSkpKTtcbiAgfVxuXG59KTtcbm1vZHVsZS5leHBvcnRzID0gUGxhbmV0TGlzdDsiLCJyZXF1aXJlKCcuL3BsYW5ldC5sZXNzJyk7XG5cbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuY29uc3QgY3JlYXRlQ2xhc3MgPSByZXF1aXJlKCdjcmVhdGUtcmVhY3QtY2xhc3MnKTtcblxuY29uc3QgY3ggPSByZXF1aXJlKCdjbGFzc25hbWVzJyk7XG5cbmNvbnN0IExvbmdQcmVzcyA9IHJlcXVpcmUoJ3NoYXJlZC9sb25nUHJlc3MuanN4Jyk7XG5cbmNvbnN0IFBsYW5ldCA9IGNyZWF0ZUNsYXNzKHtcbiAgZ2V0RGVmYXVsdFByb3BzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiAnJyxcbiAgICAgIGV4aGF1c3RlZDogZmFsc2UsXG4gICAgICBvd25lZDogZmFsc2UsXG4gICAgICBpbmZsdWVuY2U6IDAsXG4gICAgICByZXNvdXJjZTogMCxcbiAgICAgIHR5cGU6IGZhbHNlLFxuICAgICAgb25QcmVzczogKCkgPT4ge30sXG4gICAgICBvbkxvbmdQcmVzczogKCkgPT4ge31cbiAgICB9O1xuICB9LFxuXG4gIHJlbmRlclR5cGUoKSB7XG4gICAgaWYgKCF0aGlzLnByb3BzLnR5cGUpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IHR5cGVzID0ge1xuICAgICAgaG9tZTogJ2hvbWUnLFxuICAgICAgeWVsbG93OiAnY2lyY2xlJyxcbiAgICAgIHJlZDogJ2NpcmNsZScsXG4gICAgICBibHVlOiAnY2lyY2xlJyxcbiAgICAgIGdyZWVuOiAnY2lyY2xlJ1xuICAgIH07XG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpXCIsIHtcbiAgICAgIGNsYXNzTmFtZTogYGZhIGZhLSR7dHlwZXNbdGhpcy5wcm9wcy50eXBlXX0gJHt0aGlzLnByb3BzLnR5cGV9YFxuICAgIH0pO1xuICB9LFxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBleGhhdXN0ZWQsXG4gICAgICBvd25lZFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KExvbmdQcmVzcywge1xuICAgICAgY2xhc3NOYW1lOiBjeCgnUGxhbmV0Jywge1xuICAgICAgICBleGhhdXN0ZWQsXG4gICAgICAgIG93bmVkLFxuICAgICAgICB1bm93bmVkOiAhb3duZWRcbiAgICAgIH0pLFxuICAgICAgb25QcmVzczogdGhpcy5wcm9wcy5vblByZXNzLFxuICAgICAgb25Mb25nUHJlc3M6IHRoaXMucHJvcHMub25Mb25nUHJlc3NcbiAgICB9LCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcbiAgICAgIGNsYXNzTmFtZTogXCJuYW1lXCJcbiAgICB9LCB0aGlzLnByb3BzLm5hbWUsIHRoaXMucmVuZGVyVHlwZSgpKSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XG4gICAgICBjbGFzc05hbWU6IFwicmVzb3VyY2VcIlxuICAgIH0sIHRoaXMucHJvcHMucmVzb3VyY2UpLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcbiAgICAgIGNsYXNzTmFtZTogXCJpbmZsdWVuY2VcIlxuICAgIH0sIHRoaXMucHJvcHMuaW5mbHVlbmNlKSk7XG4gIH1cblxufSk7XG5tb2R1bGUuZXhwb3J0cyA9IFBsYW5ldDsiLCJyZXF1aXJlKCcuL3N1bW1hcnkubGVzcycpO1xuXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IGNyZWF0ZUNsYXNzID0gcmVxdWlyZSgnY3JlYXRlLXJlYWN0LWNsYXNzJyk7XG5cbmNvbnN0IGN4ID0gcmVxdWlyZSgnY2xhc3NuYW1lcycpO1xuXG5jb25zdCBQbGFuZXRzID0gcmVxdWlyZSgnc2hhcmVkL3BsYW5ldHMueWFtbCcpO1xuXG5jb25zdCBTdW1tYXJ5ID0gY3JlYXRlQ2xhc3Moe1xuICBkaXNwbGF5TmFtZTogJ1N1bW1hcnknLFxuXG4gIGdldERlZmF1bHRQcm9wcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgb3duZWQ6IG5ldyBTZXQoW10pLFxuICAgICAgZXhoYXVzdGVkOiBuZXcgU2V0KFtdKVxuICAgIH07XG4gIH0sXG5cbiAgZ2V0U3VtKCkge1xuICAgIGNvbnN0IG93bmVkID0gUGxhbmV0cy5maWx0ZXIocGxhbmV0ID0+IHRoaXMucHJvcHMub3duZWQuaGFzKHBsYW5ldC5uYW1lKSk7XG4gICAgcmV0dXJuIG93bmVkLnJlZHVjZSgoYWNjLCBwbGFuZXQpID0+IHtcbiAgICAgIGFjYy5pbmZsdWVuY2VfdG90YWwgKz0gcGxhbmV0LmluZmx1ZW5jZTtcbiAgICAgIGFjYy5yZXNvdXJjZV90b3RhbCArPSBwbGFuZXQucmVzb3VyY2U7XG5cbiAgICAgIGlmICghdGhpcy5wcm9wcy5leGhhdXN0ZWQuaGFzKHBsYW5ldC5uYW1lKSkge1xuICAgICAgICBhY2MuaW5mbHVlbmNlICs9IHBsYW5ldC5pbmZsdWVuY2U7XG4gICAgICAgIGFjYy5yZXNvdXJjZSArPSBwbGFuZXQucmVzb3VyY2U7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBhY2M7XG4gICAgfSwge1xuICAgICAgaW5mbHVlbmNlOiAwLFxuICAgICAgaW5mbHVlbmNlX3RvdGFsOiAwLFxuICAgICAgcmVzb3VyY2U6IDAsXG4gICAgICByZXNvdXJjZV90b3RhbDogMFxuICAgIH0pO1xuICB9LFxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBjb3VudCA9IHRoaXMuZ2V0U3VtKCk7XG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1xuICAgICAgY2xhc3NOYW1lOiBcIlN1bW1hcnlcIlxuICAgIH0sIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1xuICAgICAgY2xhc3NOYW1lOiBcInJlc291cmNlXCJcbiAgICB9LCBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIiwgbnVsbCwgXCJyZXNvdXJjZVwiKSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImgyXCIsIG51bGwsIGNvdW50LnJlc291cmNlKSwgUmVhY3QuY3JlYXRlRWxlbWVudChcInNtYWxsXCIsIG51bGwsIGNvdW50LnJlc291cmNlX3RvdGFsKSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImlcIiwge1xuICAgICAgY2xhc3NOYW1lOiBcImZhIGZhLWN1YmVzXCJcbiAgICB9KSksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1xuICAgICAgY2xhc3NOYW1lOiBcImluZmx1ZW5jZVwiXG4gICAgfSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIG51bGwsIFwiaW5mbHVlbmNlXCIpLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaDJcIiwgbnVsbCwgY291bnQuaW5mbHVlbmNlKSwgUmVhY3QuY3JlYXRlRWxlbWVudChcInNtYWxsXCIsIG51bGwsIGNvdW50LmluZmx1ZW5jZV90b3RhbCksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpXCIsIHtcbiAgICAgIGNsYXNzTmFtZTogXCJmYSBmYS1nZ1wiXG4gICAgfSkpKTtcbiAgfVxuXG59KTtcbm1vZHVsZS5leHBvcnRzID0gU3VtbWFyeTsiLCJjb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IGNyZWF0ZUNsYXNzID0gcmVxdWlyZSgnY3JlYXRlLXJlYWN0LWNsYXNzJyk7XG5cbmNvbnN0IExvbmdQcmVzcyA9IGNyZWF0ZUNsYXNzKHtcbiAgZ2V0RGVmYXVsdFByb3BzKCkge1xuICAgIHJldHVybiB7XG4gICAgICB3YWl0OiA1MDAsXG4gICAgICBvblByZXNzOiAoKSA9PiB7fSxcbiAgICAgIG9uTG9uZ1ByZXNzOiAoKSA9PiB7fVxuICAgIH07XG4gIH0sXG5cbiAgdGltZXI6IG51bGwsXG5cbiAgaGFuZGxlUHJlc3MoZXZ0KSB7XG4gICAgLy9ldnQucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLnRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnByb3BzLm9uTG9uZ1ByZXNzKCk7XG4gICAgICB3aW5kb3cubmF2aWdhdG9yLnZpYnJhdGUgJiYgd2luZG93Lm5hdmlnYXRvci52aWJyYXRlKDIwMCk7XG4gICAgICB0aGlzLnRpbWVyID0gZmFsc2U7XG4gICAgfSwgdGhpcy5wcm9wcy53YWl0KTtcbiAgfSxcblxuICBoYW5kbGVSZWxlYXNlKGV2dCkge1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmICh0aGlzLnRpbWVyICE9PSBmYWxzZSkgdGhpcy5wcm9wcy5vblByZXNzKCk7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVyKTtcbiAgfSxcblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1xuICAgICAgY2xhc3NOYW1lOiB0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgIG9uVG91Y2hTdGFydDogdGhpcy5oYW5kbGVQcmVzcyxcbiAgICAgIG9uVG91Y2hFbmQ6IHRoaXMuaGFuZGxlUmVsZWFzZSxcbiAgICAgIG9uTW91c2VEb3duOiB0aGlzLmhhbmRsZVByZXNzLFxuICAgICAgb25Nb3VzZVVwOiB0aGlzLmhhbmRsZVJlbGVhc2VcbiAgICB9LCB0aGlzLnByb3BzLmNoaWxkcmVuKTtcbiAgfVxuXG59KTtcbm1vZHVsZS5leHBvcnRzID0gTG9uZ1ByZXNzOyIsIm1vZHVsZS5leHBvcnRzPVt7XCJuYW1lXCI6XCJBYnl6XCIsXCJyZXNvdXJjZVwiOjMsXCJpbmZsdWVuY2VcIjowLFwidHlwZVwiOmZhbHNlfSx7XCJuYW1lXCI6XCJBcmluYW1cIixcInJlc291cmNlXCI6MSxcImluZmx1ZW5jZVwiOjIsXCJ0eXBlXCI6ZmFsc2V9LHtcIm5hbWVcIjpcIkFybm9yXCIsXCJyZXNvdXJjZVwiOjIsXCJpbmZsdWVuY2VcIjoxLFwidHlwZVwiOmZhbHNlfSx7XCJuYW1lXCI6XCJCZXJlZ1wiLFwicmVzb3VyY2VcIjozLFwiaW5mbHVlbmNlXCI6MSxcInR5cGVcIjpmYWxzZX0se1wibmFtZVwiOlwiQ2VudGF1cmlcIixcInJlc291cmNlXCI6MSxcImluZmx1ZW5jZVwiOjMsXCJ0eXBlXCI6ZmFsc2V9LHtcIm5hbWVcIjpcIkNvb3JuZWVxXCIsXCJyZXNvdXJjZVwiOjEsXCJpbmZsdWVuY2VcIjoyLFwidHlwZVwiOmZhbHNlfSx7XCJuYW1lXCI6XCJEYWwgQm9vdGhhXCIsXCJyZXNvdXJjZVwiOjAsXCJpbmZsdWVuY2VcIjoyLFwidHlwZVwiOmZhbHNlfSx7XCJuYW1lXCI6XCJGcmlhXCIsXCJyZXNvdXJjZVwiOjIsXCJpbmZsdWVuY2VcIjowLFwidHlwZVwiOmZhbHNlfSx7XCJuYW1lXCI6XCJHcmFsXCIsXCJyZXNvdXJjZVwiOjEsXCJpbmZsdWVuY2VcIjoxLFwidHlwZVwiOlwiYmx1ZVwifSx7XCJuYW1lXCI6XCJMYXphclwiLFwicmVzb3VyY2VcIjoxLFwiaW5mbHVlbmNlXCI6MCxcInR5cGVcIjpcInllbGxvd1wifSx7XCJuYW1lXCI6XCJMaXJ0YSBJVlwiLFwicmVzb3VyY2VcIjoyLFwiaW5mbHVlbmNlXCI6MyxcInR5cGVcIjpmYWxzZX0se1wibmFtZVwiOlwiTG9kb3IgKyBCZXRhXCIsXCJyZXNvdXJjZVwiOjMsXCJpbmZsdWVuY2VcIjoxLFwidHlwZVwiOmZhbHNlfSx7XCJuYW1lXCI6XCJMb3JcIixcInJlc291cmNlXCI6MSxcImluZmx1ZW5jZVwiOjIsXCJ0eXBlXCI6ZmFsc2V9LHtcIm5hbWVcIjpcIk1lY2F0b2wgUmV4XCIsXCJyZXNvdXJjZVwiOjEsXCJpbmZsdWVuY2VcIjo2LFwidHlwZVwiOmZhbHNlfSx7XCJuYW1lXCI6XCJNZWVyXCIsXCJyZXNvdXJjZVwiOjAsXCJpbmZsdWVuY2VcIjo0LFwidHlwZVwiOlwicmVkXCJ9LHtcIm5hbWVcIjpcIk1laGFyIFh1bGxcIixcInJlc291cmNlXCI6MSxcImluZmx1ZW5jZVwiOjMsXCJ0eXBlXCI6XCJyZWRcIn0se1wibmFtZVwiOlwiTWVsbG9uXCIsXCJyZXNvdXJjZVwiOjAsXCJpbmZsdWVuY2VcIjoyLFwidHlwZVwiOmZhbHNlfSx7XCJuYW1lXCI6XCJOZXcgQWxiaW9uXCIsXCJyZXNvdXJjZVwiOjEsXCJpbmZsdWVuY2VcIjoxLFwidHlwZVwiOlwiZ3JlZW5cIn0se1wibmFtZVwiOlwiUXVhbm4gKyBBbHBoYVwiLFwicmVzb3VyY2VcIjoyLFwiaW5mbHVlbmNlXCI6MSxcInR5cGVcIjpmYWxzZX0se1wibmFtZVwiOlwiUXVjZW4nblwiLFwicmVzb3VyY2VcIjoxLFwiaW5mbHVlbmNlXCI6MixcInR5cGVcIjpmYWxzZX0se1wibmFtZVwiOlwiUmFycm9uXCIsXCJyZXNvdXJjZVwiOjAsXCJpbmZsdWVuY2VcIjozLFwidHlwZVwiOmZhbHNlfSx7XCJuYW1lXCI6XCJSZXNjdWxvblwiLFwicmVzb3VyY2VcIjoyLFwiaW5mbHVlbmNlXCI6MCxcInR5cGVcIjpmYWxzZX0se1wibmFtZVwiOlwiU2FrdWxhZ1wiLFwicmVzb3VyY2VcIjoyLFwiaW5mbHVlbmNlXCI6MSxcInR5cGVcIjpmYWxzZX0se1wibmFtZVwiOlwiU2F1ZG9yXCIsXCJyZXNvdXJjZVwiOjIsXCJpbmZsdWVuY2VcIjoyLFwidHlwZVwiOmZhbHNlfSx7XCJuYW1lXCI6XCJTdGFycG9pbnRcIixcInJlc291cmNlXCI6MyxcImluZmx1ZW5jZVwiOjEsXCJ0eXBlXCI6ZmFsc2V9LHtcIm5hbWVcIjpcIlRhcidNYW5uXCIsXCJyZXNvdXJjZVwiOjEsXCJpbmZsdWVuY2VcIjoxLFwidHlwZVwiOlwiZ3JlZW5cIn0se1wibmFtZVwiOlwiVGVxdSdyYW5cIixcInJlc291cmNlXCI6MixcImluZmx1ZW5jZVwiOjAsXCJ0eXBlXCI6ZmFsc2V9LHtcIm5hbWVcIjpcIlRoaWJhaFwiLFwicmVzb3VyY2VcIjoxLFwiaW5mbHVlbmNlXCI6MSxcInR5cGVcIjpcImJsdWVcIn0se1wibmFtZVwiOlwiVG9ya2FuXCIsXCJyZXNvdXJjZVwiOjAsXCJpbmZsdWVuY2VcIjozLFwidHlwZVwiOmZhbHNlfSx7XCJuYW1lXCI6XCJWZWZ1dCBJSVwiLFwicmVzb3VyY2VcIjoyLFwiaW5mbHVlbmNlXCI6MixcInR5cGVcIjpmYWxzZX0se1wibmFtZVwiOlwiV2VsbG9uXCIsXCJyZXNvdXJjZVwiOjEsXCJpbmZsdWVuY2VcIjoyLFwidHlwZVwiOlwieWVsbG93XCJ9LHtcIm5hbWVcIjpcIlhYZWhhblwiLFwicmVzb3VyY2VcIjoxLFwiaW5mbHVlbmNlXCI6MSxcInR5cGVcIjpmYWxzZX0se1wibmFtZVwiOlwiWm9oYmF0XCIsXCJyZXNvdXJjZVwiOjMsXCJpbmZsdWVuY2VcIjoxLFwidHlwZVwiOmZhbHNlfSx7XCJuYW1lXCI6XCJDcmV1c3NcIixcInJlc291cmNlXCI6NCxcImluZmx1ZW5jZVwiOjIsXCJ0eXBlXCI6XCJob21lXCJ9LHtcIm5hbWVcIjpcIkhlcmNhbnRcIixcInJlc291cmNlXCI6MSxcImluZmx1ZW5jZVwiOjEsXCJ0eXBlXCI6XCJob21lXCJ9LHtcIm5hbWVcIjpcIkFycmV0emVcIixcInJlc291cmNlXCI6MixcImluZmx1ZW5jZVwiOjAsXCJ0eXBlXCI6XCJob21lXCJ9LHtcIm5hbWVcIjpcIkthbWRvcm5cIixcInJlc291cmNlXCI6MCxcImluZmx1ZW5jZVwiOjEsXCJ0eXBlXCI6XCJob21lXCJ9LHtcIm5hbWVcIjpcIkpvbFwiLFwicmVzb3VyY2VcIjoxLFwiaW5mbHVlbmNlXCI6MixcInR5cGVcIjpcImhvbWVcIn0se1wibmFtZVwiOlwiTmFyXCIsXCJyZXNvdXJjZVwiOjIsXCJpbmZsdWVuY2VcIjozLFwidHlwZVwiOlwiaG9tZVwifSx7XCJuYW1lXCI6XCJbMC4wLjBdXCIsXCJyZXNvdXJjZVwiOjUsXCJpbmZsdWVuY2VcIjowLFwidHlwZVwiOlwiaG9tZVwifSx7XCJuYW1lXCI6XCJBcmMgUHJpbWVcIixcInJlc291cmNlXCI6NCxcImluZmx1ZW5jZVwiOjAsXCJ0eXBlXCI6XCJob21lXCJ9LHtcIm5hbWVcIjpcIldyZW4gVGVycmFcIixcInJlc291cmNlXCI6MixcImluZmx1ZW5jZVwiOjEsXCJ0eXBlXCI6XCJob21lXCJ9LHtcIm5hbWVcIjpcIk1vbGwgUHJpbXVzXCIsXCJyZXNvdXJjZVwiOjQsXCJpbmZsdWVuY2VcIjoxLFwidHlwZVwiOlwiaG9tZVwifSx7XCJuYW1lXCI6XCJNdXVhdFwiLFwicmVzb3VyY2VcIjo0LFwiaW5mbHVlbmNlXCI6MSxcInR5cGVcIjpcImhvbWVcIn0se1wibmFtZVwiOlwiRHJ1YWFcIixcInJlc291cmNlXCI6MyxcImluZmx1ZW5jZVwiOjEsXCJ0eXBlXCI6XCJob21lXCJ9LHtcIm5hbWVcIjpcIk1hYWx1dWtcIixcInJlc291cmNlXCI6MCxcImluZmx1ZW5jZVwiOjIsXCJ0eXBlXCI6XCJob21lXCJ9LHtcIm5hbWVcIjpcIk1vcmRhaSBJSVwiLFwicmVzb3VyY2VcIjo0LFwiaW5mbHVlbmNlXCI6MCxcInR5cGVcIjpcImhvbWVcIn0se1wibmFtZVwiOlwiTGlzaXMgSUlcIixcInJlc291cmNlXCI6MSxcImluZmx1ZW5jZVwiOjAsXCJ0eXBlXCI6XCJob21lXCJ9LHtcIm5hbWVcIjpcIlJhZ2hcIixcInJlc291cmNlXCI6MixcImluZmx1ZW5jZVwiOjEsXCJ0eXBlXCI6XCJob21lXCJ9LHtcIm5hbWVcIjpcIlRyZW4nTGFrXCIsXCJyZXNvdXJjZVwiOjEsXCJpbmZsdWVuY2VcIjowLFwidHlwZVwiOlwiaG9tZVwifSx7XCJuYW1lXCI6XCJRdWluYXJyYVwiLFwicmVzb3VyY2VcIjozLFwiaW5mbHVlbmNlXCI6MSxcInR5cGVcIjpcImhvbWVcIn0se1wibmFtZVwiOlwiSm9yZFwiLFwicmVzb3VyY2VcIjo0LFwiaW5mbHVlbmNlXCI6MixcInR5cGVcIjpcImhvbWVcIn0se1wibmFtZVwiOlwiV2lubnVcIixcInJlc291cmNlXCI6MyxcImluZmx1ZW5jZVwiOjQsXCJ0eXBlXCI6XCJob21lXCJ9LHtcIm5hbWVcIjpcIkFyY2hvbiBXcmVuXCIsXCJyZXNvdXJjZVwiOjIsXCJpbmZsdWVuY2VcIjozLFwidHlwZVwiOlwiaG9tZVwifSx7XCJuYW1lXCI6XCJBcmNob24gVGF1XCIsXCJyZXNvdXJjZVwiOjEsXCJpbmZsdWVuY2VcIjoxLFwidHlwZVwiOlwiaG9tZVwifSx7XCJuYW1lXCI6XCJEYXJpZW5cIixcInJlc291cmNlXCI6NCxcImluZmx1ZW5jZVwiOjQsXCJ0eXBlXCI6XCJob21lXCJ9LHtcIm5hbWVcIjpcIlJldGlsbGlvblwiLFwicmVzb3VyY2VcIjoyLFwiaW5mbHVlbmNlXCI6MyxcInR5cGVcIjpcImhvbWVcIn0se1wibmFtZVwiOlwiU2hhbGxvcVwiLFwicmVzb3VyY2VcIjoxLFwiaW5mbHVlbmNlXCI6MixcInR5cGVcIjpcImhvbWVcIn1dIl19
