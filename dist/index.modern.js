import React__default, { Component, createElement } from 'react';
import debounce from 'lodash/debounce';

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

class GridsterRenderer {
  constructor(gridster) {
    this.gridster = gridster;
  }

  destroy() {
    delete this.gridster;
  }

  updateItem(el, item, renderer) {
    if (this.gridster.mobile) {
      this.clearCellPosition(renderer, el);

      if (this.gridster.$options.keepFixedHeightInMobile) {
        renderer.setStyle(el, 'height', item.rows * this.gridster.$options.fixedRowHeight + 'px');
      } else {
        renderer.setStyle(el, 'height', item.rows * this.gridster.curWidth / item.cols + 'px');
      }

      if (this.gridster.$options.keepFixedWidthInMobile) {
        renderer.setStyle(el, 'width', this.gridster.$options.fixedColWidth + 'px');
      } else {
        renderer.setStyle(el, 'width', '');
      }

      renderer.setStyle(el, 'margin-bottom', this.gridster.$options.margin + 'px');
      renderer.setStyle(el, 'margin-right', '');
    } else {
      let x = 0;
      let y = 0;

      if (this.gridster.$options.draggable.dropOverItemStack) {
        x = item.left !== undefined ? item.left - this.gridster.$options.margin : Math.round(this.gridster.curColWidth * item.x);
        y = item.top !== undefined ? item.top - this.gridster.$options.margin : Math.round(this.gridster.curRowHeight * item.y);

        if (item.zIndex) {
          renderer.setStyle(el, 'z-index', item.zIndex);
        }
      } else {
        x = Math.round(this.gridster.curColWidth * item.x);
        y = Math.round(this.gridster.curRowHeight * item.y);
      }

      const width = this.gridster.curColWidth * item.cols - this.gridster.$options.margin;
      const height = this.gridster.curRowHeight * item.rows - this.gridster.$options.margin;
      this.setCellPosition(renderer, el, x, y);

      if (!this.gridster.$options.draggable.dropOverItemStack) {
        renderer.setStyle(el, 'width', width + 'px');
        renderer.setStyle(el, 'height', height + 'px');
      } else {
        renderer.setStyle(el, 'width', (item.width ? item.width : width) + 'px');
        renderer.setStyle(el, 'height', (item.height ? item.height : height) + 'px');
      }

      let marginBottom = null;
      let marginRight = null;

      if (this.gridster.$options.outerMargin) {
        if (this.gridster.rows === item.rows + item.y) {
          if (this.gridster.$options.outerMarginBottom !== null) {
            marginBottom = this.gridster.$options.outerMarginBottom + 'px';
          } else {
            marginBottom = this.gridster.$options.margin + 'px';
          }
        }

        if (this.gridster.columns === item.cols + item.x) {
          if (this.gridster.$options.outerMarginBottom !== null) {
            marginRight = this.gridster.$options.outerMarginRight + 'px';
          } else {
            marginRight = this.gridster.$options.margin + 'px';
          }
        }
      }

      renderer.setStyle(el, 'margin-bottom', marginBottom);
      renderer.setStyle(el, 'margin-right', marginRight);
    }
  }

  updateGridster() {
    let addClass = '';
    let removeClass1 = '';
    let removeClass2 = '';
    let removeClass3 = '';

    if (this.gridster.$options.gridType === GridType.Fit) {
      addClass = GridType.Fit;
      removeClass1 = GridType.ScrollVertical;
      removeClass2 = GridType.ScrollHorizontal;
      removeClass3 = GridType.Fixed;
    } else if (this.gridster.$options.gridType === GridType.ScrollVertical) {
      this.gridster.curRowHeight = this.gridster.curColWidth;
      addClass = GridType.ScrollVertical;
      removeClass1 = GridType.Fit;
      removeClass2 = GridType.ScrollHorizontal;
      removeClass3 = GridType.Fixed;
    } else if (this.gridster.$options.gridType === GridType.ScrollHorizontal) {
      this.gridster.curColWidth = this.gridster.curRowHeight;
      addClass = GridType.ScrollHorizontal;
      removeClass1 = GridType.Fit;
      removeClass2 = GridType.ScrollVertical;
      removeClass3 = GridType.Fixed;
    } else if (this.gridster.$options.gridType === GridType.Fixed) {
      this.gridster.curColWidth = this.gridster.$options.fixedColWidth + (this.gridster.$options.ignoreMarginInRow ? 0 : this.gridster.$options.margin);
      this.gridster.curRowHeight = this.gridster.$options.fixedRowHeight + (this.gridster.$options.ignoreMarginInRow ? 0 : this.gridster.$options.margin);
      addClass = GridType.Fixed;
      removeClass1 = GridType.Fit;
      removeClass2 = GridType.ScrollVertical;
      removeClass3 = GridType.ScrollHorizontal;
    } else if (this.gridster.$options.gridType === GridType.VerticalFixed) {
      this.gridster.curRowHeight = this.gridster.$options.fixedRowHeight + (this.gridster.$options.ignoreMarginInRow ? 0 : this.gridster.$options.margin);
      addClass = GridType.ScrollVertical;
      removeClass1 = GridType.Fit;
      removeClass2 = GridType.ScrollHorizontal;
      removeClass3 = GridType.Fixed;
    } else if (this.gridster.$options.gridType === GridType.HorizontalFixed) {
      this.gridster.curColWidth = this.gridster.$options.fixedColWidth + (this.gridster.$options.ignoreMarginInRow ? 0 : this.gridster.$options.margin);
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
  }

  getGridColumnStyle(i) {
    return { ...this.getLeftPosition(this.gridster.curColWidth * i),
      width: this.gridster.curColWidth - this.gridster.$options.margin + 'px',
      height: this.gridster.gridRows.length * this.gridster.curRowHeight - this.gridster.$options.margin + 'px'
    };
  }

  getGridRowStyle(i) {
    return { ...this.getTopPosition(this.gridster.curRowHeight * i),
      width: this.gridster.gridColumns.length * this.gridster.curColWidth - this.gridster.$options.margin + 'px',
      height: this.gridster.curRowHeight - this.gridster.$options.margin + 'px'
    };
  }

  getLeftPosition(d) {
    if (this.gridster.$options.useTransformPositioning) {
      return {
        transform: 'translateX(' + d + 'px)'
      };
    } else {
      return {
        left: this.getLeftMargin() + d + 'px'
      };
    }
  }

  getTopPosition(d) {
    if (this.gridster.$options.useTransformPositioning) {
      return {
        transform: 'translateY(' + d + 'px)'
      };
    } else {
      return {
        top: this.getTopMargin() + d + 'px'
      };
    }
  }

  clearCellPosition(renderer, el) {
    if (this.gridster.$options.useTransformPositioning) {
      renderer.setStyle(el, 'transform', '');
    } else {
      renderer.setStyle(el, 'top', '');
      renderer.setStyle(el, 'left', '');
    }
  }

  setCellPosition(renderer, el, x, y) {
    if (this.gridster.$options.useTransformPositioning) {
      const transform = 'translate3d(' + x + 'px, ' + y + 'px, 0)';
      renderer.setStyle(el, 'transform', transform);
    } else {
      if (!this.gridster.$options.draggable.dropOverItemStack) {
        renderer.setStyle(el, 'left', this.getLeftMargin() + x + 'px');
        renderer.setStyle(el, 'top', this.getTopMargin() + y + 'px');
      } else {
        let left = 0;
        let top = 0;

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
            left,
            top
          });
        }
      }
    }
  }

  getLeftMargin() {
    if (this.gridster.$options.outerMargin) {
      if (this.gridster.$options.outerMarginLeft !== null) {
        return this.gridster.$options.outerMarginLeft;
      } else {
        return this.gridster.$options.margin;
      }
    } else {
      return 0;
    }
  }

  getTopMargin() {
    if (this.gridster.$options.outerMargin) {
      if (this.gridster.$options.outerMarginTop !== null) {
        return this.gridster.$options.outerMarginTop;
      } else {
        return this.gridster.$options.margin;
      }
    } else {
      return 0;
    }
  }

}

