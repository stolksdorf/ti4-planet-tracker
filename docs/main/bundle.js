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
