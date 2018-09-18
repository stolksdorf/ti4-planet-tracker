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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvbWFpbi9jb250cm9scy9jb250cm9scy5qc3giLCJjbGllbnQvbWFpbi9jb250cm9scy9jb250cm9scy5sZXNzIiwiY2xpZW50L21haW4vbWFpbi5qc3giLCJjbGllbnQvbWFpbi9tYWluLmxlc3MiLCJjbGllbnQvbWFpbi9wbGFuZXRMaXN0L3BsYW5ldExpc3QuanN4IiwiY2xpZW50L21haW4vcGxhbmV0L3BsYW5ldC5qc3giLCJjbGllbnQvbWFpbi9zdW1tYXJ5L3N1bW1hcnkuanN4IiwiY2xpZW50L3NoYXJlZC9sb25nUHJlc3MuanN4IiwiY2xpZW50L3NoYXJlZC9wbGFuZXRzLnlhbWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwRkE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakZBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3hHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDN0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJyZXF1aXJlKCcuL2NvbnRyb2xzLmxlc3MnKTtcblxuY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5jb25zdCBjcmVhdGVDbGFzcyA9IHJlcXVpcmUoJ2NyZWF0ZS1yZWFjdC1jbGFzcycpO1xuXG5jb25zdCBjeCA9IHJlcXVpcmUoJ2NsYXNzbmFtZXMnKTtcblxuY29uc3QgTG9uZ1ByZXNzID0gcmVxdWlyZSgnc2hhcmVkL2xvbmdQcmVzcy5qc3gnKTtcblxuY29uc3QgaXNTYW1lID0gKHNldEEsIHNldEIpID0+IHtcbiAgaWYgKHNldEEuc2l6ZSAhPT0gc2V0Qi5zaXplKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiBBcnJheS5mcm9tKHNldEEpLmV2ZXJ5KHZhbCA9PiBzZXRCLmhhcyh2YWwpKTtcbn07XG5cbmNvbnN0IENvbnRyb2xzID0gY3JlYXRlQ2xhc3Moe1xuICBkaXNwbGF5TmFtZTogJ0NvbnRyb2xzJyxcblxuICBnZXREZWZhdWx0UHJvcHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGVWaXNpYmxlOiAnbm90X293bmVkJyxcbiAgICAgIC8vJ293bmVkJywgJ2JvdGgnXG4gICAgICBvbkNoYW5nZVZpc2libGU6ICgpID0+IHt9LFxuICAgICAgb3duZWQ6IG5ldyBTZXQoW10pLFxuICAgICAgZXhoYXVzdGVkOiBuZXcgU2V0KFtdKSxcbiAgICAgIGJvb2ttYXJrOiBuZXcgU2V0KFtdKSxcbiAgICAgIHVwZGF0ZUV4aGF1c3RlZDogKCkgPT4ge30sXG4gICAgICB1cGRhdGVPd25lZDogKCkgPT4ge30sXG4gICAgICB1cGRhdGVCb29rbWFyazogKCkgPT4ge31cbiAgICB9O1xuICB9LFxuXG4gIHRvZ2dsZVNob3coKSB7XG4gICAgLy8gaWYodGhpcy5wcm9wcy50eXBlVmlzaWJsZSA9PSAnYm90aCcpIHJldHVybiB0aGlzLnByb3BzLm9uQ2hhbmdlVmlzaWJsZSgnb3duZWQnKTtcbiAgICAvLyBpZih0aGlzLnByb3BzLnR5cGVWaXNpYmxlID09ICdvd25lZCcpIHJldHVybiB0aGlzLnByb3BzLm9uQ2hhbmdlVmlzaWJsZSgnbm90X293bmVkJyk7XG4gICAgLy8gaWYodGhpcy5wcm9wcy50eXBlVmlzaWJsZSA9PSAnbm90X293bmVkJykgcmV0dXJuIHRoaXMucHJvcHMub25DaGFuZ2VWaXNpYmxlKCdib3RoJyk7XG4gICAgaWYgKHRoaXMucHJvcHMudHlwZVZpc2libGUgPT0gJ2JvdGgnKSByZXR1cm4gdGhpcy5wcm9wcy5vbkNoYW5nZVZpc2libGUoJ293bmVkJyk7XG4gICAgaWYgKHRoaXMucHJvcHMudHlwZVZpc2libGUgPT0gJ293bmVkJykgcmV0dXJuIHRoaXMucHJvcHMub25DaGFuZ2VWaXNpYmxlKCdub3Rfb3duZWQnKTtcbiAgICBpZiAodGhpcy5wcm9wcy50eXBlVmlzaWJsZSA9PSAnbm90X293bmVkJykgcmV0dXJuIHRoaXMucHJvcHMub25DaGFuZ2VWaXNpYmxlKCdvd25lZCcpO1xuICB9LFxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB0ZW1wID0gaXNTYW1lKHRoaXMucHJvcHMuZXhoYXVzdGVkLCB0aGlzLnByb3BzLmJvb2ttYXJrKTtcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XG4gICAgICBjbGFzc05hbWU6IFwiQ29udHJvbHNcIlxuICAgIH0sIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTG9uZ1ByZXNzLCB7XG4gICAgICBjbGFzc05hbWU6IFwiYnRuIHJlZnJlc2hcIixcbiAgICAgIHdhaXQ6IDgwMCxcbiAgICAgIG9uUHJlc3M6ICgpID0+IHRoaXMucHJvcHMudXBkYXRlRXhoYXVzdGVkKG5ldyBTZXQoW10pKSxcbiAgICAgIG9uTG9uZ1ByZXNzOiAoKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMudXBkYXRlRXhoYXVzdGVkKG5ldyBTZXQoW10pKTtcbiAgICAgICAgdGhpcy5wcm9wcy51cGRhdGVPd25lZChuZXcgU2V0KFtdKSk7XG4gICAgICB9XG4gICAgfSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImlcIiwge1xuICAgICAgY2xhc3NOYW1lOiBcImZhIGZhLXJlZnJlc2hcIlxuICAgIH0pKSwgUmVhY3QuY3JlYXRlRWxlbWVudChMb25nUHJlc3MsIHtcbiAgICAgIGNsYXNzTmFtZTogXCJidG4gb3duZXJzaGlwXCIsXG4gICAgICBvblByZXNzOiB0aGlzLnRvZ2dsZVNob3csXG4gICAgICBvbkxvbmdQcmVzczogKCkgPT4gdGhpcy5wcm9wcy5vbkNoYW5nZVZpc2libGUoJ2JvdGgnKVxuICAgIH0sIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpXCIsIHtcbiAgICAgIGNsYXNzTmFtZTogY3goJ2ZhJywge1xuICAgICAgICAnZmEtY2lyY2xlJzogdGhpcy5wcm9wcy50eXBlVmlzaWJsZSA9PSAnb3duZWQnLFxuICAgICAgICAnZmEtY2lyY2xlLW8nOiB0aGlzLnByb3BzLnR5cGVWaXNpYmxlID09ICdub3Rfb3duZWQnLFxuICAgICAgICAnZmEtc3RvcC1jaXJjbGUtbyc6IHRoaXMucHJvcHMudHlwZVZpc2libGUgPT0gJ2JvdGgnXG4gICAgICB9KVxuICAgIH0pKSwgUmVhY3QuY3JlYXRlRWxlbWVudChMb25nUHJlc3MsIHtcbiAgICAgIGNsYXNzTmFtZTogXCJidG4gYm9va21hcmtcIixcbiAgICAgIG9uUHJlc3M6ICgpID0+IHtcbiAgICAgICAgY29uc3QgdGVtcCA9IHRoaXMucHJvcHMuYm9va21hcms7XG4gICAgICAgIHRoaXMucHJvcHMudXBkYXRlQm9va21hcmsodGhpcy5wcm9wcy5leGhhdXN0ZWQpO1xuICAgICAgICB0aGlzLnByb3BzLnVwZGF0ZUV4aGF1c3RlZCh0ZW1wKTtcbiAgICAgIH0sXG4gICAgICBvbkxvbmdQcmVzczogKCkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLnVwZGF0ZUJvb2ttYXJrKHRoaXMucHJvcHMuZXhoYXVzdGVkKTtcbiAgICAgIH1cbiAgICB9LCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaVwiLCB7XG4gICAgICBjbGFzc05hbWU6IGN4KCdmYScsIHtcbiAgICAgICAgJ2ZhLWJvb2ttYXJrLW8nOiB0ZW1wLFxuICAgICAgICAnZmEtYm9va21hcmsnOiAhdGVtcFxuICAgICAgfSlcbiAgICB9KSkpO1xuICB9XG5cbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBDb250cm9sczsiLCIiLCJyZXF1aXJlKCcuL21haW4ubGVzcycpO1xuXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IGNyZWF0ZUNsYXNzID0gcmVxdWlyZSgnY3JlYXRlLXJlYWN0LWNsYXNzJyk7XG5cbmNvbnN0IGN4ID0gcmVxdWlyZSgnY2xhc3NuYW1lcycpO1xuXG5jb25zdCBDb250cm9scyA9IHJlcXVpcmUoJy4vY29udHJvbHMvY29udHJvbHMuanN4Jyk7XG5cbmNvbnN0IFN1bW1hcnkgPSByZXF1aXJlKCcuL3N1bW1hcnkvc3VtbWFyeS5qc3gnKTtcblxuY29uc3QgUGxhbmV0TGlzdCA9IHJlcXVpcmUoJy4vcGxhbmV0TGlzdC9wbGFuZXRMaXN0LmpzeCcpO1xuXG5jb25zdCBNYWluID0gY3JlYXRlQ2xhc3Moe1xuICBkaXNwbGF5TmFtZTogJ01haW4nLFxuXG4gIGdldERlZmF1bHRQcm9wcygpIHtcbiAgICByZXR1cm4ge307XG4gIH0sXG5cbiAgZ2V0SW5pdGlhbFN0YXRlKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzaG93OiAnb3duZWQnLFxuICAgICAgLy8gJ293bmVkJywgJ25vdF9vd25lZCdcbiAgICAgIGV4aGF1c3RlZDogbmV3IFNldChbXSksXG4gICAgICBvd25lZDogbmV3IFNldChbXSksXG4gICAgICBib29rbWFyazogbmV3IFNldChbXSlcbiAgICB9O1xuICB9LFxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZXhoYXVzdGVkJykpIHtcbiAgICAgIHRoaXMuc3RhdGUuZXhoYXVzdGVkID0gbmV3IFNldChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZXhoYXVzdGVkJykuc3BsaXQoJywnKSk7XG4gICAgfVxuXG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdvd25lZCcpKSB7XG4gICAgICB0aGlzLnN0YXRlLm93bmVkID0gbmV3IFNldChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnb3duZWQnKS5zcGxpdCgnLCcpKTtcbiAgICB9XG5cbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2Jvb2ttYXJrJykpIHtcbiAgICAgIHRoaXMuc3RhdGUuYm9va21hcmsgPSBuZXcgU2V0KGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdib29rbWFyaycpLnNwbGl0KCcsJykpO1xuICAgIH1cblxuICAgIHRoaXMuc2V0U3RhdGUodGhpcy5zdGF0ZSk7XG4gIH0sXG5cbiAgdXBkYXRlU2V0KGtleSwgdmFsKSB7XG4gICAgdGhpcy5zdGF0ZVtrZXldID0gbmV3IFNldCh2YWwpO1xuICAgIHRoaXMuc2V0U3RhdGUodGhpcy5zdGF0ZSwgKCkgPT4ge1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBBcnJheS5mcm9tKHRoaXMuc3RhdGVba2V5XSkpO1xuICAgIH0pO1xuICB9LFxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XG4gICAgICBjbGFzc05hbWU6IFwiTWFpblwiXG4gICAgfSwgUmVhY3QuY3JlYXRlRWxlbWVudChDb250cm9scywge1xuICAgICAgb3duZWQ6IHRoaXMuc3RhdGUub3duZWQsXG4gICAgICBleGhhdXN0ZWQ6IHRoaXMuc3RhdGUuZXhoYXVzdGVkLFxuICAgICAgYm9va21hcms6IHRoaXMuc3RhdGUuYm9va21hcmssXG4gICAgICB1cGRhdGVFeGhhdXN0ZWQ6IGV4aGF1c3RlZCA9PiB0aGlzLnVwZGF0ZVNldCgnZXhoYXVzdGVkJywgZXhoYXVzdGVkKSxcbiAgICAgIHVwZGF0ZU93bmVkOiBvd25lZCA9PiB0aGlzLnVwZGF0ZVNldCgnb3duZWQnLCBvd25lZCksXG4gICAgICB1cGRhdGVCb29rbWFyazogYm9va21hcmsgPT4gdGhpcy51cGRhdGVTZXQoJ2Jvb2ttYXJrJywgYm9va21hcmspLFxuICAgICAgdHlwZVZpc2libGU6IHRoaXMuc3RhdGUuc2hvdyxcbiAgICAgIG9uQ2hhbmdlVmlzaWJsZTogc2hvdyA9PiB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgc2hvd1xuICAgICAgfSlcbiAgICB9KSwgUmVhY3QuY3JlYXRlRWxlbWVudChTdW1tYXJ5LCB7XG4gICAgICBvd25lZDogdGhpcy5zdGF0ZS5vd25lZCxcbiAgICAgIGV4aGF1c3RlZDogdGhpcy5zdGF0ZS5leGhhdXN0ZWRcbiAgICB9KSwgUmVhY3QuY3JlYXRlRWxlbWVudChQbGFuZXRMaXN0LCB7XG4gICAgICB1cGRhdGVFeGhhdXN0ZWQ6IGV4aGF1c3RlZCA9PiB0aGlzLnVwZGF0ZVNldCgnZXhoYXVzdGVkJywgZXhoYXVzdGVkKSxcbiAgICAgIHVwZGF0ZU93bmVkOiBvd25lZCA9PiB0aGlzLnVwZGF0ZVNldCgnb3duZWQnLCBvd25lZCksXG4gICAgICBvd25lZDogdGhpcy5zdGF0ZS5vd25lZCxcbiAgICAgIGV4aGF1c3RlZDogdGhpcy5zdGF0ZS5leGhhdXN0ZWQsXG4gICAgICBzaG93OiB0aGlzLnN0YXRlLnNob3dcbiAgICB9KSk7XG4gIH1cblxufSk7XG5tb2R1bGUuZXhwb3J0cyA9IE1haW47IiwicmVxdWlyZSgnQzpcXFxcRHJvcGJveFxcXFxyb290XFxcXFByb2dyYW1taW5nXFxcXEphdmFzY3JpcHRcXFxcdGk0LXBsYW5ldC10cmFja2VyXFxcXGNsaWVudFxcXFxzaGFyZWRcXFxccmVzZXQubGVzcycpOyIsImZ1bmN0aW9uIF9leHRlbmRzKCkgeyBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07IHJldHVybiBfZXh0ZW5kcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9XG5cbnJlcXVpcmUoJy4vcGxhbmV0TGlzdC5sZXNzJyk7XG5cbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuY29uc3QgY3JlYXRlQ2xhc3MgPSByZXF1aXJlKCdjcmVhdGUtcmVhY3QtY2xhc3MnKTtcblxuY29uc3QgY3ggPSByZXF1aXJlKCdjbGFzc25hbWVzJyk7XG5cbmNvbnN0IFBsYW5ldHMgPSByZXF1aXJlKCdzaGFyZWQvcGxhbmV0cy55YW1sJyk7XG5cbmNvbnN0IFBsYW5ldCA9IHJlcXVpcmUoJy4uL3BsYW5ldC9wbGFuZXQuanN4Jyk7XG5cbmNvbnN0IFBsYW5ldExpc3QgPSBjcmVhdGVDbGFzcyh7XG4gIGRpc3BsYXlOYW1lOiAnUGxhbmV0TGlzdCcsXG5cbiAgZ2V0RGVmYXVsdFByb3BzKCkge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGVFeGhhdXN0ZWQ6ICgpID0+IHt9LFxuICAgICAgdXBkYXRlT3duZWQ6ICgpID0+IHt9LFxuICAgICAgb3duZWQ6IG5ldyBTZXQoW10pLFxuICAgICAgZXhoYXVzdGVkOiBuZXcgU2V0KFtdKSxcbiAgICAgIHNob3c6ICdvd25lZCdcbiAgICB9O1xuICB9LFxuXG4gIGdldEluaXRpYWxTdGF0ZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc29ydDogJ25hbWUnIC8vJ2luZmx1ZW5jZScsICdyZXNvdXJjZSdcblxuICAgIH07XG4gIH0sXG5cbiAgZXhoYXVzdChuYW1lKSB7XG4gICAgaWYgKCF0aGlzLnByb3BzLm93bmVkLmhhcyhuYW1lKSkgcmV0dXJuO1xuICAgIHRoaXMucHJvcHMuZXhoYXVzdGVkLmhhcyhuYW1lKSA/IHRoaXMucHJvcHMuZXhoYXVzdGVkLmRlbGV0ZShuYW1lKSA6IHRoaXMucHJvcHMuZXhoYXVzdGVkLmFkZChuYW1lKTtcbiAgICB0aGlzLnByb3BzLnVwZGF0ZUV4aGF1c3RlZCh0aGlzLnByb3BzLmV4aGF1c3RlZCk7XG4gIH0sXG5cbiAgb3duKG5hbWUpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5vd25lZC5oYXMobmFtZSkpIHtcbiAgICAgIHRoaXMucHJvcHMub3duZWQuZGVsZXRlKG5hbWUpO1xuICAgICAgdGhpcy5wcm9wcy5leGhhdXN0ZWQuZGVsZXRlKG5hbWUpO1xuICAgICAgdGhpcy5wcm9wcy51cGRhdGVFeGhhdXN0ZWQodGhpcy5wcm9wcy5leGhhdXN0ZWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnByb3BzLm93bmVkLmFkZChuYW1lKTtcbiAgICB9XG5cbiAgICB0aGlzLnByb3BzLnVwZGF0ZU93bmVkKHRoaXMucHJvcHMub3duZWQpO1xuICB9LFxuXG4gIGdldFNvcnRlZCgpIHtcbiAgICBjb25zdCBzb3J0VGVybSA9IHRoaXMuc3RhdGUuc29ydDtcbiAgICBsZXQgcmVzdWx0ID0gUGxhbmV0cy5zb3J0KChhLCBiKSA9PiBhLm5hbWUubG9jYWxlQ29tcGFyZShiLm5hbWUpKTtcbiAgICBpZiAoc29ydFRlcm0gPT0gJ2luZmx1ZW5jZScpIHJldHVybiByZXN1bHQuc29ydCgoYSwgYikgPT4gYi5pbmZsdWVuY2UgLSBhLmluZmx1ZW5jZSk7XG4gICAgaWYgKHNvcnRUZXJtID09ICdyZXNvdXJjZScpIHJldHVybiByZXN1bHQuc29ydCgoYSwgYikgPT4gYi5yZXNvdXJjZSAtIGEucmVzb3VyY2UpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH0sXG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcbiAgICAgIGNsYXNzTmFtZTogXCJQbGFuZXRMaXN0XCJcbiAgICB9LCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcbiAgICAgIGNsYXNzTmFtZTogXCJzb3J0aW5nXCJcbiAgICB9LCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcbiAgICAgIGNsYXNzTmFtZTogY3goJ25hbWUnLCB7XG4gICAgICAgIHNlbGVjdGVkOiB0aGlzLnN0YXRlLnNvcnQgPT0gJ25hbWUnXG4gICAgICB9KSxcbiAgICAgIG9uQ2xpY2s6ICgpID0+IHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBzb3J0OiAnbmFtZSdcbiAgICAgIH0pXG4gICAgfSwgXCJuYW1lXCIpLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcbiAgICAgIGNsYXNzTmFtZTogY3goJ3Jlc291cmNlJywge1xuICAgICAgICBzZWxlY3RlZDogdGhpcy5zdGF0ZS5zb3J0ID09ICdyZXNvdXJjZSdcbiAgICAgIH0pLFxuICAgICAgb25DbGljazogKCkgPT4gdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHNvcnQ6ICdyZXNvdXJjZSdcbiAgICAgIH0pXG4gICAgfSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImlcIiwge1xuICAgICAgY2xhc3NOYW1lOiBcImZhIGZhLWN1YmVzXCJcbiAgICB9KSksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1xuICAgICAgY2xhc3NOYW1lOiBjeCgnaW5mbHVlbmNlJywge1xuICAgICAgICBzZWxlY3RlZDogdGhpcy5zdGF0ZS5zb3J0ID09ICdpbmZsdWVuY2UnXG4gICAgICB9KSxcbiAgICAgIG9uQ2xpY2s6ICgpID0+IHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBzb3J0OiAnaW5mbHVlbmNlJ1xuICAgICAgfSlcbiAgICB9LCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaVwiLCB7XG4gICAgICBjbGFzc05hbWU6IFwiZmEgZmEtZ2dcIlxuICAgIH0pKSksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1xuICAgICAgY2xhc3NOYW1lOiBjeCgncGxhbmV0cycsIHRoaXMucHJvcHMuc2hvdylcbiAgICB9LCB0aGlzLmdldFNvcnRlZCgpLm1hcChwbGFuZXQgPT4ge1xuICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUGxhbmV0LCBfZXh0ZW5kcyh7XG4gICAgICAgIGtleTogcGxhbmV0Lm5hbWUsXG4gICAgICAgIG9uUHJlc3M6ICgpID0+IHRoaXMuZXhoYXVzdChwbGFuZXQubmFtZSksXG4gICAgICAgIG9uTG9uZ1ByZXNzOiAoKSA9PiB0aGlzLm93bihwbGFuZXQubmFtZSksXG4gICAgICAgIGV4aGF1c3RlZDogdGhpcy5wcm9wcy5leGhhdXN0ZWQuaGFzKHBsYW5ldC5uYW1lKSxcbiAgICAgICAgb3duZWQ6IHRoaXMucHJvcHMub3duZWQuaGFzKHBsYW5ldC5uYW1lKVxuICAgICAgfSwgcGxhbmV0KSk7XG4gICAgfSkpKTtcbiAgfVxuXG59KTtcbm1vZHVsZS5leHBvcnRzID0gUGxhbmV0TGlzdDsiLCJyZXF1aXJlKCcuL3BsYW5ldC5sZXNzJyk7XG5cbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuY29uc3QgY3JlYXRlQ2xhc3MgPSByZXF1aXJlKCdjcmVhdGUtcmVhY3QtY2xhc3MnKTtcblxuY29uc3QgY3ggPSByZXF1aXJlKCdjbGFzc25hbWVzJyk7XG5cbmNvbnN0IExvbmdQcmVzcyA9IHJlcXVpcmUoJ3NoYXJlZC9sb25nUHJlc3MuanN4Jyk7XG5cbmNvbnN0IFBsYW5ldCA9IGNyZWF0ZUNsYXNzKHtcbiAgZ2V0RGVmYXVsdFByb3BzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiAnJyxcbiAgICAgIGV4aGF1c3RlZDogZmFsc2UsXG4gICAgICBvd25lZDogZmFsc2UsXG4gICAgICBpbmZsdWVuY2U6IDAsXG4gICAgICByZXNvdXJjZTogMCxcbiAgICAgIHR5cGU6IGZhbHNlLFxuICAgICAgb25QcmVzczogKCkgPT4ge30sXG4gICAgICBvbkxvbmdQcmVzczogKCkgPT4ge31cbiAgICB9O1xuICB9LFxuXG4gIHJlbmRlclR5cGUoKSB7XG4gICAgaWYgKCF0aGlzLnByb3BzLnR5cGUpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IHR5cGVzID0ge1xuICAgICAgaG9tZTogJ2hvbWUnLFxuICAgICAgeWVsbG93OiAnY2lyY2xlJyxcbiAgICAgIHJlZDogJ2NpcmNsZScsXG4gICAgICBibHVlOiAnY2lyY2xlJyxcbiAgICAgIGdyZWVuOiAnY2lyY2xlJ1xuICAgIH07XG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpXCIsIHtcbiAgICAgIGNsYXNzTmFtZTogYGZhIGZhLSR7dHlwZXNbdGhpcy5wcm9wcy50eXBlXX0gJHt0aGlzLnByb3BzLnR5cGV9YFxuICAgIH0pO1xuICB9LFxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBleGhhdXN0ZWQsXG4gICAgICBvd25lZFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KExvbmdQcmVzcywge1xuICAgICAgY2xhc3NOYW1lOiBjeCgnUGxhbmV0Jywge1xuICAgICAgICBleGhhdXN0ZWQsXG4gICAgICAgIG93bmVkLFxuICAgICAgICB1bm93bmVkOiAhb3duZWRcbiAgICAgIH0pLFxuICAgICAgb25QcmVzczogdGhpcy5wcm9wcy5vblByZXNzLFxuICAgICAgb25Mb25nUHJlc3M6IHRoaXMucHJvcHMub25Mb25nUHJlc3NcbiAgICB9LCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcbiAgICAgIGNsYXNzTmFtZTogXCJuYW1lXCJcbiAgICB9LCB0aGlzLnByb3BzLm5hbWUsIHRoaXMucmVuZGVyVHlwZSgpKSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XG4gICAgICBjbGFzc05hbWU6IFwicmVzb3VyY2VcIlxuICAgIH0sIHRoaXMucHJvcHMucmVzb3VyY2UpLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcbiAgICAgIGNsYXNzTmFtZTogXCJpbmZsdWVuY2VcIlxuICAgIH0sIHRoaXMucHJvcHMuaW5mbHVlbmNlKSk7XG4gIH1cblxufSk7XG5tb2R1bGUuZXhwb3J0cyA9IFBsYW5ldDsiLCJyZXF1aXJlKCcuL3N1bW1hcnkubGVzcycpO1xuXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IGNyZWF0ZUNsYXNzID0gcmVxdWlyZSgnY3JlYXRlLXJlYWN0LWNsYXNzJyk7XG5cbmNvbnN0IGN4ID0gcmVxdWlyZSgnY2xhc3NuYW1lcycpO1xuXG5jb25zdCBQbGFuZXRzID0gcmVxdWlyZSgnc2hhcmVkL3BsYW5ldHMueWFtbCcpO1xuXG5jb25zdCBTdW1tYXJ5ID0gY3JlYXRlQ2xhc3Moe1xuICBkaXNwbGF5TmFtZTogJ1N1bW1hcnknLFxuXG4gIGdldERlZmF1bHRQcm9wcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgb3duZWQ6IG5ldyBTZXQoW10pLFxuICAgICAgZXhoYXVzdGVkOiBuZXcgU2V0KFtdKVxuICAgIH07XG4gIH0sXG5cbiAgZ2V0U3VtKCkge1xuICAgIGNvbnN0IG93bmVkID0gUGxhbmV0cy5maWx0ZXIocGxhbmV0ID0+IHRoaXMucHJvcHMub3duZWQuaGFzKHBsYW5ldC5uYW1lKSk7XG4gICAgcmV0dXJuIG93bmVkLnJlZHVjZSgoYWNjLCBwbGFuZXQpID0+IHtcbiAgICAgIGFjYy5pbmZsdWVuY2VfdG90YWwgKz0gcGxhbmV0LmluZmx1ZW5jZTtcbiAgICAgIGFjYy5yZXNvdXJjZV90b3RhbCArPSBwbGFuZXQucmVzb3VyY2U7XG5cbiAgICAgIGlmICghdGhpcy5wcm9wcy5leGhhdXN0ZWQuaGFzKHBsYW5ldC5uYW1lKSkge1xuICAgICAgICBhY2MuaW5mbHVlbmNlICs9IHBsYW5ldC5pbmZsdWVuY2U7XG4gICAgICAgIGFjYy5yZXNvdXJjZSArPSBwbGFuZXQucmVzb3VyY2U7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBhY2M7XG4gICAgfSwge1xuICAgICAgaW5mbHVlbmNlOiAwLFxuICAgICAgaW5mbHVlbmNlX3RvdGFsOiAwLFxuICAgICAgcmVzb3VyY2U6IDAsXG4gICAgICByZXNvdXJjZV90b3RhbDogMFxuICAgIH0pO1xuICB9LFxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBjb3VudCA9IHRoaXMuZ2V0U3VtKCk7XG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1xuICAgICAgY2xhc3NOYW1lOiBcIlN1bW1hcnlcIlxuICAgIH0sIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1xuICAgICAgY2xhc3NOYW1lOiBcInJlc291cmNlXCJcbiAgICB9LCBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIiwgbnVsbCwgXCJyZXNvdXJjZVwiKSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImgyXCIsIG51bGwsIGNvdW50LnJlc291cmNlKSwgUmVhY3QuY3JlYXRlRWxlbWVudChcInNtYWxsXCIsIG51bGwsIGNvdW50LnJlc291cmNlX3RvdGFsKSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImlcIiwge1xuICAgICAgY2xhc3NOYW1lOiBcImZhIGZhLWN1YmVzXCJcbiAgICB9KSksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1xuICAgICAgY2xhc3NOYW1lOiBcImluZmx1ZW5jZVwiXG4gICAgfSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIG51bGwsIFwiaW5mbHVlbmNlXCIpLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaDJcIiwgbnVsbCwgY291bnQuaW5mbHVlbmNlKSwgUmVhY3QuY3JlYXRlRWxlbWVudChcInNtYWxsXCIsIG51bGwsIGNvdW50LmluZmx1ZW5jZV90b3RhbCksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpXCIsIHtcbiAgICAgIGNsYXNzTmFtZTogXCJmYSBmYS1nZ1wiXG4gICAgfSkpKTtcbiAgfVxuXG59KTtcbm1vZHVsZS5leHBvcnRzID0gU3VtbWFyeTsiLCJjb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IGNyZWF0ZUNsYXNzID0gcmVxdWlyZSgnY3JlYXRlLXJlYWN0LWNsYXNzJyk7XG5cbmNvbnN0IExvbmdQcmVzcyA9IGNyZWF0ZUNsYXNzKHtcbiAgZ2V0RGVmYXVsdFByb3BzKCkge1xuICAgIHJldHVybiB7XG4gICAgICB3YWl0OiA1MDAsXG4gICAgICBvblByZXNzOiAoKSA9PiB7fSxcbiAgICAgIG9uTG9uZ1ByZXNzOiAoKSA9PiB7fVxuICAgIH07XG4gIH0sXG5cbiAgdGltZXI6IG51bGwsXG5cbiAgaGFuZGxlUHJlc3MoKSB7XG4gICAgdGhpcy50aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5wcm9wcy5vbkxvbmdQcmVzcygpO1xuICAgICAgdGhpcy50aW1lciA9IGZhbHNlO1xuICAgIH0sIHRoaXMucHJvcHMud2FpdCk7XG4gIH0sXG5cbiAgaGFuZGxlUmVsZWFzZSgpIHtcbiAgICBpZiAodGhpcy50aW1lciAhPT0gZmFsc2UpIHRoaXMucHJvcHMub25QcmVzcygpO1xuICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lcik7XG4gIH0sXG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcbiAgICAgIGNsYXNzTmFtZTogdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICBvbk1vdXNlRG93bjogdGhpcy5oYW5kbGVQcmVzcyxcbiAgICAgIG9uTW91c2VVcDogdGhpcy5oYW5kbGVSZWxlYXNlXG4gICAgfSwgdGhpcy5wcm9wcy5jaGlsZHJlbik7XG4gIH1cblxufSk7XG5tb2R1bGUuZXhwb3J0cyA9IExvbmdQcmVzczsiLCJtb2R1bGUuZXhwb3J0cz1be1wibmFtZVwiOlwiQWJ5elwiLFwicmVzb3VyY2VcIjozLFwiaW5mbHVlbmNlXCI6MCxcInR5cGVcIjpmYWxzZX0se1wibmFtZVwiOlwiQXJpbmFtXCIsXCJyZXNvdXJjZVwiOjEsXCJpbmZsdWVuY2VcIjoyLFwidHlwZVwiOmZhbHNlfSx7XCJuYW1lXCI6XCJBcm5vclwiLFwicmVzb3VyY2VcIjoyLFwiaW5mbHVlbmNlXCI6MSxcInR5cGVcIjpmYWxzZX0se1wibmFtZVwiOlwiQmVyZWdcIixcInJlc291cmNlXCI6MyxcImluZmx1ZW5jZVwiOjEsXCJ0eXBlXCI6ZmFsc2V9LHtcIm5hbWVcIjpcIkNlbnRhdXJpXCIsXCJyZXNvdXJjZVwiOjEsXCJpbmZsdWVuY2VcIjozLFwidHlwZVwiOmZhbHNlfSx7XCJuYW1lXCI6XCJDb29ybmVlcVwiLFwicmVzb3VyY2VcIjoxLFwiaW5mbHVlbmNlXCI6MixcInR5cGVcIjpmYWxzZX0se1wibmFtZVwiOlwiRGFsIEJvb3RoYVwiLFwicmVzb3VyY2VcIjowLFwiaW5mbHVlbmNlXCI6MixcInR5cGVcIjpmYWxzZX0se1wibmFtZVwiOlwiRnJpYVwiLFwicmVzb3VyY2VcIjoyLFwiaW5mbHVlbmNlXCI6MCxcInR5cGVcIjpmYWxzZX0se1wibmFtZVwiOlwiR3JhbFwiLFwicmVzb3VyY2VcIjoxLFwiaW5mbHVlbmNlXCI6MSxcInR5cGVcIjpcImJsdWVcIn0se1wibmFtZVwiOlwiTGF6YXJcIixcInJlc291cmNlXCI6MSxcImluZmx1ZW5jZVwiOjAsXCJ0eXBlXCI6XCJ5ZWxsb3dcIn0se1wibmFtZVwiOlwiTGlydGEgSVZcIixcInJlc291cmNlXCI6MixcImluZmx1ZW5jZVwiOjMsXCJ0eXBlXCI6ZmFsc2V9LHtcIm5hbWVcIjpcIkxvZG9yICsgQmV0YVwiLFwicmVzb3VyY2VcIjozLFwiaW5mbHVlbmNlXCI6MSxcInR5cGVcIjpmYWxzZX0se1wibmFtZVwiOlwiTG9yXCIsXCJyZXNvdXJjZVwiOjEsXCJpbmZsdWVuY2VcIjoyLFwidHlwZVwiOmZhbHNlfSx7XCJuYW1lXCI6XCJNZWNhdG9sIFJleFwiLFwicmVzb3VyY2VcIjoxLFwiaW5mbHVlbmNlXCI6NixcInR5cGVcIjpmYWxzZX0se1wibmFtZVwiOlwiTWVlclwiLFwicmVzb3VyY2VcIjowLFwiaW5mbHVlbmNlXCI6NCxcInR5cGVcIjpcInJlZFwifSx7XCJuYW1lXCI6XCJNZWhhciBYdWxsXCIsXCJyZXNvdXJjZVwiOjEsXCJpbmZsdWVuY2VcIjozLFwidHlwZVwiOlwicmVkXCJ9LHtcIm5hbWVcIjpcIk1lbGxvblwiLFwicmVzb3VyY2VcIjowLFwiaW5mbHVlbmNlXCI6MixcInR5cGVcIjpmYWxzZX0se1wibmFtZVwiOlwiTmV3IEFsYmlvblwiLFwicmVzb3VyY2VcIjoxLFwiaW5mbHVlbmNlXCI6MSxcInR5cGVcIjpcImdyZWVuXCJ9LHtcIm5hbWVcIjpcIlF1YW5uICsgQWxwaGFcIixcInJlc291cmNlXCI6MixcImluZmx1ZW5jZVwiOjEsXCJ0eXBlXCI6ZmFsc2V9LHtcIm5hbWVcIjpcIlF1Y2VuJ25cIixcInJlc291cmNlXCI6MSxcImluZmx1ZW5jZVwiOjIsXCJ0eXBlXCI6ZmFsc2V9LHtcIm5hbWVcIjpcIlJhcnJvblwiLFwicmVzb3VyY2VcIjowLFwiaW5mbHVlbmNlXCI6MyxcInR5cGVcIjpmYWxzZX0se1wibmFtZVwiOlwiUmVzY3Vsb25cIixcInJlc291cmNlXCI6MixcImluZmx1ZW5jZVwiOjAsXCJ0eXBlXCI6ZmFsc2V9LHtcIm5hbWVcIjpcIlNha3VsYWdcIixcInJlc291cmNlXCI6MixcImluZmx1ZW5jZVwiOjEsXCJ0eXBlXCI6ZmFsc2V9LHtcIm5hbWVcIjpcIlNhdWRvclwiLFwicmVzb3VyY2VcIjoyLFwiaW5mbHVlbmNlXCI6MixcInR5cGVcIjpmYWxzZX0se1wibmFtZVwiOlwiU3RhcnBvaW50XCIsXCJyZXNvdXJjZVwiOjMsXCJpbmZsdWVuY2VcIjoxLFwidHlwZVwiOmZhbHNlfSx7XCJuYW1lXCI6XCJUYXInTWFublwiLFwicmVzb3VyY2VcIjoxLFwiaW5mbHVlbmNlXCI6MSxcInR5cGVcIjpcImdyZWVuXCJ9LHtcIm5hbWVcIjpcIlRlcXUncmFuXCIsXCJyZXNvdXJjZVwiOjIsXCJpbmZsdWVuY2VcIjowLFwidHlwZVwiOmZhbHNlfSx7XCJuYW1lXCI6XCJUaGliYWhcIixcInJlc291cmNlXCI6MSxcImluZmx1ZW5jZVwiOjEsXCJ0eXBlXCI6XCJibHVlXCJ9LHtcIm5hbWVcIjpcIlRvcmthblwiLFwicmVzb3VyY2VcIjowLFwiaW5mbHVlbmNlXCI6MyxcInR5cGVcIjpmYWxzZX0se1wibmFtZVwiOlwiVmVmdXQgSUlcIixcInJlc291cmNlXCI6MixcImluZmx1ZW5jZVwiOjIsXCJ0eXBlXCI6ZmFsc2V9LHtcIm5hbWVcIjpcIldlbGxvblwiLFwicmVzb3VyY2VcIjoxLFwiaW5mbHVlbmNlXCI6MixcInR5cGVcIjpcInllbGxvd1wifSx7XCJuYW1lXCI6XCJYWGVoYW5cIixcInJlc291cmNlXCI6MSxcImluZmx1ZW5jZVwiOjEsXCJ0eXBlXCI6ZmFsc2V9LHtcIm5hbWVcIjpcIlpvaGJhdFwiLFwicmVzb3VyY2VcIjozLFwiaW5mbHVlbmNlXCI6MSxcInR5cGVcIjpmYWxzZX0se1wibmFtZVwiOlwiQ3JldXNzXCIsXCJyZXNvdXJjZVwiOjQsXCJpbmZsdWVuY2VcIjoyLFwidHlwZVwiOlwiaG9tZVwifSx7XCJuYW1lXCI6XCJIZXJjYW50XCIsXCJyZXNvdXJjZVwiOjEsXCJpbmZsdWVuY2VcIjoxLFwidHlwZVwiOlwiaG9tZVwifSx7XCJuYW1lXCI6XCJBcnJldHplXCIsXCJyZXNvdXJjZVwiOjIsXCJpbmZsdWVuY2VcIjowLFwidHlwZVwiOlwiaG9tZVwifSx7XCJuYW1lXCI6XCJLYW1kb3JuXCIsXCJyZXNvdXJjZVwiOjAsXCJpbmZsdWVuY2VcIjoxLFwidHlwZVwiOlwiaG9tZVwifSx7XCJuYW1lXCI6XCJKb2xcIixcInJlc291cmNlXCI6MSxcImluZmx1ZW5jZVwiOjIsXCJ0eXBlXCI6XCJob21lXCJ9LHtcIm5hbWVcIjpcIk5hclwiLFwicmVzb3VyY2VcIjoyLFwiaW5mbHVlbmNlXCI6MyxcInR5cGVcIjpcImhvbWVcIn0se1wibmFtZVwiOlwiWzAuMC4wXVwiLFwicmVzb3VyY2VcIjo1LFwiaW5mbHVlbmNlXCI6MCxcInR5cGVcIjpcImhvbWVcIn0se1wibmFtZVwiOlwiQXJjIFByaW1lXCIsXCJyZXNvdXJjZVwiOjQsXCJpbmZsdWVuY2VcIjowLFwidHlwZVwiOlwiaG9tZVwifSx7XCJuYW1lXCI6XCJXcmVuIFRlcnJhXCIsXCJyZXNvdXJjZVwiOjIsXCJpbmZsdWVuY2VcIjoxLFwidHlwZVwiOlwiaG9tZVwifSx7XCJuYW1lXCI6XCJNb2xsIFByaW11c1wiLFwicmVzb3VyY2VcIjo0LFwiaW5mbHVlbmNlXCI6MSxcInR5cGVcIjpcImhvbWVcIn0se1wibmFtZVwiOlwiTXV1YXRcIixcInJlc291cmNlXCI6NCxcImluZmx1ZW5jZVwiOjEsXCJ0eXBlXCI6XCJob21lXCJ9LHtcIm5hbWVcIjpcIkRydWFhXCIsXCJyZXNvdXJjZVwiOjMsXCJpbmZsdWVuY2VcIjoxLFwidHlwZVwiOlwiaG9tZVwifSx7XCJuYW1lXCI6XCJNYWFsdXVrXCIsXCJyZXNvdXJjZVwiOjAsXCJpbmZsdWVuY2VcIjoyLFwidHlwZVwiOlwiaG9tZVwifSx7XCJuYW1lXCI6XCJNb3JkYWkgSUlcIixcInJlc291cmNlXCI6NCxcImluZmx1ZW5jZVwiOjAsXCJ0eXBlXCI6XCJob21lXCJ9LHtcIm5hbWVcIjpcIkxpc2lzIElJXCIsXCJyZXNvdXJjZVwiOjEsXCJpbmZsdWVuY2VcIjowLFwidHlwZVwiOlwiaG9tZVwifSx7XCJuYW1lXCI6XCJSYWdoXCIsXCJyZXNvdXJjZVwiOjIsXCJpbmZsdWVuY2VcIjoxLFwidHlwZVwiOlwiaG9tZVwifSx7XCJuYW1lXCI6XCJUcmVuJ0xha1wiLFwicmVzb3VyY2VcIjoxLFwiaW5mbHVlbmNlXCI6MCxcInR5cGVcIjpcImhvbWVcIn0se1wibmFtZVwiOlwiUXVpbmFycmFcIixcInJlc291cmNlXCI6MyxcImluZmx1ZW5jZVwiOjEsXCJ0eXBlXCI6XCJob21lXCJ9LHtcIm5hbWVcIjpcIkpvcmRcIixcInJlc291cmNlXCI6NCxcImluZmx1ZW5jZVwiOjIsXCJ0eXBlXCI6XCJob21lXCJ9LHtcIm5hbWVcIjpcIldpbm51XCIsXCJyZXNvdXJjZVwiOjMsXCJpbmZsdWVuY2VcIjo0LFwidHlwZVwiOlwiaG9tZVwifSx7XCJuYW1lXCI6XCJBcmNob24gV3JlblwiLFwicmVzb3VyY2VcIjoyLFwiaW5mbHVlbmNlXCI6MyxcInR5cGVcIjpcImhvbWVcIn0se1wibmFtZVwiOlwiQXJjaG9uIFRhdVwiLFwicmVzb3VyY2VcIjoxLFwiaW5mbHVlbmNlXCI6MSxcInR5cGVcIjpcImhvbWVcIn0se1wibmFtZVwiOlwiRGFyaWVuXCIsXCJyZXNvdXJjZVwiOjQsXCJpbmZsdWVuY2VcIjo0LFwidHlwZVwiOlwiaG9tZVwifSx7XCJuYW1lXCI6XCJSZXRpbGxpb25cIixcInJlc291cmNlXCI6MixcImluZmx1ZW5jZVwiOjMsXCJ0eXBlXCI6XCJob21lXCJ9LHtcIm5hbWVcIjpcIlNoYWxsb3FcIixcInJlc291cmNlXCI6MSxcImluZmx1ZW5jZVwiOjIsXCJ0eXBlXCI6XCJob21lXCJ9XSJdfQ==
