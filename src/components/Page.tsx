import * as React from 'react'
import * as styles from './Page.module.scss'

import Footer from './Footer';
import Header from './Header';

export default class Page extends React.Component<{}, {}> {

    public render() {

        return (
            <div className={styles.container}>

            {/* Header */}
            <Header isMinimal={true} />
    
            {/* Main content */}
            <div className={styles.mainContent}>
              <div className={`${styles.mainContentInner} ${styles.innerContainer}`}>
    
                {this.props.children}
                
              </div>
            </div>
    
            {/* Footer */}
            <Footer />
    
          </div>
        );
    }
}