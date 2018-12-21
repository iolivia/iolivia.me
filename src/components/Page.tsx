import * as React from 'react'
import * as styles from './Page.module.scss'

import Banner from './Banner';
import Header from './Header';
import Footer from './Footer';

export default class Page extends React.Component<{}, {}> {

    public render() {

        return (
            <div className={styles.pageContainer}>

                {/* Header */}
                <Header />

                {/* Main content */}
                <div className={`${styles.pageInnerContainer} ${styles.innerContainer}`}>
                    {this.props.children}
                </div>

                {/* Footer */}
                <Footer />
            </div>
        );
    }
}