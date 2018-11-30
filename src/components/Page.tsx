import * as React from 'react'
import * as styles from './Page.module.scss'

import Banner from './Banner';

export default class Page extends React.Component<{}, {}> {

    public render() {

        return (
          <div className={styles.container}>

            {/* Banner */}
            <Banner />
    
            {/* Main content */}
            <div className={styles.mainContent}>
              <div className={`${styles.mainContentInner} ${styles.innerContainer}`}>
    
                <div className={styles.pageInner}>
                  {this.props.children}
                </div>
                
              </div>
            </div>
    
          </div>
        );
    }
}