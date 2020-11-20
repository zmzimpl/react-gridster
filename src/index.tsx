import * as React from 'react'
import styles from './styles.module.css'

export type gridTypes = 'fit' | 'scrollVertical' | 'scrollHorizontal' | 'fixed' | 'verticalFixed' | 'horizontalFixed';

export interface GridsterConfig {
  gridType: gridTypes;
}

interface Props {
  options: GridsterConfig;
}

export class Gridster extends React.Component<Props> {

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className={styles.gridsterColumn}></div>
        <div className={styles.gridsterRow}></div>
      </div>
    )
  }
}

// export const Gridster = ({ options }: Props) => {
//   return <div className={styles.test}>
    
//   </div>
// }
