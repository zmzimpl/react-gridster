import { GridsterItem } from './gridsterItem.interface';
import { GridsterComponentInterface } from './gridster.interface';
export declare abstract class GridsterItemComponentInterface {
    item: GridsterItem;
    $item: GridsterItem;
    top: number;
    left: number;
    width: number;
    height: number;
    notPlaced: boolean;
    updateOptions: () => void;
    itemChanged: () => void;
    setSize: () => void;
    checkItemChanges: (newValue: GridsterItem, oldValue: GridsterItem) => void;
    canBeDragged: () => boolean;
    canBeResized: () => boolean;
    el: any;
    gridster: GridsterComponentInterface;
}