class EventManager {
  constructor() {}

  addEventListener(element, eventName, handler) {
    element.addEventListener(eventName, handler);
    return function () {
      element.removeEventListener(eventName, handler);
    };
  }

  addGlobalEventListener(target, eventName, handler) {
    const t = getGlobalEventTarget(document, target);
    t.addEventListener(eventName, handler);
    return () => {
      t.removeEventListener(eventName, handler);
    };
  }

}

function getGlobalEventTarget(doc, target) {
  if (target === 'window') {
    return window;
  }

  if (target === 'document') {
    return doc;
  }

  if (target === 'body') {
    return doc.body;
  }

  return null;
}

var RendererStyleFlags2;

(function (RendererStyleFlags2) {
  RendererStyleFlags2[RendererStyleFlags2["Important"] = 1] = "Important";
  RendererStyleFlags2[RendererStyleFlags2["DashCase"] = 2] = "DashCase";
})(RendererStyleFlags2 || (RendererStyleFlags2 = {}));

const NAMESPACE_URIS = {
  svg: 'http://www.w3.org/2000/svg',
  xhtml: 'http://www.w3.org/1999/xhtml',
  xlink: 'http://www.w3.org/1999/xlink',
  xml: 'http://www.w3.org/XML/1998/namespace',
  xmlns: 'http://www.w3.org/2000/xmlns/'
};
class Renderer {
  constructor() {
    this.eventManager = new EventManager();
  }

  setAttribute(el, name, value, namespace) {
    if (namespace) {
      el.setAttributeNS(NAMESPACE_URIS[namespace], namespace + ':' + name, value);
    } else {
      el.setAttribute(name, value);
    }
  }

  removeAttribute(el, name, namespace) {
    if (namespace) {
      el.removeAttributeNS(NAMESPACE_URIS[namespace], name);
    } else {
      el.removeAttribute(name);
    }
  }

  addClass(el, name) {
    el.classList.add(name);
  }

  removeClass(el, name) {
    el.classList.remove(name);
  }

  setStyle(el, style, value, flags) {
    style = style.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

    const styleMap = _readStyleAttribute(el);

    if (flags && RendererStyleFlags2.Important) {
      value += ' !important';
    }

    styleMap[style] = value == null ? '' : value;

    _writeStyleAttribute(el, styleMap);
  }

  listen(target, event, callback) {
    if (typeof target === 'string') {
      return this.addGlobalEventListener(target, event, callback);
    } else {
      return this.addEventListener(target, event, callback);
    }
  }

  addEventListener(element, eventName, handler) {
    element.addEventListener(eventName, handler);
    return function () {
      element.removeEventListener(eventName, handler);
    };
  }

  addGlobalEventListener(target, eventName, handler) {
    const t = getGlobalEventTarget$1(document, target);
    t.addEventListener(eventName, handler);
    return () => {
      t.removeEventListener(eventName, handler);
    };
  }

}

function getGlobalEventTarget$1(doc, target) {
  if (target === 'window') {
    return window;
  }

  if (target === 'document') {
    return doc;
  }

  if (target === 'body') {
    return doc.body;
  }

  return null;
}

function _readStyleAttribute(element) {
  const styleMap = {};
  const styleAttribute = element.getAttribute('style');

  if (styleAttribute) {
    const styleList = styleAttribute.split(/;+/g);

    for (let i = 0; i < styleList.length; i++) {
      const style = styleList[i].trim();

      if (style.length > 0) {
        const colonIndex = style.indexOf(':');

        if (colonIndex === -1) {
          throw new Error(`Invalid CSS style: ${style}`);
        }

        const name = style.substr(0, colonIndex).trim();
        styleMap[name] = style.substr(colonIndex + 1).trim();
      }
    }
  }

  return styleMap;
}

function _writeStyleAttribute(element, styleMap) {
  let styleAttrValue = '';

  for (const key in styleMap) {
    const newValue = styleMap[key];

    if (newValue != null) {
      styleAttrValue += key + ':' + styleMap[key] + ';';
    }
  }

  element.setAttribute('style', styleAttrValue);
}

const GridsterConfigService = {
  gridType: GridType.Fit,
  fixedColWidth: 250,
  fixedRowHeight: 250,
  keepFixedHeightInMobile: false,
  keepFixedWidthInMobile: false,
  setGridSize: false,
  compactType: CompactType.None,
  mobileBreakpoint: 640,
  minCols: 1,
  maxCols: 100,
  minRows: 1,
  maxRows: 100,
  defaultItemCols: 1,
  defaultItemRows: 1,
  maxItemCols: 50,
  maxItemRows: 50,
  minItemCols: 1,
  minItemRows: 1,
  minItemArea: 1,
  maxItemArea: 2500,
  margin: 10,
  outerMargin: true,
  outerMarginTop: null,
  outerMarginRight: null,
  outerMarginBottom: null,
  outerMarginLeft: null,
  useTransformPositioning: true,
  scrollSensitivity: 10,
  scrollSpeed: 20,
  initCallback: undefined,
  destroyCallback: undefined,
  gridSizeChangedCallback: undefined,
  itemChangeCallback: undefined,
  itemResizeCallback: undefined,
  itemInitCallback: undefined,
  itemRemovedCallback: undefined,
  itemValidateCallback: undefined,
  enableEmptyCellClick: false,
  enableEmptyCellContextMenu: false,
  enableEmptyCellDrop: false,
  enableEmptyCellDrag: false,
  enableOccupiedCellDrop: false,
  emptyCellClickCallback: undefined,
  emptyCellContextMenuCallback: undefined,
  emptyCellDropCallback: undefined,
  emptyCellDragCallback: undefined,
  emptyCellDragMaxCols: 50,
  emptyCellDragMaxRows: 50,
  ignoreMarginInRow: false,
  draggable: {
    delayStart: 0,
    enabled: false,
    ignoreContentClass: 'gridster-item-content',
    ignoreContent: false,
    dragHandleClass: 'drag-handler',
    stop: undefined,
    start: undefined,
    dropOverItems: false,
    dropOverItemsCallback: undefined,
    dropOverItemSplit: false,
    dropOverItemStack: false
  },
  resizable: {
    delayStart: 0,
    enabled: false,
    handles: {
      s: true,
      e: true,
      n: true,
      w: true,
      se: true,
      ne: true,
      sw: true,
      nw: true
    },
    stop: undefined,
    start: undefined
  },
  swap: true,
  swapWhileDragging: false,
  pushItems: false,
  disablePushOnDrag: false,
  disablePushOnResize: false,
  pushDirections: {
    north: true,
    east: true,
    south: true,
    west: true
  },
  pushResizeItems: false,
  displayGrid: DisplayGrid.OnDragAndResize,
  disableWindowResize: false,
  disableWarnings: false,
  scrollToNewItems: false,
  disableScrollHorizontal: false,
  disableScrollVertical: false,
  disableAutoPositionOnConflict: false
};

class GridsterUtils {
  static merge(obj1, obj2, properties) {
    for (const p in obj2) {
      if (obj2[p] !== void 0 && properties.hasOwnProperty(p)) {
        if (typeof obj2[p] === 'object') {
          obj1[p] = GridsterUtils.merge(obj1[p], obj2[p], properties[p]);
        } else {
          obj1[p] = obj2[p];
        }
      }
    }

    return obj1;
  }

