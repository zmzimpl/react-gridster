var React = require('react');

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

var styles = {"gridster":"_styles-module__gridster__3FbIf","fit":"_styles-module__fit__2cIYj","scrollVertical":"_styles-module__scrollVertical__2BhiX","scrollHorizontal":"_styles-module__scrollHorizontal__3XPdq","fixed":"_styles-module__fixed__2lylp","mobile":"_styles-module__mobile__2RmiB","gridsterColumn":"_styles-module__gridsterColumn__2PdEo","gridsterRow":"_styles-module__gridsterRow__k3kT0","displayGrid":"_styles-module__displayGrid__3X7y5"};

var GridType;

(function (GridType) {
  GridType["Fit"] = "fit";
  GridType["ScrollVertical"] = "scrollVertical";
  GridType["ScrollHorizontal"] = "scrollHorizontal";
  GridType["Fixed"] = "fixed";
  GridType["VerticalFixed"] = "verticalFixed";
  GridType["HorizontalFixed"] = "horizontalFixed";
})(GridType || (GridType = {}));

var DisplayGrid;

(function (DisplayGrid) {
  DisplayGrid["Always"] = "always";
  DisplayGrid["OnDragAndResize"] = "onDrag&Resize";
  DisplayGrid["None"] = "none";
})(DisplayGrid || (DisplayGrid = {}));

var CompactType;

(function (CompactType) {
  CompactType["None"] = "none";
  CompactType["CompactUp"] = "compactUp";
  CompactType["CompactLeft"] = "compactLeft";
  CompactType["CompactUpAndLeft"] = "compactUp&Left";
  CompactType["CompactLeftAndUp"] = "compactLeft&Up";
  CompactType["CompactRight"] = "compactRight";
  CompactType["CompactUpAndRight"] = "compactUp&Right";
  CompactType["CompactRightAndUp"] = "compactRight&Up";
})(CompactType || (CompactType = {}));

