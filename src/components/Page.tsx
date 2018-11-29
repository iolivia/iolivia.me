import * as React from 'react'
import * as styles from './Page.module.scss'

import Footer, { FooterProps } from './Footer';
import Header, { HeaderProps } from './Header';

interface PageProps {
    // Props
    headerProps: HeaderProps;
    footerProps: FooterProps;
}

export default class Page extends React.Component<PageProps, {}> {

    public render() {

        const { headerProps, footerProps, children } = this.props;

        return (
            <div className={styles.container}>

            {/* Header */}
            <Header {...headerProps} />
    
            {/* Main content */}
            <div className={styles.mainContent}>
              <div className={`${styles.mainContentInner} ${styles.innerContainer}`}>
    
                {children}
                
              </div>
            </div>
    
            {/* Footer */}
            <Footer {...footerProps} />
    
          </div>
        );
    }
}