  static debounce(func, wait) {
    let timeout;
    return (...arg) => {
      const context = this;
      const args = arg;

      const later = function () {
        timeout = null;
        func.apply(context, args);
      };

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  static checkTouchEvent(e) {
    if (e.clientX === undefined && e.touches) {
      if (e.touches && e.touches.length) {
        e.clientX = e.touches[0].clientX;
        e.clientY = e.touches[0].clientY;
      } else if (e.changedTouches && e.changedTouches.length) {
        e.clientX = e.changedTouches[0].clientX;
        e.clientY = e.changedTouches[0].clientY;
      }
    }
  }

  static checkContentClassForEvent(gridster, e) {
    if (gridster.$options.draggable.ignoreContent) {
      if (!GridsterUtils.checkContentClass(e.target, e.currentTarget, gridster.$options.draggable.dragHandleClass)) {
        return true;
      }
    } else {
      if (GridsterUtils.checkContentClass(e.target, e.currentTarget, gridster.$options.draggable.ignoreContentClass)) {
        return true;
      }
    }

    return false;
  }

  static checkContentClassForEmptyCellClickEvent(gridster, e) {
    return GridsterUtils.checkContentClass(e.target, e.currentTarget, gridster.$options.draggable.ignoreContentClass) || GridsterUtils.checkContentClass(e.target, e.currentTarget, gridster.$options.draggable.dragHandleClass);
  }

  static checkContentClass(target, current, contentClass) {
    if (!target || target === current) {
      return false;
    }

    if (target.hasAttribute('class') && target.getAttribute('class').split(' ').indexOf(contentClass) > -1) {
      return true;
    } else {
      return GridsterUtils.checkContentClass(target.parentNode, current, contentClass);
    }
  }

  static compareItems(a, b) {
    if (a.y > b.y) {
      return -1;
    } else if (a.y < b.y) {
      return 1;
    } else if (a.x > b.x) {
      return -1;
    } else {
      return 1;
    }
  }

}

var GridsterItemSplitMode;

(function (GridsterItemSplitMode) {
  GridsterItemSplitMode["up"] = "up";
  GridsterItemSplitMode["down"] = "down";
  GridsterItemSplitMode["left"] = "left";
  GridsterItemSplitMode["right"] = "right";
})(GridsterItemSplitMode || (GridsterItemSplitMode = {}));

class GridsterEmptyCell {
  constructor(gridster) {
    this.gridster = gridster;
  }

  destroy() {
    delete this.initialItem;
    delete this.gridster.movingItem;

    if (this.gridster.previewStyle && !this.gridster.$options.draggable.dropOverItemStack) {
      this.gridster.previewStyle();
    }

    delete this.gridster;

    if (this.emptyCellExit) {
      this.emptyCellExit();
      this.emptyCellExit = null;
    }
  }

  updateOptions() {
    if (this.gridster.$options.enableEmptyCellClick && !this.emptyCellClick && this.gridster.options.emptyCellClickCallback) {
      this.emptyCellClick = this.gridster.renderer.listen(this.gridster.el, 'click', this.emptyCellClickCb.bind(this));
      this.emptyCellClickTouch = this.gridster.renderer.listen(this.gridster.el, 'touchend', this.emptyCellClickCb.bind(this));
    } else if (!this.gridster.$options.enableEmptyCellClick && this.emptyCellClick && this.emptyCellClickTouch) {
      this.emptyCellClick();
      this.emptyCellClickTouch();
      this.emptyCellClick = null;
      this.emptyCellClickTouch = null;
    }

    if (this.gridster.$options.enableEmptyCellContextMenu && !this.emptyCellContextMenu && this.gridster.options.emptyCellContextMenuCallback) {
      this.emptyCellContextMenu = this.gridster.renderer.listen(this.gridster.el, 'contextmenu', this.emptyCellContextMenuCb.bind(this));
    } else if (!this.gridster.$options.enableEmptyCellContextMenu && this.emptyCellContextMenu) {
      this.emptyCellContextMenu();
      this.emptyCellContextMenu = null;
    }

    if (this.gridster.$options.enableEmptyCellDrop && !this.emptyCellDrop && this.gridster.options.emptyCellDropCallback) {
      this.emptyCellDrop = this.gridster.renderer.listen(this.gridster.el, 'drop', this.emptyCellDragDrop.bind(this));
    } else if (!this.gridster.$options.enableEmptyCellDrop && this.emptyCellDrop && this.emptyCellMove && this.emptyCellExit) {
      this.emptyCellDrop();
      this.emptyCellMove();
      this.emptyCellExit();
      this.emptyCellMove = null;
      this.emptyCellDrop = null;
      this.emptyCellExit = null;
    }

    if (this.gridster.$options.enableEmptyCellDrag && !this.emptyCellDrag && this.gridster.options.emptyCellDragCallback) {
      this.emptyCellDrag = this.gridster.renderer.listen(this.gridster.el, 'mousedown', this.emptyCellMouseDown.bind(this));
      this.emptyCellDragTouch = this.gridster.renderer.listen(this.gridster.el, 'touchstart', this.emptyCellMouseDown.bind(this));
    } else if (!this.gridster.$options.enableEmptyCellDrag && this.emptyCellDrag && this.emptyCellDragTouch) {
      this.emptyCellDrag();
      this.emptyCellDragTouch();
      this.emptyCellDrag = null;
      this.emptyCellDragTouch = null;
    }
  }

  emptyCellClickCb(e) {
    if (this.gridster.movingItem || GridsterUtils.checkContentClassForEmptyCellClickEvent(this.gridster, e)) {
      return;
    }

    const item = this.getValidItemFromEvent(e);

    if (!item) {
      return;
    }

    if (this.gridster.options.emptyCellClickCallback) {
      this.gridster.options.emptyCellClickCallback(e, item);
    }
  }

  emptyCellContextMenuCb(e) {
    if (this.gridster.movingItem || GridsterUtils.checkContentClassForEmptyCellClickEvent(this.gridster, e)) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();
    const item = this.getValidItemFromEvent(e);

    if (!item) {
      return;
    }

    if (this.gridster.options.emptyCellContextMenuCallback) {
      this.gridster.options.emptyCellContextMenuCallback(e, item);
    }
  }

  emptyCellDragDrop(e) {
    const item = this.getValidItemFromEvent(e);

    if (!item) {
      return;
    }

    if (item.spliting && item.splitingItemComponent) {
      const overItem = item.splitingItemComponent.item;

      switch (item.spliting) {
        case GridsterItemSplitMode.up:
          overItem.y += item.rows;
          overItem.rows = overItem.rows - item.rows;
          break;

        case GridsterItemSplitMode.down:
          overItem.rows = overItem.rows - item.rows;
          break;

        case GridsterItemSplitMode.left:
          overItem.x += item.cols;
          overItem.cols = overItem.cols - item.cols;
          break;

        case GridsterItemSplitMode.right:
          overItem.cols = overItem.cols - item.cols;
          break;
      }

      item.splitingItemComponent.updateOptions();
    }

    if (this.gridster.options.emptyCellDropCallback) {
      this.gridster.options.emptyCellDropCallback(e, item);
    }
  }

  emptyCellDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    const draggingDom = (e.srcElement || e.target).ownerDocument.querySelector('[dragChannel]');

    if (!draggingDom || 'gridster' != draggingDom.getAttribute('dragChannel')) {
      e.dataTransfer.dropEffect = 'none';
      this.gridster.movingItem = null;
      return;
    }

    const item = this.getValidItemFromEvent(e);

    if (item) {
      e.dataTransfer.dropEffect = 'move';
      this.gridster.movingItem = item;
    } else {
      e.dataTransfer.dropEffect = 'none';
      this.gridster.movingItem = null;
    }

    if (!this.gridster.$options.draggable.dropOverItemStack) {
      this.gridster.previewStyle();
    }
  }

  emptyCellMouseDown(e) {
    if (GridsterUtils.checkContentClassForEmptyCellClickEvent(this.gridster, e)) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();
    const item = this.getValidItemFromEvent(e);
    const leftMouseButtonCode = 1;

    if (!item || e.buttons !== leftMouseButtonCode) {
      return;
    }

    this.initialItem = item;
    this.gridster.movingItem = item;

    if (!this.gridster.$options.draggable.dropOverItemStack) {
      this.gridster.previewStyle();
    }

    this.emptyCellUp = this.gridster.renderer.listen('window', 'mouseup', this.emptyCellMouseUp.bind(this));
    this.emptyCellUpTouch = this.gridster.renderer.listen('window', 'touchend', this.emptyCellMouseUp.bind(this));
  }

  emptyCellMouseMove(e) {
    e.preventDefault();
    e.stopPropagation();
    const item = this.getValidItemFromEvent(e, this.initialItem);

    if (!item) {
      return;
    }

    this.gridster.movingItem = item;

    if (!this.gridster.$options.draggable.dropOverItemStack) {
      this.gridster.previewStyle();
    }
  }

  emptyCellMouseUp(e) {
    this.emptyCellMMove();
    this.emptyCellMMoveTouch();
    this.emptyCellUp();
    this.emptyCellUpTouch();
    const item = this.getValidItemFromEvent(e, this.initialItem);

    if (item) {
      this.gridster.movingItem = item;
    }

    if (this.gridster.options.emptyCellDragCallback && this.gridster.movingItem) {
      this.gridster.options.emptyCellDragCallback(e, this.gridster.movingItem);
    }

    setTimeout(() => {
      this.initialItem = null;

      if (this.gridster) {
        this.gridster.movingItem = null;

        if (!this.gridster.$options.draggable.dropOverItemStack) {
          this.gridster.previewStyle();
        }
      }
    });
  }

  getValidItemFromEvent(e, oldItem) {
    e.preventDefault();
    e.stopPropagation();
    GridsterUtils.checkTouchEvent(e);
    const rect = this.gridster.el.getBoundingClientRect();
    const x = e.clientX + this.gridster.el.scrollLeft - rect.left - this.gridster.$options.margin;
    const y = e.clientY + this.gridster.el.scrollTop - rect.top - this.gridster.$options.margin;
    let item = {
      x: this.gridster.pixelsToPositionX(x, Math.floor, true),
      y: this.gridster.pixelsToPositionY(y, Math.floor, true),
      cols: this.gridster.$options.defaultItemCols,
      rows: this.gridster.$options.defaultItemRows
    };
    let overItem;

    if (this.gridster.$options.draggable.dropOverItemSplit) {
      const checkItem = {
        x: Math.max(0, item.x),
        y: Math.max(0, item.y),
        cols: 1,
        rows: 1
      };

      if (overItem = this.gridster.findItemWithItem(checkItem)) {
        const splitUD = overItem.$item.rows >= this.gridster.$options.minItemRows * 2 && overItem.$item.cols >= this.gridster.$options.minItemCols && Math.ceil(overItem.$item.rows / 2) >= (overItem.$item.minItemRows || this.gridster.$options.minItemRows),
              splitLR = overItem.$item.cols >= this.gridster.$options.minItemCols * 2 && overItem.$item.rows >= this.gridster.$options.minItemRows && Math.ceil(overItem.$item.cols / 2) >= (overItem.$item.minItemCols || this.gridster.$options.minItemCols),
              halfPositionX = overItem.left + overItem.width / 2,
              halfPositionY = overItem.top + overItem.height / 2,
              angle = Math.atan2(overItem.height, overItem.width);

        if (x < halfPositionX && y < halfPositionY) {
          const tmpAngle = Math.atan2(y - overItem.top, x - overItem.left);

          if (tmpAngle > angle && splitLR) {
            this.splitItem(item, overItem, GridsterItemSplitMode.left);
          } else if (splitUD) {
            this.splitItem(item, overItem, GridsterItemSplitMode.up);
          }
        } else if (x < halfPositionX && y > halfPositionY) {
          const tmpAngle = Math.atan2(overItem.top + overItem.height - y, x - overItem.left);

          if (tmpAngle > angle && splitLR) {
            this.splitItem(item, overItem, GridsterItemSplitMode.left);
          } else if (splitUD) {
            this.splitItem(item, overItem, GridsterItemSplitMode.down);
          }
        } else if (x > halfPositionX && y < halfPositionY) {
          const tmpAngle = Math.atan2(y - overItem.top, overItem.left + overItem.width - x);

          if (tmpAngle > angle && splitLR) {
            this.splitItem(item, overItem, GridsterItemSplitMode.right);
          } else if (splitUD) {
            this.splitItem(item, overItem, GridsterItemSplitMode.up);
          }
        } else if (x > halfPositionX && y > halfPositionY) {
          const tmpAngle = Math.atan2(overItem.top + overItem.height - y, overItem.left + overItem.width - x);

          if (tmpAngle > angle && splitLR) {
            this.splitItem(item, overItem, GridsterItemSplitMode.right);
          } else if (splitUD) {
            this.splitItem(item, overItem, GridsterItemSplitMode.down);
          }
        }
      } else {
        const leftReferenceItem = this.checkdReferenceItem(Object.assign({}, checkItem), 'left'),
              rightReferenceItem = this.checkdReferenceItem(Object.assign({}, checkItem), 'right');
        checkItem.x = leftReferenceItem ? leftReferenceItem.$item.x + leftReferenceItem.$item.cols : 0;
        checkItem.cols = (rightReferenceItem ? rightReferenceItem.$item.x : this.gridster.$options.maxCols) - checkItem.x;

        if (this.gridster.$options.gridType === GridType.Fit) {
          const topReferenceItem = this.checkdReferenceItem(Object.assign({}, checkItem), 'top'),
                bottomReferenceItem = this.checkdReferenceItem(Object.assign({}, checkItem), 'bottom');
          checkItem.y = topReferenceItem ? topReferenceItem.$item.y + topReferenceItem.$item.rows : 0;
          checkItem.rows = (bottomReferenceItem ? bottomReferenceItem.$item.y : this.gridster.$options.maxRows) - checkItem.y;
          item = checkItem;
        } else {
          item.x = checkItem.x;
          item.cols = checkItem.cols;
        }
      }
    }

    if (oldItem) {
      item.cols = Math.min(Math.abs(oldItem.x - item.x) + 1, this.gridster.$options.emptyCellDragMaxCols);
      item.rows = Math.min(Math.abs(oldItem.y - item.y) + 1, this.gridster.$options.emptyCellDragMaxRows);

      if (oldItem.x < item.x) {
        item.x = oldItem.x;
      } else if (oldItem.x - item.x > this.gridster.$options.emptyCellDragMaxCols - 1) {
        item.x = this.gridster.movingItem ? this.gridster.movingItem.x : 0;
      }

      if (oldItem.y < item.y) {
        item.y = oldItem.y;
      } else if (oldItem.y - item.y > this.gridster.$options.emptyCellDragMaxRows - 1) {
        item.y = this.gridster.movingItem ? this.gridster.movingItem.y : 0;
      }
    }

    if (!this.gridster.$options.draggable.dropOverItemSplit && !this.gridster.$options.draggable.dropOverItemStack && this.gridster.checkCollision(item)) {
      return;
    }

    return item;
  }

  splitItem(item, overItem, mode) {
    item.spliting = mode;
    item.splitingItemComponent = overItem;

    switch (mode) {
      case GridsterItemSplitMode.up:
        item.x = overItem.$item.x;
        item.y = overItem.$item.y;
        item.rows = Math.floor(overItem.$item.rows / 2);
        item.cols = overItem.$item.cols;
        break;

      case GridsterItemSplitMode.down:
        item.x = overItem.$item.x;
        item.y = Math.ceil(overItem.$item.y + overItem.$item.rows / 2);
        item.rows = Math.floor(overItem.$item.rows / 2);
        item.cols = overItem.$item.cols;
        break;

      case GridsterItemSplitMode.left:
        item.x = overItem.$item.x;
        item.y = overItem.$item.y;
        item.rows = overItem.$item.rows;
        item.cols = Math.floor(overItem.$item.cols / 2);
        break;

      case GridsterItemSplitMode.right:
        item.x = Math.ceil(overItem.$item.x + overItem.$item.cols / 2);
        item.y = overItem.$item.y;
        item.rows = overItem.$item.rows;
        item.cols = Math.floor(overItem.$item.cols / 2);
        break;
    }
  }

  checkdReferenceItem(checkItem, pos) {
    let findItem = this.gridster.findItemWithItem(checkItem);

    if (!findItem) {
      switch (pos) {
        case 'left':
          if (checkItem.x <= 1) return undefined;
          checkItem.x -= 1;
          break;

        case 'right':
          if (checkItem.x >= this.gridster.$options.maxCols) return undefined;
          checkItem.x += 1;
          break;

        case 'top':
          if (checkItem.y <= 1) return undefined;
          checkItem.y -= 1;
          break;

        case 'bottom':
          if (checkItem.y >= this.gridster.$options.maxRows) return undefined;
          checkItem.y += 1;
          break;

        default:
          return undefined;
      }

      findItem = this.checkdReferenceItem(checkItem, pos) || false;
    }

    return findItem ? findItem : undefined;
  }

  fitByReferenceItem(updateItem, leftReferenceItem, rightReferenceItem) {
    if (leftReferenceItem && !rightReferenceItem) {
      if (this.gridster.$options.minItemRows > leftReferenceItem.$item.rows) return false;
      if (this.gridster.$options.minItemCols > this.gridster.$options.maxCols - leftReferenceItem.$item.x - leftReferenceItem.$item.cols) return false;
      updateItem.x = leftReferenceItem.$item.x + leftReferenceItem.$item.cols;
      updateItem.y = leftReferenceItem.$item.y;
      updateItem.rows = leftReferenceItem.$item.rows;
      updateItem.cols = this.gridster.$options.maxCols - leftReferenceItem.$item.x - leftReferenceItem.$item.cols;
    } else if (!leftReferenceItem && rightReferenceItem) {
      if (this.gridster.$options.minItemRows > rightReferenceItem.$item.rows) return false;
      if (this.gridster.$options.minItemCols > rightReferenceItem.$item.x) return false;
      updateItem.x = 0;
      updateItem.y = rightReferenceItem.$item.y;
      updateItem.rows = rightReferenceItem.$item.rows;
      updateItem.cols = rightReferenceItem.$item.x;
    } else if (leftReferenceItem && rightReferenceItem) {
      if (this.gridster.$options.minItemRows > leftReferenceItem.$item.rows) return false;
      if (this.gridster.$options.minItemCols > rightReferenceItem.$item.x - leftReferenceItem.$item.x - leftReferenceItem.$item.cols) return false;
      updateItem.x = leftReferenceItem.$item.x + leftReferenceItem.$item.cols;
      updateItem.y = leftReferenceItem.$item.y;
      updateItem.rows = leftReferenceItem.$item.rows;
      updateItem.cols = rightReferenceItem.$item.x - leftReferenceItem.$item.x - leftReferenceItem.$item.cols;
    }

    return true;
  }

}

class GridsterCompact {
  constructor(gridster) {
    this.gridster = gridster;
  }