var GridsterRenderer = /*#__PURE__*/function () {
  function GridsterRenderer(gridster) {
    this.gridster = gridster;
  }

  var _proto = GridsterRenderer.prototype;

  _proto.destroy = function destroy() {
    delete this.gridster;
  };

  _proto.updateItem = function updateItem(el, item, renderer) {
    if (this.gridster.mobile) {
      var _this$gridster$$optio, _this$gridster$$optio3, _this$gridster$$optio5;

      this.clearCellPosition(renderer, el);

      if ((_this$gridster$$optio = this.gridster.$options) === null || _this$gridster$$optio === void 0 ? void 0 : _this$gridster$$optio.keepFixedHeightInMobile) {
        var _this$gridster$$optio2;

        renderer.setStyle(el, 'height', item.rows * ((_this$gridster$$optio2 = this.gridster.$options) === null || _this$gridster$$optio2 === void 0 ? void 0 : _this$gridster$$optio2.fixedRowHeight) + 'px');
      } else {
        renderer.setStyle(el, 'height', item.rows * this.gridster.curWidth / item.cols + 'px');
      }

      if ((_this$gridster$$optio3 = this.gridster.$options) === null || _this$gridster$$optio3 === void 0 ? void 0 : _this$gridster$$optio3.keepFixedWidthInMobile) {
        var _this$gridster$$optio4;

        renderer.setStyle(el, 'width', ((_this$gridster$$optio4 = this.gridster.$options) === null || _this$gridster$$optio4 === void 0 ? void 0 : _this$gridster$$optio4.fixedColWidth) + 'px');
      } else {
        renderer.setStyle(el, 'width', '');
      }

      renderer.setStyle(el, 'margin-bottom', ((_this$gridster$$optio5 = this.gridster.$options) === null || _this$gridster$$optio5 === void 0 ? void 0 : _this$gridster$$optio5.margin) + 'px');
      renderer.setStyle(el, 'margin-right', '');
    } else {
      var _this$gridster$$optio6, _this$gridster$$optio9, _this$gridster$$optio10, _this$gridster$$optio11, _this$gridster$$optio12;

      var x = 0;
      var y = 0;

      if ((_this$gridster$$optio6 = this.gridster.$options) === null || _this$gridster$$optio6 === void 0 ? void 0 : _this$gridster$$optio6.draggable.dropOverItemStack) {
        var _this$gridster$$optio7, _this$gridster$$optio8;

        x = item.left !== undefined ? item.left - ((_this$gridster$$optio7 = this.gridster.$options) === null || _this$gridster$$optio7 === void 0 ? void 0 : _this$gridster$$optio7.margin) : Math.round(this.gridster.curColWidth * item.x);
        y = item.top !== undefined ? item.top - ((_this$gridster$$optio8 = this.gridster.$options) === null || _this$gridster$$optio8 === void 0 ? void 0 : _this$gridster$$optio8.margin) : Math.round(this.gridster.curRowHeight * item.y);

        if (item.zIndex) {
          renderer.setStyle(el, 'z-index', item.zIndex);
        }
      } else {
        x = Math.round(this.gridster.curColWidth * item.x);
        y = Math.round(this.gridster.curRowHeight * item.y);
      }

      var width = this.gridster.curColWidth * item.cols - ((_this$gridster$$optio9 = this.gridster.$options) === null || _this$gridster$$optio9 === void 0 ? void 0 : _this$gridster$$optio9.margin);
      var height = this.gridster.curRowHeight * item.rows - ((_this$gridster$$optio10 = this.gridster.$options) === null || _this$gridster$$optio10 === void 0 ? void 0 : _this$gridster$$optio10.margin);
      this.setCellPosition(renderer, el, x, y);

      if (!((_this$gridster$$optio11 = this.gridster.$options) === null || _this$gridster$$optio11 === void 0 ? void 0 : _this$gridster$$optio11.draggable.dropOverItemStack)) {
        renderer.setStyle(el, 'width', width + 'px');
        renderer.setStyle(el, 'height', height + 'px');
      } else {
        renderer.setStyle(el, 'width', (item.width ? item.width : width) + 'px');
        renderer.setStyle(el, 'height', (item.height ? item.height : height) + 'px');
      }

      var marginBottom = null;
      var marginRight = null;

      if ((_this$gridster$$optio12 = this.gridster.$options) === null || _this$gridster$$optio12 === void 0 ? void 0 : _this$gridster$$optio12.outerMargin) {
        if (this.gridster.rows === item.rows + item.y) {
          var _this$gridster$$optio13;

          if (((_this$gridster$$optio13 = this.gridster.$options) === null || _this$gridster$$optio13 === void 0 ? void 0 : _this$gridster$$optio13.outerMarginBottom) !== null) {
            var _this$gridster$$optio14;

            marginBottom = ((_this$gridster$$optio14 = this.gridster.$options) === null || _this$gridster$$optio14 === void 0 ? void 0 : _this$gridster$$optio14.outerMarginBottom) + 'px';
          } else {
            var _this$gridster$$optio15;

            marginBottom = ((_this$gridster$$optio15 = this.gridster.$options) === null || _this$gridster$$optio15 === void 0 ? void 0 : _this$gridster$$optio15.margin) + 'px';
          }
        }

        if (this.gridster.columns === item.cols + item.x) {
          var _this$gridster$$optio16;

          if (((_this$gridster$$optio16 = this.gridster.$options) === null || _this$gridster$$optio16 === void 0 ? void 0 : _this$gridster$$optio16.outerMarginBottom) !== null) {
            var _this$gridster$$optio17;

            marginRight = ((_this$gridster$$optio17 = this.gridster.$options) === null || _this$gridster$$optio17 === void 0 ? void 0 : _this$gridster$$optio17.outerMarginRight) + 'px';
          } else {
            var _this$gridster$$optio18;

            marginRight = ((_this$gridster$$optio18 = this.gridster.$options) === null || _this$gridster$$optio18 === void 0 ? void 0 : _this$gridster$$optio18.margin) + 'px';
          }
        }
      }

      renderer.setStyle(el, 'margin-bottom', marginBottom);
      renderer.setStyle(el, 'margin-right', marginRight);
    }
  };

  _proto.updateGridster = function updateGridster() {
    var _this$gridster$$optio19, _this$gridster$$optio20, _this$gridster$$optio21, _this$gridster$$optio22, _this$gridster$$optio29, _this$gridster$$optio33;

    var addClass = '';
    var removeClass1 = '';
    var removeClass2 = '';
    var removeClass3 = '';

    if (((_this$gridster$$optio19 = this.gridster.$options) === null || _this$gridster$$optio19 === void 0 ? void 0 : _this$gridster$$optio19.gridType) === GridType.Fit) {
      addClass = GridType.Fit;
      removeClass1 = GridType.ScrollVertical;
      removeClass2 = GridType.ScrollHorizontal;
      removeClass3 = GridType.Fixed;
    } else if (((_this$gridster$$optio20 = this.gridster.$options) === null || _this$gridster$$optio20 === void 0 ? void 0 : _this$gridster$$optio20.gridType) === GridType.ScrollVertical) {
      this.gridster.curRowHeight = this.gridster.curColWidth;
      addClass = GridType.ScrollVertical;
      removeClass1 = GridType.Fit;
      removeClass2 = GridType.ScrollHorizontal;
      removeClass3 = GridType.Fixed;
    } else if (((_this$gridster$$optio21 = this.gridster.$options) === null || _this$gridster$$optio21 === void 0 ? void 0 : _this$gridster$$optio21.gridType) === GridType.ScrollHorizontal) {
      this.gridster.curColWidth = this.gridster.curRowHeight;
      addClass = GridType.ScrollHorizontal;
      removeClass1 = GridType.Fit;
      removeClass2 = GridType.ScrollVertical;
      removeClass3 = GridType.Fixed;
    } else if (((_this$gridster$$optio22 = this.gridster.$options) === null || _this$gridster$$optio22 === void 0 ? void 0 : _this$gridster$$optio22.gridType) === GridType.Fixed) {
      var _this$gridster$$optio23, _this$gridster$$optio24, _this$gridster$$optio25, _this$gridster$$optio26, _this$gridster$$optio27, _this$gridster$$optio28;

      this.gridster.curColWidth = ((_this$gridster$$optio23 = this.gridster.$options) === null || _this$gridster$$optio23 === void 0 ? void 0 : _this$gridster$$optio23.fixedColWidth) + (((_this$gridster$$optio24 = this.gridster.$options) === null || _this$gridster$$optio24 === void 0 ? void 0 : _this$gridster$$optio24.ignoreMarginInRow) ? 0 : (_this$gridster$$optio25 = this.gridster.$options) === null || _this$gridster$$optio25 === void 0 ? void 0 : _this$gridster$$optio25.margin);
      this.gridster.curRowHeight = ((_this$gridster$$optio26 = this.gridster.$options) === null || _this$gridster$$optio26 === void 0 ? void 0 : _this$gridster$$optio26.fixedRowHeight) + (((_this$gridster$$optio27 = this.gridster.$options) === null || _this$gridster$$optio27 === void 0 ? void 0 : _this$gridster$$optio27.ignoreMarginInRow) ? 0 : (_this$gridster$$optio28 = this.gridster.$options) === null || _this$gridster$$optio28 === void 0 ? void 0 : _this$gridster$$optio28.margin);
      addClass = GridType.Fixed;
      removeClass1 = GridType.Fit;
      removeClass2 = GridType.ScrollVertical;
      removeClass3 = GridType.ScrollHorizontal;
    } else if (((_this$gridster$$optio29 = this.gridster.$options) === null || _this$gridster$$optio29 === void 0 ? void 0 : _this$gridster$$optio29.gridType) === GridType.VerticalFixed) {
      var _this$gridster$$optio30, _this$gridster$$optio31, _this$gridster$$optio32;

      this.gridster.curRowHeight = ((_this$gridster$$optio30 = this.gridster.$options) === null || _this$gridster$$optio30 === void 0 ? void 0 : _this$gridster$$optio30.fixedRowHeight) + (((_this$gridster$$optio31 = this.gridster.$options) === null || _this$gridster$$optio31 === void 0 ? void 0 : _this$gridster$$optio31.ignoreMarginInRow) ? 0 : (_this$gridster$$optio32 = this.gridster.$options) === null || _this$gridster$$optio32 === void 0 ? void 0 : _this$gridster$$optio32.margin);
      addClass = GridType.ScrollVertical;
      removeClass1 = GridType.Fit;
      removeClass2 = GridType.ScrollHorizontal;
      removeClass3 = GridType.Fixed;
    } else if (((_this$gridster$$optio33 = this.gridster.$options) === null || _this$gridster$$optio33 === void 0 ? void 0 : _this$gridster$$optio33.gridType) === GridType.HorizontalFixed) {
      var _this$gridster$$optio34, _this$gridster$$optio35, _this$gridster$$optio36;

      this.gridster.curColWidth = ((_this$gridster$$optio34 = this.gridster.$options) === null || _this$gridster$$optio34 === void 0 ? void 0 : _this$gridster$$optio34.fixedColWidth) + (((_this$gridster$$optio35 = this.gridster.$options) === null || _this$gridster$$optio35 === void 0 ? void 0 : _this$gridster$$optio35.ignoreMarginInRow) ? 0 : (_this$gridster$$optio36 = this.gridster.$options) === null || _this$gridster$$optio36 === void 0 ? void 0 : _this$gridster$$optio36.margin);
      addClass = GridType.ScrollHorizontal;
      removeClass1 = GridType.Fit;
      removeClass2 = GridType.ScrollVertical;
      removeClass3 = GridType.Fixed;
    }

    if (this.gridster.mobile) {
      this.gridster.renderer.removeClass(this.gridster.el, addClass);
    } else {
      this.gridster.renderer.addClass(this.gridster.el, addClass);
    }

    this.gridster.renderer.removeClass(this.gridster.el, removeClass1);
    this.gridster.renderer.removeClass(this.gridster.el, removeClass2);
    this.gridster.renderer.removeClass(this.gridster.el, removeClass3);
  };

  _proto.getGridColumnStyle = function getGridColumnStyle(i) {
    var _this$gridster$$optio37, _this$gridster$$optio38;

    return _extends({}, this.getLeftPosition(this.gridster.curColWidth * i), {
      width: this.gridster.curColWidth - ((_this$gridster$$optio37 = this.gridster.$options) === null || _this$gridster$$optio37 === void 0 ? void 0 : _this$gridster$$optio37.margin) + 'px',
      height: this.gridster.gridRows.length * this.gridster.curRowHeight - ((_this$gridster$$optio38 = this.gridster.$options) === null || _this$gridster$$optio38 === void 0 ? void 0 : _this$gridster$$optio38.margin) + 'px'
    });
  };

  _proto.getGridRowStyle = function getGridRowStyle(i) {
    var _this$gridster$$optio39, _this$gridster$$optio40;

    return _extends({}, this.getTopPosition(this.gridster.curRowHeight * i), {
      width: this.gridster.gridColumns.length * this.gridster.curColWidth - ((_this$gridster$$optio39 = this.gridster.$options) === null || _this$gridster$$optio39 === void 0 ? void 0 : _this$gridster$$optio39.margin) + 'px',
      height: this.gridster.curRowHeight - ((_this$gridster$$optio40 = this.gridster.$options) === null || _this$gridster$$optio40 === void 0 ? void 0 : _this$gridster$$optio40.margin) + 'px'
    });
  };

  _proto.getLeftPosition = function getLeftPosition(d) {
    var _this$gridster$$optio41;

    if ((_this$gridster$$optio41 = this.gridster.$options) === null || _this$gridster$$optio41 === void 0 ? void 0 : _this$gridster$$optio41.useTransformPositioning) {
      return {
        transform: 'translateX(' + d + 'px)'
      };
    } else {
      return {
        left: this.getLeftMargin() + d + 'px'
      };
    }
  };

  _proto.getTopPosition = function getTopPosition(d) {
    var _this$gridster$$optio42;

    if ((_this$gridster$$optio42 = this.gridster.$options) === null || _this$gridster$$optio42 === void 0 ? void 0 : _this$gridster$$optio42.useTransformPositioning) {
      return {
        transform: 'translateY(' + d + 'px)'
      };
    } else {
      return {
        top: this.getTopMargin() + d + 'px'
      };
    }
  };

  _proto.clearCellPosition = function clearCellPosition(renderer, el) {
    var _this$gridster$$optio43;

    if ((_this$gridster$$optio43 = this.gridster.$options) === null || _this$gridster$$optio43 === void 0 ? void 0 : _this$gridster$$optio43.useTransformPositioning) {
      renderer.setStyle(el, 'transform', '');
    } else {
      renderer.setStyle(el, 'top', '');
      renderer.setStyle(el, 'left', '');
    }
  };

  _proto.setCellPosition = function setCellPosition(renderer, el, x, y) {
    var _this$gridster$$optio44;

    if ((_this$gridster$$optio44 = this.gridster.$options) === null || _this$gridster$$optio44 === void 0 ? void 0 : _this$gridster$$optio44.useTransformPositioning) {
      var transform = 'translate3d(' + x + 'px, ' + y + 'px, 0)';
      renderer.setStyle(el, 'transform', transform);
    } else {
      var _this$gridster$$optio45;

      if (!((_this$gridster$$optio45 = this.gridster.$options) === null || _this$gridster$$optio45 === void 0 ? void 0 : _this$gridster$$optio45.draggable.dropOverItemStack)) {
        renderer.setStyle(el, 'left', this.getLeftMargin() + x + 'px');
        renderer.setStyle(el, 'top', this.getTopMargin() + y + 'px');
      } else {
        var left = 0;
        var top = 0;

        if (x < 0 || y < 0) {
          if (x < 0 && y >= 0) {
            left = this.getLeftMargin();
            top = this.getTopMargin() + y;
          }

          if (x >= 0 && y < 0) {
            left = this.getLeftMargin() + x;
            top = this.getTopMargin();
          }

          if (x < 0 && y < 0) {
            left = this.getLeftMargin();
            top = this.getTopMargin();
          }
        } else {
          left = this.getLeftMargin() + x;
          top = this.getTopMargin() + y;
        }

        renderer.setStyle(el, 'left', left + 'px');
        renderer.setStyle(el, 'top', top + 'px');

        if (this.gridster.movingItem) {
          Object.assign(this.gridster.movingItem, {
            left: left,
            top: top
          });
        }
      }
    }
  };

  _proto.getLeftMargin = function getLeftMargin() {
    var _this$gridster$$optio46;

    if ((_this$gridster$$optio46 = this.gridster.$options) === null || _this$gridster$$optio46 === void 0 ? void 0 : _this$gridster$$optio46.outerMargin) {
      var _this$gridster$$optio47;

      if (((_this$gridster$$optio47 = this.gridster.$options) === null || _this$gridster$$optio47 === void 0 ? void 0 : _this$gridster$$optio47.outerMarginLeft) !== null) {
        var _this$gridster$$optio48;

        return (_this$gridster$$optio48 = this.gridster.$options) === null || _this$gridster$$optio48 === void 0 ? void 0 : _this$gridster$$optio48.outerMarginLeft;
      } else {
        var _this$gridster$$optio49;

        return (_this$gridster$$optio49 = this.gridster.$options) === null || _this$gridster$$optio49 === void 0 ? void 0 : _this$gridster$$optio49.margin;
      }
    } else {
      return 0;
    }
  };

  _proto.getTopMargin = function getTopMargin() {
    var _this$gridster$$optio50;

    if ((_this$gridster$$optio50 = this.gridster.$options) === null || _this$gridster$$optio50 === void 0 ? void 0 : _this$gridster$$optio50.outerMargin) {
      var _this$gridster$$optio51;

      if (((_this$gridster$$optio51 = this.gridster.$options) === null || _this$gridster$$optio51 === void 0 ? void 0 : _this$gridster$$optio51.outerMarginTop) !== null) {
        var _this$gridster$$optio52;

        return (_this$gridster$$optio52 = this.gridster.$options) === null || _this$gridster$$optio52 === void 0 ? void 0 : _this$gridster$$optio52.outerMarginTop;
      } else {
        var _this$gridster$$optio53;

        return (_this$gridster$$optio53 = this.gridster.$options) === null || _this$gridster$$optio53 === void 0 ? void 0 : _this$gridster$$optio53.margin;
      }
    } else {
      return 0;
    }
  };

  return GridsterRenderer;
}();

