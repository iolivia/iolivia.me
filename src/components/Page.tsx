import * as React from 'react'
import * as styles from './Page.module.scss'

import Banner from './Banner';

export default class Page extends React.Component<{}, {}> {

    public render() {

        return (
          <div className={styles.pageContainer}>

            {/* Banner */}
            <Banner />
    
            {/* Main content */}
            <div className={`${styles.pageInnerContainer}`}>
                {this.props.children}
            </div>
    
          </div>
        );
    }
}