  destroy() {
    delete this.gridster;
  }

  checkCompact() {
    if (this.gridster.$options.compactType !== CompactType.None) {
      if (this.gridster.$options.compactType === CompactType.CompactUp) {
        this.checkCompactUp();
      } else if (this.gridster.$options.compactType === CompactType.CompactLeft) {
        this.checkCompactLeft();
      } else if (this.gridster.$options.compactType === CompactType.CompactUpAndLeft) {
        this.checkCompactUp();
        this.checkCompactLeft();
      } else if (this.gridster.$options.compactType === CompactType.CompactLeftAndUp) {
        this.checkCompactLeft();
        this.checkCompactUp();
      } else if (this.gridster.$options.compactType === CompactType.CompactRight) {
        this.checkCompactRight();
      } else if (this.gridster.$options.compactType === CompactType.CompactUpAndRight) {
        this.checkCompactUp();
        this.checkCompactRight();
      } else if (this.gridster.$options.compactType === CompactType.CompactRightAndUp) {
        this.checkCompactRight();
        this.checkCompactUp();
      }
    }
  }

  checkCompactItem(item) {
    if (this.gridster.$options.compactType !== CompactType.None) {
      if (this.gridster.$options.compactType === CompactType.CompactUp) {
        this.moveUpTillCollision(item);
      } else if (this.gridster.$options.compactType === CompactType.CompactLeft) {
        this.moveLeftTillCollision(item);
      } else if (this.gridster.$options.compactType === CompactType.CompactUpAndLeft) {
        this.moveUpTillCollision(item);
        this.moveLeftTillCollision(item);
      } else if (this.gridster.$options.compactType === CompactType.CompactLeftAndUp) {
        this.moveLeftTillCollision(item);
        this.moveUpTillCollision(item);
      } else if (this.gridster.$options.compactType === CompactType.CompactUpAndRight) {
        this.moveUpTillCollision(item);
        this.moveRightTillCollision(item);
      }
    }
  }