var RendererStyleFlags2;

(function (RendererStyleFlags2) {
  RendererStyleFlags2[RendererStyleFlags2["Important"] = 1] = "Important";
  RendererStyleFlags2[RendererStyleFlags2["DashCase"] = 2] = "DashCase";
})(RendererStyleFlags2 || (RendererStyleFlags2 = {}));

var NAMESPACE_URIS = {
  svg: 'http://www.w3.org/2000/svg',
  xhtml: 'http://www.w3.org/1999/xhtml',
  xlink: 'http://www.w3.org/1999/xlink',
  xml: 'http://www.w3.org/XML/1998/namespace',
  xmlns: 'http://www.w3.org/2000/xmlns/'
};
var Renderer = /*#__PURE__*/function () {
  function Renderer() {}

  var _proto = Renderer.prototype;

  _proto.setAttribute = function setAttribute(el, name, value, namespace) {
    if (namespace) {
      el.setAttributeNS(NAMESPACE_URIS[namespace], namespace + ':' + name, value);
    } else {
      el.setAttribute(name, value);
    }
  };

  _proto.removeAttribute = function removeAttribute(el, name, namespace) {
    if (namespace) {
      el.removeAttributeNS(NAMESPACE_URIS[namespace], name);
    } else {
      el.removeAttribute(name);
    }
  };

  _proto.addClass = function addClass(el, name) {
    el.classList.add(name);
  };

  _proto.removeClass = function removeClass(el, name) {
    el.classList.remove(name);
  };

  _proto.setStyle = function setStyle(el, style, value, flags) {
    style = style.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

    var styleMap = _readStyleAttribute(el);

    if (flags && RendererStyleFlags2.Important) {
      value += ' !important';
    }

    styleMap[style] = value == null ? '' : value;

    _writeStyleAttribute(el, styleMap);
  };

  return Renderer;
}();

