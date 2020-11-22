import { Component, createElement } from 'react';

var styles = {"gridster":"_styles-module__gridster__3FbIf","fit":"_styles-module__fit__2cIYj","scrollVertical":"_styles-module__scrollVertical__2BhiX","scrollHorizontal":"_styles-module__scrollHorizontal__3XPdq","fixed":"_styles-module__fixed__2lylp","mobile":"_styles-module__mobile__2RmiB","gridsterColumn":"_styles-module__gridsterColumn__2PdEo","gridsterRow":"_styles-module__gridsterRow__k3kT0","displayGrid":"_styles-module__displayGrid__3X7y5"};

class Gridster extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return createElement("div", {
      className: styles.gridster
    }, createElement("div", {
      className: styles.gridsterColumn
    }), createElement("div", {
      className: styles.gridsterRow
    }));
  }

}

export { Gridster };
//# sourceMappingURL=index.modern.js.map