  checkCompactUp() {
    let widgetMovedUp = false,
        widget,
        moved;
    const l = this.gridster.grid.length;

    for (let i = 0; i < l; i++) {
      widget = this.gridster.grid[i];

      if (widget.$item.compactEnabled === false) {
        continue;
      }

      moved = this.moveUpTillCollision(widget.$item);

      if (moved) {
        widgetMovedUp = true;
        widget.item.y = widget.$item.y;
        widget.itemChanged();
      }
    }

    if (widgetMovedUp) {
      this.checkCompact();
    }
  }

  moveUpTillCollision(item) {
    item.y -= 1;

    if (this.gridster.checkCollision(item)) {
      item.y += 1;
      return false;
    } else {
      this.moveUpTillCollision(item);
      return true;
    }
  }

  checkCompactLeft() {
    let widgetMovedUp = false,
        widget,
        moved;
    const l = this.gridster.grid.length;

    for (let i = 0; i < l; i++) {
      widget = this.gridster.grid[i];

      if (widget.$item.compactEnabled === false) {
        continue;
      }

      moved = this.moveLeftTillCollision(widget.$item);

      if (moved) {
        widgetMovedUp = true;
        widget.item.x = widget.$item.x;
        widget.itemChanged();
      }
    }

    if (widgetMovedUp) {
      this.checkCompact();
    }
  }

  checkCompactRight() {
    let widgetMovedUp = false,
        widget,
        moved;
    const l = this.gridster.grid.length;

    for (let i = 0; i < l; i++) {
      widget = this.gridster.grid[i];

      if (widget.$item.compactEnabled === false) {
        continue;
      }

      moved = this.moveRightTillCollision(widget.$item);

      if (moved) {
        widgetMovedUp = true;
        widget.item.x = widget.$item.x;
        widget.itemChanged();
      }
    }

    if (widgetMovedUp) {
      this.checkCompact();
    }
  }

  moveLeftTillCollision(item) {
    item.x -= 1;

    if (this.gridster.checkCollision(item)) {
      item.x += 1;
      return false;
    } else {
      this.moveLeftTillCollision(item);
      return true;
    }
  }

  moveRightTillCollision(item) {
    item.x += 1;

    if (this.gridster.checkCollision(item)) {
      item.x -= 1;
      return false;
    } else {
      this.moveRightTillCollision(item);
      return true;
    }
  }

}

var styles = {"gridster":"_styles-module__gridster__3FbIf","fit":"_styles-module__fit__2cIYj","scrollVertical":"_styles-module__scrollVertical__2BhiX","scrollHorizontal":"_styles-module__scrollHorizontal__3XPdq","fixed":"_styles-module__fixed__2lylp","mobile":"_styles-module__mobile__2RmiB","gridsterColumn":"_styles-module__gridsterColumn__2PdEo","gridsterRow":"_styles-module__gridsterRow__k3kT0","displayGrid":"_styles-module__displayGrid__3X7y5"};

class Gridster extends Component {
  constructor(props) {
    super(props);
    this.columns = 12;
    this.rows = 12;
    this.gridColumns = [];
    this.gridRows = [];
    this.gridRenderer = new GridsterRenderer(this);
    this.renderer = new Renderer();
    this.state = {
      columns: 12,
      rows: 12,
      curWidth: 0,
      curHeight: 0,
      curColWidth: 0,
      curRowHeight: 0,
      grid: []
    };
    this.$options = JSON.parse(JSON.stringify(GridsterConfigService));
    this.calculateLayoutDebounce = GridsterUtils.debounce(this.calculateLayout.bind(this), 0);
    this.mobile = false;
    this.curWidth = 0;
    this.curHeight = 0;
    this.grid = [];
    this.curColWidth = 0;
    this.curRowHeight = 0;
    this.dragInProgress = false;
    this.emptyCell = new GridsterEmptyCell(this);
    this.compact = new GridsterCompact(this);
    this.gridRenderer = new GridsterRenderer(this);
    console.log(props);

    if (this.props.options) {
      this.options = this.props.options;
      this.setOptions();
      this.columns = this.$options.minCols;
      this.rows = this.$options.minRows;
    }
  }

