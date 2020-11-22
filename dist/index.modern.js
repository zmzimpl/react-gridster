import { Component, createElement } from 'react';

var styles = {"gridster":"_styles-module__gridster__3FbIf","fit":"_styles-module__fit__2cIYj","scrollVertical":"_styles-module__scrollVertical__2BhiX","scrollHorizontal":"_styles-module__scrollHorizontal__3XPdq","fixed":"_styles-module__fixed__2lylp","mobile":"_styles-module__mobile__2RmiB","gridsterColumn":"_styles-module__gridsterColumn__2PdEo","gridsterRow":"_styles-module__gridsterRow__k3kT0","displayGrid":"_styles-module__displayGrid__3X7y5"};

class Gridster extends Component {
  constructor(props) {
    super(props);
    this.columns = 12;
    this.rows = 12;
    this.mobile = false;
    this.curWidth = 0;
    this.curHeight = 0;
    this.curColWidth = 0;
    this.curRowHeight = 0;
  }

  componentDidMount() {
    this.setGridSize();
    this.calculateLayout();
    this.updateGrid();
  }

  setGridSize() {
    var _this$$options, _this$$options2;

    const el = document.getElementById('gridster-board');
    let width = el.clientWidth;
    let height = el.clientHeight;

    if (((_this$$options = this.$options) === null || _this$$options === void 0 ? void 0 : _this$$options.setGridSize) || ((_this$$options2 = this.$options) === null || _this$$options2 === void 0 ? void 0 : _this$$options2.gridType) === 'fit' && !this.mobile) {
      width = el.offsetWidth;
      height = el.offsetHeight;
    } else {
      width = el.clientWidth;
      height = el.clientHeight;
    }

    this.curWidth = width;
    this.curHeight = height;
  }

  setOptions() {}

  optionsChanged() {
    this.setOptions();
  }

  calculateLayout() {
    var _this$$options3, _this$$options4;

    let marginWidth = -((_this$$options3 = this.$options) === null || _this$$options3 === void 0 ? void 0 : _this$$options3.margin) || 0;
    this.curColWidth = (this.curWidth - marginWidth) / this.columns;
    let marginHeight = -((_this$$options4 = this.$options) === null || _this$$options4 === void 0 ? void 0 : _this$$options4.margin) || 0;
    this.curRowHeight = (this.curHeight - marginHeight) / this.rows;
  }

  updateGrid() {}

  render() {
    const gridsterColumns = [];

    for (let i = 0; i < this.columns; i++) {
      gridsterColumns.push(createElement("div", {
        key: 'grid-col-' + i,
        className: styles.gridsterColumn
      }));
    }

    const gridsterRows = [];

    for (let i = 0; i < this.rows; i++) {
      gridsterRows.push(createElement("div", {
        key: 'grid-row-' + i,
        className: styles.gridsterRow
      }));
    }

    console.log(gridsterColumns);
    console.log(gridsterRows);
    return createElement("div", {
      className: styles.gridster + ' ' + styles.displayGrid,
      id: "gridster-board"
    }, gridsterColumns, gridsterRows);
  }

}

export { Gridster };
//# sourceMappingURL=index.modern.js.map
