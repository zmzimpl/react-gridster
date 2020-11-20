var React = require('react');

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

var styles = {"fit":"_styles-module__fit__2cIYj","scrollVertical":"_styles-module__scrollVertical__2BhiX","scrollHorizontal":"_styles-module__scrollHorizontal__3XPdq","fixed":"_styles-module__fixed__2lylp","mobile":"_styles-module__mobile__2RmiB","gridsterColumn":"_styles-module__gridsterColumn__2PdEo","gridsterRow":"_styles-module__gridsterRow__k3kT0","displayGrid":"_styles-module__displayGrid__3X7y5"};

var Gridster = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Gridster, _React$Component);

  function Gridster(props) {
    return _React$Component.call(this, props) || this;
  }

  var _proto = Gridster.prototype;

  _proto.render = function render() {
    return React.createElement("div", null, React.createElement("div", {
      className: styles.gridsterColumn
    }), React.createElement("div", {
      className: styles.gridsterRow
    }));
  };

  return Gridster;
}(React.Component);

exports.Gridster = Gridster;
//# sourceMappingURL=index.js.map