  componentDidUpdate() {
    this.columns = this.$options.minCols;
    this.rows = this.$options.minRows;
    this.setOptions();
  }

  componentDidMount() {
    this.el = document.getElementById('gridster-board');
    this.setOptions();
    this.setGridSize();
    this.calculateLayout();
    this.updateGrid();
    this.forceUpdate();
  }

  static checkCollisionTwoItems(item, item2) {
    return item.x < item2.x + item2.cols && item.x + item.cols > item2.x && item.y < item2.y + item2.rows && item.y + item.rows > item2.y;
  }

  findItemWithItem(item) {
    let widgetsIndex = this.grid.length - 1,
        widget;

    for (; widgetsIndex > -1; widgetsIndex--) {
      widget = this.grid[widgetsIndex];

      if (widget.$item !== item && Gridster.checkCollisionTwoItems(widget.$item, item)) {
        return widget;
      }
    }

    return false;
  }

  findItemsWithItem(item) {
    const a = [];
    let widgetsIndex = this.grid.length - 1,
        widget;

    for (; widgetsIndex > -1; widgetsIndex--) {
      widget = this.grid[widgetsIndex];

      if (widget.$item !== item && Gridster.checkCollisionTwoItems(widget.$item, item)) {
        a.push(widget);
      }
    }

    return a;
  }

  checkCollision(item) {
    console.log(item);
    return false;
  }

  checkGridCollision(item) {
    console.log(item);
    return false;
  }

  checkCollisionForSwaping(item) {
    console.log(item);
    return false;
  }

  pixelsToPositionX(x, roundingMethod, noLimit) {
    const position = roundingMethod(x / this.curColWidth);

    if (noLimit) {
      return position;
    } else {
      return Math.max(position, 0);
    }
  }

  pixelsToPositionY(y, roundingMethod, noLimit) {
    const position = roundingMethod(y / this.curRowHeight);

    if (noLimit) {
      return position;
    } else {
      return Math.max(position, 0);
    }
  }

  positionXToPixels(x) {
    return x * this.curColWidth;
  }

  positionYToPixels(y) {
    return y * this.curRowHeight;
  }

  addItem(itemComponent) {
    console.log('add', itemComponent);

    if (itemComponent.$item.cols === undefined) {
      itemComponent.$item.cols = this.$options.defaultItemCols;
      itemComponent.item.cols = itemComponent.$item.cols;
      itemComponent.itemChanged();
    }

    if (itemComponent.$item.rows === undefined) {
      itemComponent.$item.rows = this.$options.defaultItemRows;
      itemComponent.item.rows = itemComponent.$item.rows;
      itemComponent.itemChanged();
    }

    if (itemComponent.$item.x === -1 || itemComponent.$item.y === -1) {
      this.autoPositionItem(itemComponent);
    } else if (this.checkCollision(itemComponent.$item)) {
      if (!this.$options.disableWarnings) {
        itemComponent.notPlaced = true;
        console.warn('Can\'t be placed in the bounds of the dashboard, trying to auto position!/n' + JSON.stringify(itemComponent.item, ['cols', 'rows', 'x', 'y']));
      }

      if (!this.$options.disableAutoPositionOnConflict) {
        this.autoPositionItem(itemComponent);
      } else {
        itemComponent.notPlaced = true;
      }
    }

    this.grid.push(itemComponent);
    this.setState({
      grid: this.grid
    });
    this.calculateLayoutDebounce();
  }

  removeItem(itemComponent) {
    console.log(itemComponent);
  }

  setGridDimensions() {
    this.setGridSize();

    if (!this.mobile && this.$options.mobileBreakpoint > this.curWidth) {
      this.mobile = !this.mobile;
      this.renderer.addClass(this.el, 'mobile');
    } else if (this.mobile && this.$options.mobileBreakpoint < this.curWidth) {
      this.mobile = !this.mobile;
      this.renderer.removeClass(this.el, 'mobile');
    }

    let rows = this.$options.minRows;
    let columns = this.$options.minCols;
    let widgetsIndex = this.grid.length - 1;
    let widget;

    for (; widgetsIndex >= 0; widgetsIndex--) {
      widget = this.grid[widgetsIndex];

      if (!widget.notPlaced) {
        rows = Math.max(rows, widget.$item.y + widget.$item.rows);
        columns = Math.max(columns, widget.$item.x + widget.$item.cols);
      }
    }

    if (this.columns !== columns || this.rows !== rows) {
      this.columns = columns;
      this.rows = rows;
      this.setState({
        rows: this.rows,
        columns: this.columns
      });

      if (this.options.gridSizeChangedCallback) {
        this.options.gridSizeChangedCallback(this);
      }
    }
  }

  autoPositionItem(itemComponent) {
    if (this.getNextPossiblePosition(itemComponent.$item)) {
      itemComponent.notPlaced = false;
      itemComponent.item.x = itemComponent.$item.x;
      itemComponent.item.y = itemComponent.$item.y;
      itemComponent.itemChanged();
    } else {
      itemComponent.notPlaced = true;

      if (!this.$options.disableWarnings) {
        console.warn('Can\'t be placed in the bounds of the dashboard!/n' + JSON.stringify(itemComponent.item, ['cols', 'rows', 'x', 'y']));
      }
    }
  }

  getNextPossiblePosition(newItem, startingFrom = {}) {
    if (newItem.cols === -1) {
      newItem.cols = this.$options.defaultItemCols;
    }

    if (newItem.rows === -1) {
      newItem.rows = this.$options.defaultItemRows;
    }

    this.setGridDimensions();
    let rowsIndex = startingFrom.y || 0;
    let colsIndex;

    for (; rowsIndex < this.rows; rowsIndex++) {
      newItem.y = rowsIndex;
      colsIndex = startingFrom.x || 0;

      for (; colsIndex < this.columns; colsIndex++) {
        newItem.x = colsIndex;

        if (!this.checkCollision(newItem)) {
          return true;
        }
      }
    }

    const canAddToRows = this.$options.maxRows >= this.rows + newItem.rows;
    const canAddToColumns = this.$options.maxCols >= this.columns + newItem.cols;
    const addToRows = this.rows <= this.columns && canAddToRows;

    if (!addToRows && canAddToColumns) {
      newItem.x = this.columns;
      newItem.y = 0;
      return true;
    } else if (canAddToRows) {
      newItem.y = this.rows;
      newItem.x = 0;
      return true;
    }

    return false;
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
    console.log(width, 'w');
    console.log(height, 'h');
    this.setState({
      curWidth: this.curWidth,
      curHeight: this.curHeight
    });
  }

  setOptions() {
    this.$options = GridsterUtils.merge(this.$options, this.options, this.$options);
    console.log(this.options);

    if (!this.$options.disableWindowResize && !this.windowResize) {
      this.windowResize = this.renderer.listen('window', 'resize', debounce(this.onResize.bind(this), 200));
    } else if (this.$options.disableWindowResize && this.windowResize) {
      this.windowResize();
      this.windowResize = null;
    }

    this.emptyCell.updateOptions();
  }

  optionsChanged() {
    this.setOptions();
  }

