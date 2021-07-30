import {GridsterComponentInterface} from './gridster.interface';
import {GridsterItem} from './gridsterItem.interface';

export class GridsterEmptyCell {
  initialItem!: GridsterItem | null;
  emptyCellClick!: (() => void) | null;
  emptyCellClickTouch!: (() => void) | null;
  emptyCellContextMenu!: (() => void) | null;
  emptyCellDrop!: (() => void) | null;
  emptyCellDrag!: (() => void) | null;
  emptyCellDragTouch!: (() => void) | null;
  emptyCellMMove!: () => void;
  emptyCellMMoveTouch!: () => void;
  emptyCellUp!: () => void;
  emptyCellUpTouch!: () => void;
  emptyCellMove!: (() => void) | null;
  emptyCellExit!: (() => void) | null;

  constructor(private gridster: GridsterComponentInterface) {
    console.log(this.gridster);
  }


  updateOptions(): void {

  }

}
