import * as React from 'react'
import * as styles from './Header.module.scss'

import { StaticQuery, graphql } from 'gatsby';

import { Random } from 'react-animated-text';

export default () => (
    <StaticQuery
        query={graphql`
        query HeadingQuery {
          site {
            siteMetadata {
                fullName
                title
                tagline
                email
                settings {
                    animationsEnabled
                }
            }
          }
        }
      `}
        render={data => (

            <header className={styles.header}>
                    <div className={`${styles.headerInner} ${styles.innerContainer}`}>

                        {/* Navigation */}
                        <div className={styles.headerNavigation}>

                            {/* Logo */}
                            <a className={styles.headerNavigationLogo} href="/">
                                <h1>
                                {data.site.siteMetadata.settings.animationsEnabled
                                        ?
                                        <Random
                                            text={data.site.siteMetadata.fullName}
                                            iterations={1}
                                            effect="fadeIn"
                                            effectChange={2}
                                            effectDirection="up"
                                        />
                                        : data.site.siteMetadata.fullName
                                    }
                                </h1>
                            </a>

                            <div>
                            <div className={styles.separatorBottomLight} />
                                
                                <h4 className={styles.title}>
                                    {data.site.siteMetadata.title}
                                </h4>
                                <p>
                                    {data.site.siteMetadata.tagline}
                                </p>
                                <div className={styles.separatorBottomLight} />

                                <a href={`mailto:${data.site.siteMetadata.email}`}>
                                    <p>
                                        {data.site.siteMetadata.email}
                                    </p>
                                </a>
                                <div className={styles.separatorBottomLight} />

                            </div>
                            {/* Nav menu */}
                            {/* <nav className={styles.headerNavigationMenu}>
                                <a href="/">menu1</a>
                                <a href="/">menu2</a>
                                <a href="/">menu3</a>
                            </nav> */}
                        </div>

                    </div>
            </header>
        )}
    />
)