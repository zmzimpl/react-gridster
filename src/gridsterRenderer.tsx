import {GridsterComponentInterface} from './gridster.interface';
import { DirTypes, GridType } from './gridsterConfig.interface';
import { GridsterItem } from './gridsterItem.interface';
import { Renderer } from './utils/renderer';

export class GridsterRenderer {

  constructor(private gridster: GridsterComponentInterface) {
  }

  destroy(): void {
    Reflect.deleteProperty(this, 'gridster');
  }

  updateItem(el: any, item: GridsterItem, renderer: Renderer) {
    if (this.gridster.mobile) {
      console.log(this.gridster.$options)
      this.clearCellPosition(renderer, el);
      if (this.gridster.$options.keepFixedHeightInMobile) {
        renderer.setStyle(el, 'height', (item.rows * this.gridster.$options.fixedRowHeight) + 'px');
      } else {
        renderer.setStyle(el, 'height', (item.rows * this.gridster.curWidth / item.cols) + 'px');
      }
      if (this.gridster.$options.keepFixedWidthInMobile) {
        renderer.setStyle(el, 'width', this.gridster.$options.fixedColWidth + 'px');
      } else {
        renderer.setStyle(el, 'width', '');
      }

      renderer.setStyle(el, 'margin-bottom', this.gridster.$options.margin + 'px');
      renderer.setStyle(el, DirTypes.LTR ? 'margin-right' : 'margin-left', '');
    } else {
      const x = Math.round(this.gridster.curColWidth * item.x);
      const y = Math.round(this.gridster.curRowHeight * item.y);
      const width = this.gridster.curColWidth * item.cols - this.gridster.$options.margin;
      const height = (this.gridster.curRowHeight * item.rows - this.gridster.$options.margin);
      // set the cell style
      this.setCellPosition(renderer, el, x, y);
      renderer.setStyle(el, 'width', width + 'px');
      renderer.setStyle(el, 'height', height + 'px');
      let marginBottom: string | null = null;
      let marginRight: string | null = null;
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
      renderer.setStyle(el, DirTypes.LTR ? 'margin-right' : 'margin-left', marginRight);
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
      this.gridster.curColWidth = this.gridster.$options.fixedColWidth +
        (this.gridster.$options.ignoreMarginInRow ? 0 : this.gridster.$options.margin);
      this.gridster.curRowHeight = this.gridster.$options.fixedRowHeight +
        (this.gridster.$options.ignoreMarginInRow ? 0 : this.gridster.$options.margin);
      addClass = GridType.Fixed;
      removeClass1 = GridType.Fit;
      removeClass2 = GridType.ScrollVertical;
      removeClass3 = GridType.ScrollHorizontal;
    } else if (this.gridster.$options.gridType === GridType.VerticalFixed) {
      this.gridster.curRowHeight = this.gridster.$options.fixedRowHeight +
        (this.gridster.$options.ignoreMarginInRow ? 0 : this.gridster.$options.margin);
      addClass = GridType.ScrollVertical;
      removeClass1 = GridType.Fit;
      removeClass2 = GridType.ScrollHorizontal;
      removeClass3 = GridType.Fixed;
    } else if (this.gridster.$options.gridType === GridType.HorizontalFixed) {
      this.gridster.curColWidth = this.gridster.$options.fixedColWidth +
        (this.gridster.$options.ignoreMarginInRow ? 0 : this.gridster.$options.margin);
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

  getGridColumnStyle(i: number) {
    return {
      ...this.getLeftPosition(this.gridster.curColWidth * i),
      width: this.gridster.curColWidth - this.gridster.$options.margin + 'px',
      height: this.gridster.gridRows.length * this.gridster.curRowHeight - this.gridster.$options.margin + 'px'
    };
  }

  getGridRowStyle(i: number) {
    return {
      ...this.getTopPosition(this.gridster.curRowHeight * i),
      width: this.gridster.gridColumns.length * this.gridster.curColWidth - this.gridster.$options.margin + 'px',
      height: this.gridster.curRowHeight - this.gridster.$options.margin + 'px'
    };
  }

  getLeftPosition(d: number): Object {
    if (this.gridster.$options.useTransformPositioning) {
      return {
        transform: 'translateX(' + d + 'px)',
      };
    } else {
      return {
        left: (this.getLeftMargin() + d) + 'px'
      };
    }
  }

  getTopPosition(d: number): Object {
    if (this.gridster.$options.useTransformPositioning) {
      return {
        transform: 'translateY(' + d + 'px)',
      };
    } else {
      return {
        top: this.getTopMargin() + d + 'px'
      };
    }
  }

  clearCellPosition(renderer: Renderer, el: any): void {
    if (this.gridster.$options.useTransformPositioning) {
      renderer.setStyle(el, 'transform', '');
    } else {
      renderer.setStyle(el, 'top', '');
      renderer.setStyle(el, 'left', '');
    }
  }

  setCellPosition(renderer: Renderer, el: any, x: number, y: number): void {
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
        // 这里对左、上边缘位置限制处理，避免元素渲染到边缘以外去
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
          Object.assign(this.gridster.movingItem, { left, top });
        }
      }
    }
  }

  getLeftMargin(): number {
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

  getTopMargin(): number {
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
