import * as React from 'react'
import * as styles from './Banner.module.scss'

import Footer from './Footer';
import Header from './Header';

export default class Banner extends React.Component<{}, {}> {

    public render() {

        return (
          <div className={`${styles.bannerContainer} ${styles.pattern}`}>

            {/* Header */}
            <Header />
    
            {/* Footer */}
            <Footer />
    
          </div>
        );
    }
}