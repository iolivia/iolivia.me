import * as React from 'react'
import * as styles from './Header.module.scss'

import { Random } from 'react-animated-text';

export interface HeaderProps {
    logoTitle: string,
    headerTitle: string,
    headerTagline: string,
    animationsEnabled: boolean
}

export default class Header extends React.Component<HeaderProps, {}> {

    public render() {

        const { logoTitle, headerTitle, headerTagline, animationsEnabled} = this.props;
        
        return (
            <div className={`${styles.header} ${styles.pattern}`}>

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
                            <h1>
                                {animationsEnabled
                                    ? 
                                    <Random
                                    text={headerTitle}
                                    iterations={1}
                                    effect="fadeIn"
                                    effectChange={2}
                                    effectDirection="up"
                                    />
                                    : headerTitle
                                }
                            </h1>
                        </div>

                        {/* Tagline */}
                        <div className={styles.bannerTagline}>
                            <h3>
                                {animationsEnabled
                                    ? 
                                    <Random
                                    text={headerTagline}
                                    iterations={1}
                                    effect="fadeIn"
                                    effectChange={2}
                                    effectDirection="up"
                                    />
                                    : headerTagline
                                }
                            </h3>
                        </div>

                    </div>
                </div>

            </div>
        );
    }
}