  calculateLayout() {
    if (this.compact) {
      this.compact.checkCompact();
    }

    this.setGridDimensions();

    if (this.$options.outerMargin) {
      let marginWidth = -this.$options.margin;

      if (this.$options.outerMarginLeft !== null) {
        marginWidth += this.$options.outerMarginLeft;
        this.renderer.setStyle(this.el, 'padding-left', this.$options.outerMarginLeft + 'px');
      } else {
        marginWidth += this.$options.margin;
        this.renderer.setStyle(this.el, 'padding-left', this.$options.margin + 'px');
      }

      if (this.$options.outerMarginRight !== null) {
        marginWidth += this.$options.outerMarginRight;
        this.renderer.setStyle(this.el, 'padding-right', this.$options.outerMarginRight + 'px');
      } else {
        marginWidth += this.$options.margin;
        this.renderer.setStyle(this.el, 'padding-right', this.$options.margin + 'px');
      }

      this.curColWidth = (this.curWidth - marginWidth) / this.columns;
      let marginHeight = -this.$options.margin;

      if (this.$options.outerMarginTop !== null) {
        marginHeight += this.$options.outerMarginTop;
        this.renderer.setStyle(this.el, 'padding-top', this.$options.outerMarginTop + 'px');
      } else {
        marginHeight += this.$options.margin;
        this.renderer.setStyle(this.el, 'padding-top', this.$options.margin + 'px');
      }

      if (this.$options.outerMarginBottom !== null) {
        marginHeight += this.$options.outerMarginBottom;
        this.renderer.setStyle(this.el, 'padding-bottom', this.$options.outerMarginBottom + 'px');
      } else {
        marginHeight += this.$options.margin;
        this.renderer.setStyle(this.el, 'padding-bottom', this.$options.margin + 'px');
      }

      this.curRowHeight = (this.curHeight - marginHeight) / this.rows;
    } else {
      this.curColWidth = (this.curWidth + this.$options.margin) / this.columns;
      this.curRowHeight = (this.curHeight + this.$options.margin) / this.rows;
      this.setState({
        curColWidth: this.curColWidth,
        curRowHeight: this.curRowHeight
      });
      this.renderer.setStyle(this.el, 'padding-left', 0 + 'px');
      this.renderer.setStyle(this.el, 'padding-right', 0 + 'px');
      this.renderer.setStyle(this.el, 'padding-top', 0 + 'px');
      this.renderer.setStyle(this.el, 'padding-bottom', 0 + 'px');
    }

    this.gridRenderer.updateGridster();

    if (this.$options.setGridSize) {
      this.renderer.addClass(this.el, 'gridSize');

      if (!this.mobile) {
        this.renderer.setStyle(this.el, 'width', this.columns * this.curColWidth + this.$options.margin + 'px');
        this.renderer.setStyle(this.el, 'height', this.rows * this.curRowHeight + this.$options.margin + 'px');
      }
    } else {
      this.renderer.removeClass(this.el, 'gridSize');
      this.renderer.setStyle(this.el, 'width', '');
      this.renderer.setStyle(this.el, 'height', '');
    }

    this.updateGrid();
    let widgetsIndex = this.grid.length - 1;
    let widget;

    for (; widgetsIndex >= 0; widgetsIndex--) {
      widget = this.grid[widgetsIndex];
      widget.setSize();
    }

    setTimeout(this.resize.bind(this), 100);
  }

  updateGrid() {
    if (this.$options.displayGrid === 'always' && !this.mobile) {
      this.renderer.addClass(this.el, 'display-grid');
    } else if (this.$options.displayGrid === 'onDrag&Resize' && this.dragInProgress) {
      this.renderer.addClass(this.el, 'display-grid');
    } else if (this.$options.displayGrid === 'none' || !this.dragInProgress || this.mobile) {
      this.renderer.removeClass(this.el, 'display-grid');
    }

    this.setGridDimensions();
    this.gridColumns.length = Math.max(this.columns, Math.floor(this.curWidth / this.curColWidth)) || 0;
    this.gridRows.length = Math.max(this.rows, Math.floor(this.curHeight / this.curRowHeight)) || 0;
  }

  checkIfToResize() {
    const clientWidth = this.el.clientWidth;
    const offsetWidth = this.el.offsetWidth;
    const scrollWidth = this.el.scrollWidth;
    const clientHeight = this.el.clientHeight;
    const offsetHeight = this.el.offsetHeight;
    const scrollHeight = this.el.scrollHeight;
    const verticalScrollPresent = clientWidth < offsetWidth && scrollHeight > offsetHeight && scrollHeight - offsetHeight < offsetWidth - clientWidth;
    const horizontalScrollPresent = clientHeight < offsetHeight && scrollWidth > offsetWidth && scrollWidth - offsetWidth < offsetHeight - clientHeight;

    if (verticalScrollPresent) {
      return false;
    }

    return !horizontalScrollPresent;
  }

  onResize() {
    this.setGridSize();
    this.calculateLayout();
  }

  resize() {
    let height;
    let width;

    if (this.$options.gridType === 'fit' && !this.mobile) {
      width = this.el.offsetWidth;
      height = this.el.offsetHeight;
    } else {
      width = this.el.clientWidth;
      height = this.el.clientHeight;
    }

    if ((width !== this.curWidth || height !== this.curHeight) && this.checkIfToResize()) {
      this.onResize();
    }
  }

  render() {
    var _this$$options3;

    const gridsterColumns = [];
    const gridsterRows = [];

    if (this.el) {
      for (let i = 0; i < this.columns; i++) {
        const style = this.gridRenderer.getGridColumnStyle(i);
        gridsterColumns.push(createElement("div", {
          key: 'grid-col-' + i,
          className: styles.gridsterColumn,
          style: style
        }));
      }

      for (let i = 0; i < this.rows; i++) {
        const style = this.gridRenderer.getGridRowStyle(i);
        gridsterRows.push(createElement("div", {
          key: 'grid-row-' + i,
          className: styles.gridsterRow,
          style: style
        }));
      }
    }

    return createElement("div", {
      className: styles.gridster + ' ' + styles.displayGrid + ' ' + styles[(_this$$options3 = this.$options) === null || _this$$options3 === void 0 ? void 0 : _this$$options3.gridType],
      id: "gridster-board"
    }, gridsterColumns, gridsterRows, this.props.children);
  }

}

var styles$1 = {"gridsterItem":"_GridsterItem__gridsterItem__1winc","gridster-item-moving":"_GridsterItem__gridster-item-moving__26JbF","gridster-item-resizing":"_GridsterItem__gridster-item-resizing__3P1oF","gridster-item-resizable-handler":"_GridsterItem__gridster-item-resizable-handler__1860O","handle-n":"_GridsterItem__handle-n__3py2J","handle-e":"_GridsterItem__handle-e__1w0Wv","handle-s":"_GridsterItem__handle-s__3cSXq","handle-w":"_GridsterItem__handle-w__wtPSU","handle-ne":"_GridsterItem__handle-ne__HhaiT","handle-nw":"_GridsterItem__handle-nw__1tRWe","handle-se":"_GridsterItem__handle-se__1LUGQ","handle-sw":"_GridsterItem__handle-sw__KuCBq"};

class GridsterItem extends React__default.Component {
  constructor(props) {
    super(props);
    this.renderer = new Renderer();
    this.state = {
      item: null,
      $item: null,
      top: 0,
      left: 0,
      width: 0,
      height: 0,
      init: false
    };
    this.item = this.props.item;
    this.$item = {
      cols: -1,
      rows: -1,
      x: -1,
      y: -1
    };
    this.gridster = this.props.gridster;
    this.elRef = React__default.createRef();
    this.updateOptions();
  }

  componentWillMount() {
    console.log(1);
    this.gridster.addItem(this);
  }

  componentDidUpdate() {
    console.log(2);
    console.log(this.item);
    this.updateOptions();

    if (!this.init) {
      this.gridster.calculateLayoutDebounce();
    }
  }

  componentDidMount() {
    this.el = this.elRef.current;
  }

  updateOptions() {
    this.$item = GridsterUtils.merge(this.$item, this.item, {
      cols: undefined,
      rows: undefined,
      x: undefined,
      y: undefined,
      dragEnabled: undefined,
      resizeEnabled: undefined,
      compactEnabled: undefined,
      maxItemRows: undefined,
      minItemRows: undefined,
      maxItemCols: undefined,
      minItemCols: undefined,
      maxItemArea: undefined,
      minItemArea: undefined
    });
  }