function _readStyleAttribute(element) {
  var styleMap = {};
  var styleAttribute = element.getAttribute('style');

  if (styleAttribute) {
    var styleList = styleAttribute.split(/;+/g);

    for (var i = 0; i < styleList.length; i++) {
      var style = styleList[i].trim();

      if (style.length > 0) {
        var colonIndex = style.indexOf(':');

        if (colonIndex === -1) {
          throw new Error("Invalid CSS style: " + style);
        }

        var name = style.substr(0, colonIndex).trim();
        styleMap[name] = style.substr(colonIndex + 1).trim();
      }
    }
  }

  return styleMap;
}

function _writeStyleAttribute(element, styleMap) {
  var styleAttrValue = '';

  for (var key in styleMap) {
    var newValue = styleMap[key];

    if (newValue != null) {
      styleAttrValue += key + ':' + styleMap[key] + ';';
    }
  }

  element.setAttribute('style', styleAttrValue);
}

var Gridster = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Gridster, _React$Component);

  function Gridster(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.columns = 12;
    _this.rows = 12;
    _this.gridColumns = [];
    _this.gridRows = [];
    _this.gridRenderer = new GridsterRenderer(_assertThisInitialized(_this));
    _this.renderer = new Renderer();
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

  Gridster.checkCollisionTwoItems = function checkCollisionTwoItems(item, item2) {
    return item.x < item2.x + item2.cols && item.x + item.cols > item2.x && item.y < item2.y + item2.rows && item.y + item.rows > item2.y;
  };

  _proto.findItemWithItem = function findItemWithItem(item) {
    var widgetsIndex = this.grid.length - 1,
        widget;

    for (; widgetsIndex > -1; widgetsIndex--) {
      widget = this.grid[widgetsIndex];

      if (widget.$item !== item && Gridster.checkCollisionTwoItems(widget.$item, item)) {
        return widget;
      }
    }

    return false;
  };

  _proto.findItemsWithItem = function findItemsWithItem(item) {
    var a = [];
    var widgetsIndex = this.grid.length - 1,
        widget;

    for (; widgetsIndex > -1; widgetsIndex--) {
      widget = this.grid[widgetsIndex];

      if (widget.$item !== item && Gridster.checkCollisionTwoItems(widget.$item, item)) {
        a.push(widget);
      }
    }

    return a;
  };

  _proto.checkCollision = function checkCollision(item) {
    console.log(item);
    return false;
  };

  _proto.checkGridCollision = function checkGridCollision(item) {
    console.log(item);
    return false;
  };

  _proto.checkCollisionForSwaping = function checkCollisionForSwaping(item) {
    console.log(item);
    return false;
  };

  _proto.pixelsToPositionX = function pixelsToPositionX(x, roundingMethod, noLimit) {
    var position = roundingMethod(x / this.curColWidth);

    if (noLimit) {
      return position;
    } else {
      return Math.max(position, 0);
    }
  };

  _proto.pixelsToPositionY = function pixelsToPositionY(y, roundingMethod, noLimit) {
    var position = roundingMethod(y / this.curRowHeight);

    if (noLimit) {
      return position;
    } else {
      return Math.max(position, 0);
    }
  };

  _proto.positionXToPixels = function positionXToPixels(x) {
    return x * this.curColWidth;
  };

  _proto.positionYToPixels = function positionYToPixels(y) {
    return y * this.curRowHeight;
  };

  _proto.addItem = function addItem(itemComponent) {
    console.log(itemComponent);
  };

  _proto.removeItem = function removeItem(itemComponent) {
    console.log(itemComponent);
  };

  _proto.setGridDimensions = function setGridDimensions() {};

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
      var style = this.gridRenderer.getGridColumnStyle(i);
      gridsterColumns.push(React.createElement("div", {
        key: 'grid-col-' + i,
        className: styles.gridsterColumn,
        style: style
      }));
    }

    var gridsterRows = [];

    for (var _i = 0; _i < this.rows; _i++) {
      var _style = this.gridRenderer.getGridRowStyle(_i);

      gridsterRows.push(React.createElement("div", {
        key: 'grid-row-' + _i,
        className: styles.gridsterRow,
        style: _style
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
