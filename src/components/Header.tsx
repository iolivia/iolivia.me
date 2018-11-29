import * as React from 'react'
import * as styles from './Header.module.scss'

import { StaticQuery, graphql } from 'gatsby';

import { Random } from 'react-animated-text';

export default (isMinimal: boolean) => (
    <StaticQuery
        query={graphql`
        query HeadingQuery {
          site {
            siteMetadata {
                logo
                title
                tagline
                settings {
                    animationsEnabled
                }
            }
          }
        }
      `}
        render={data => (

            <header>
                <div className={`${styles.header} ${styles.pattern}`}>

                    <div className={`${styles.headerInner} ${styles.innerContainer}`}>

                        {/* Navigation */}
                        <div className={styles.headerNavigation}>

                            {/* Logo */}
                            <a className={styles.headerNavigationLogo} href="/">
                                {data.site.siteMetadata.logo}
                            </a>

                            {/* Nav menu */}
                            <nav className={styles.headerNavigationMenu}>
                                <a href="/">menu1</a>
                                <a href="/">menu2</a>
                                <a href="/">menu3</a>
                            </nav>
                        </div>


                        {/* Banner */}
                        {!isMinimal &&
                        <div className={styles.banner}>

                            {/* Graphic */}
                            <div className={styles.bannerGraphic}>
                            </div>

                            {/* Title */}
                            <div className={styles.bannerTitle}>
                                <h1>
                                    {data.site.siteMetadata.settings.animationsEnabled
                                        ?
                                        <Random
                                            text={data.site.siteMetadata.title}
                                            iterations={1}
                                            effect="fadeIn"
                                            effectChange={2}
                                            effectDirection="up"
                                        />
                                        : data.site.siteMetadata.title
                                    }
                                </h1>
                            </div>

                            {/* Tagline */}
                            <div className={styles.bannerTagline}>
                                <h3>
                                    {data.site.siteMetadata.settings.animationsEnabled
                                        ?
                                        <Random
                                            text={data.site.siteMetadata.tagline}
                                            iterations={1}
                                            effect="fadeIn"
                                            effectChange={2}
                                            effectDirection="up"
                                        />
                                        : data.site.siteMetadata.tagline
                                    }
                                </h3>
                            </div>

                        </div>
                        }
                    </div>

                </div>
            </header>
        )}
    />
)