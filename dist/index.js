var React = require('react');

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

var styles = {"gridster":"_styles-module__gridster__3FbIf","fit":"_styles-module__fit__2cIYj","scrollVertical":"_styles-module__scrollVertical__2BhiX","scrollHorizontal":"_styles-module__scrollHorizontal__3XPdq","fixed":"_styles-module__fixed__2lylp","mobile":"_styles-module__mobile__2RmiB","gridsterColumn":"_styles-module__gridsterColumn__2PdEo","gridsterRow":"_styles-module__gridsterRow__k3kT0","displayGrid":"_styles-module__displayGrid__3X7y5"};

var Gridster = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Gridster, _React$Component);

  function Gridster(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.columns = 12;
    _this.rows = 12;
    _this.mobile = false;
    _this.curWidth = 0;
    _this.curHeight = 0;
    _this.curColWidth = 0;
    _this.curRowHeight = 0;
    return _this;
  }

  var _proto = Gridster.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.setGridSize();
    this.calculateLayout();
    this.updateGrid();
  };

  _proto.setGridSize = function setGridSize() {
    var _this$$options, _this$$options2;

    var el = document.getElementById('gridster-board');
    var width = el.clientWidth;
    var height = el.clientHeight;

    if (((_this$$options = this.$options) === null || _this$$options === void 0 ? void 0 : _this$$options.setGridSize) || ((_this$$options2 = this.$options) === null || _this$$options2 === void 0 ? void 0 : _this$$options2.gridType) === 'fit' && !this.mobile) {
      width = el.offsetWidth;
      height = el.offsetHeight;
    } else {
      width = el.clientWidth;
      height = el.clientHeight;
    }

    this.curWidth = width;
    this.curHeight = height;
  };

  _proto.setOptions = function setOptions() {};

  _proto.optionsChanged = function optionsChanged() {
    this.setOptions();
  };

  _proto.calculateLayout = function calculateLayout() {
    var _this$$options3, _this$$options4;

    var marginWidth = -((_this$$options3 = this.$options) === null || _this$$options3 === void 0 ? void 0 : _this$$options3.margin) || 0;
    this.curColWidth = (this.curWidth - marginWidth) / this.columns;
    var marginHeight = -((_this$$options4 = this.$options) === null || _this$$options4 === void 0 ? void 0 : _this$$options4.margin) || 0;
    this.curRowHeight = (this.curHeight - marginHeight) / this.rows;
  };

  _proto.updateGrid = function updateGrid() {};

  _proto.render = function render() {
    var gridsterColumns = [];

    for (var i = 0; i < this.columns; i++) {
      gridsterColumns.push(React.createElement("div", {
        key: 'grid-col-' + i,
        className: styles.gridsterColumn
      }));
    }

    var gridsterRows = [];

    for (var _i = 0; _i < this.rows; _i++) {
      gridsterRows.push(React.createElement("div", {
        key: 'grid-row-' + _i,
        className: styles.gridsterRow
      }));
    }

    console.log(gridsterColumns);
    console.log(gridsterRows);
    return React.createElement("div", {
      className: styles.gridster + ' ' + styles.displayGrid,
      id: "gridster-board"
    }, gridsterColumns, gridsterRows);
  };

  return Gridster;
}(React.Component);

exports.Gridster = Gridster;
//# sourceMappingURL=index.js.map
