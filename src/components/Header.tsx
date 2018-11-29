import * as React from 'react'
import * as styles from './Header.module.scss'

interface HeaderProps {
    logoTitle: string,
    headerTitle: string,
    headerTagline: string,
}

export default class Header extends React.Component<HeaderProps, {}> {

    public render() {

        const { logoTitle, headerTitle, headerTagline} = this.props;
        
        return (
            <div className={styles.header}>

                <div className={`${styles.headerInner} ${styles.innerContainer}`}>

                    {/* Navigation */}
                    <div className={styles.headerNavigation}>

                        {/* Logo */}
                        <a className={styles.headerNavigationLogo} href="/">
                            {logoTitle}
                        </a>

                        {/* Nav menu */}
                        <nav className={styles.headerNavigationMenu}>
                            <a href="/">menu1</a>
                            <a href="/">menu2</a>
                            <a href="/">menu3</a>
                        </nav>
                    </div>

                    {/* Banner */}
                    <div className={styles.banner}>

                        {/* Graphic */}
                        <div className={styles.bannerGraphic}>
                        </div>

                        {/* Title */}
                        <div className={styles.bannerTitle}>
                            <h1>{headerTitle}</h1>
                        </div>

                        {/* Tagline */}
                        <div className={styles.bannerTagline}>
                            <h3>{headerTagline}</h3>
                        </div>

                    </div>
                </div>

            </div>
        );
    }
}