  setSize() {
    this.renderer.setStyle(this.el, 'display', this.notPlaced ? '' : 'block');
    this.gridster.gridRenderer.updateItem(this.el, this.$item, this.renderer);
    this.updateItemSize();
  }

  updateItemSize() {
    const top = this.$item.y * this.gridster.curRowHeight;
    const left = this.$item.x * this.gridster.curColWidth;
    const width = this.$item.cols * this.gridster.curColWidth - this.gridster.$options.margin;
    const height = this.$item.rows * this.gridster.curRowHeight - this.gridster.$options.margin;

    if (!this.init && width > 0 && height > 0) {
      this.init = true;

      if (this.item.initCallback) {
        this.item.initCallback(this.item, this);
      }

      if (this.gridster.options.itemInitCallback) {
        this.gridster.options.itemInitCallback(this.item, this);
      }

      if (this.gridster.$options.scrollToNewItems) {
        this.el.scrollIntoView(false);
      }
    }

    if (width !== this.width || height !== this.height) {
      this.width = width;
      this.height = height;

      if (this.gridster.options.itemResizeCallback) {
        this.gridster.options.itemResizeCallback(this.item, this);
      }
    }

    this.top = top;
    this.left = left;
  }

  itemChanged() {
    if (this.gridster.options.itemChangeCallback) {
      this.gridster.options.itemChangeCallback(this.item, this);
    }
  }

  checkItemChanges(newValue, oldValue) {
    if (newValue.rows === oldValue.rows && newValue.cols === oldValue.cols && newValue.x === oldValue.x && newValue.y === oldValue.y) {
      return;
    }

    if (this.gridster.checkCollision(this.$item)) {
      this.$item.x = oldValue.x || 0;
      this.$item.y = oldValue.y || 0;
      this.$item.cols = oldValue.cols || 1;
      this.$item.rows = oldValue.rows || 1;
      this.setSize();
    } else {
      this.item.cols = this.$item.cols;
      this.item.rows = this.$item.rows;
      this.item.x = this.$item.x;
      this.item.y = this.$item.y;
      this.gridster.calculateLayoutDebounce();
      this.itemChanged();
    }
  }

  canBeDragged() {
    return !this.gridster.mobile && (this.$item.dragEnabled === undefined ? this.gridster.$options.draggable.enabled : this.$item.dragEnabled);
  }

  canBeResized() {
    return !this.gridster.mobile && (this.$item.resizeEnabled === undefined ? this.gridster.$options.resizable.enabled : this.$item.resizeEnabled);
  }

  render() {
    return React__default.createElement("div", {
      ref: this.elRef,
      className: styles$1.gridsterItem
    }, this.props.children, React__default.createElement("div", {
      className: "gridster-item-resizable-handler handle-s"
    }), React__default.createElement("div", {
      className: "gridster-item-resizable-handler handle-e"
    }), React__default.createElement("div", {
      className: "gridster-item-resizable-handler handle-n"
    }), React__default.createElement("div", {
      className: "gridster-item-resizable-handler handle-w"
    }), React__default.createElement("div", {
      className: "gridster-item-resizable-handler handle-se"
    }), React__default.createElement("div", {
      className: "gridster-item-resizable-handler handle-ne"
    }), React__default.createElement("div", {
      className: "gridster-item-resizable-handler handle-sw"
    }), React__default.createElement("div", {
      className: "gridster-item-resizable-handler handle-nw"
    }));
  }

}

class GridsterItemComponentInterface {}

class GridsterComponentInterface {}

var GridType$1;

(function (GridType) {
  GridType["Fit"] = "fit";
  GridType["ScrollVertical"] = "scrollVertical";
  GridType["ScrollHorizontal"] = "scrollHorizontal";
  GridType["Fixed"] = "fixed";
  GridType["VerticalFixed"] = "verticalFixed";
  GridType["HorizontalFixed"] = "horizontalFixed";
})(GridType$1 || (GridType$1 = {}));

var DisplayGrid$1;

(function (DisplayGrid) {
  DisplayGrid["Always"] = "always";
  DisplayGrid["OnDragAndResize"] = "onDrag&Resize";
  DisplayGrid["None"] = "none";
})(DisplayGrid$1 || (DisplayGrid$1 = {}));

var CompactType$1;

(function (CompactType) {
  CompactType["None"] = "none";
  CompactType["CompactUp"] = "compactUp";
  CompactType["CompactLeft"] = "compactLeft";
  CompactType["CompactUpAndLeft"] = "compactUp&Left";
  CompactType["CompactLeftAndUp"] = "compactLeft&Up";
  CompactType["CompactRight"] = "compactRight";
  CompactType["CompactUpAndRight"] = "compactUp&Right";
  CompactType["CompactRightAndUp"] = "compactRight&Up";
})(CompactType$1 || (CompactType$1 = {}));

const GridsterConfigService$1 = {
  gridType: GridType.Fit,
  fixedColWidth: 250,
  fixedRowHeight: 250,
  keepFixedHeightInMobile: false,
  keepFixedWidthInMobile: false,
  setGridSize: false,
  compactType: CompactType.None,
  mobileBreakpoint: 640,
  minCols: 1,
  maxCols: 100,
  minRows: 1,
  maxRows: 100,
  defaultItemCols: 1,
  defaultItemRows: 1,
  maxItemCols: 50,
  maxItemRows: 50,
  minItemCols: 1,
  minItemRows: 1,
  minItemArea: 1,
  maxItemArea: 2500,
  margin: 10,
  outerMargin: true,
  outerMarginTop: null,
  outerMarginRight: null,
  outerMarginBottom: null,
  outerMarginLeft: null,
  useTransformPositioning: true,
  scrollSensitivity: 10,
  scrollSpeed: 20,
  initCallback: undefined,
  destroyCallback: undefined,
  gridSizeChangedCallback: undefined,
  itemChangeCallback: undefined,
  itemResizeCallback: undefined,
  itemInitCallback: undefined,
  itemRemovedCallback: undefined,
  itemValidateCallback: undefined,
  enableEmptyCellClick: false,
  enableEmptyCellContextMenu: false,
  enableEmptyCellDrop: false,
  enableEmptyCellDrag: false,
  enableOccupiedCellDrop: false,
  emptyCellClickCallback: undefined,
  emptyCellContextMenuCallback: undefined,
  emptyCellDropCallback: undefined,
  emptyCellDragCallback: undefined,
  emptyCellDragMaxCols: 50,
  emptyCellDragMaxRows: 50,
  ignoreMarginInRow: false,
  draggable: {
    delayStart: 0,
    enabled: false,
    ignoreContentClass: 'gridster-item-content',
    ignoreContent: false,
    dragHandleClass: 'drag-handler',
    stop: undefined,
    start: undefined,
    dropOverItems: false,
    dropOverItemsCallback: undefined,
    dropOverItemSplit: false,
    dropOverItemStack: false
  },
  resizable: {
    delayStart: 0,
    enabled: false,
    handles: {
      s: true,
      e: true,
      n: true,
      w: true,
      se: true,
      ne: true,
      sw: true,
      nw: true
    },
    stop: undefined,
    start: undefined
  },
  swap: true,
  swapWhileDragging: false,
  pushItems: false,
  disablePushOnDrag: false,
  disablePushOnResize: false,
  pushDirections: {
    north: true,
    east: true,
    south: true,
    west: true
  },
  pushResizeItems: false,
  displayGrid: DisplayGrid.OnDragAndResize,
  disableWindowResize: false,
  disableWarnings: false,
  scrollToNewItems: false,
  disableScrollHorizontal: false,
  disableScrollVertical: false,
  disableAutoPositionOnConflict: false
};

export { CompactType$1 as CompactType, DisplayGrid$1 as DisplayGrid, GridType$1 as GridType, Gridster, GridsterComponentInterface, GridsterConfigService$1 as GridsterConfigService, GridsterItem, GridsterItemComponentInterface };
//# sourceMappingURL=index.modern.js.map
