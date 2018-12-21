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

            <header className={`${styles.headerContainer} ${styles.pattern}`}>
                <div className={styles.innerContainer}>

                    {/* Navigation */}
                    <div className={styles.headerNavigation}>

                        {/* Logo */}
                        <a className={styles.headerLogo} href="/">
                            <h1>
                                {data.site.siteMetadata.fullName}
                            </h1>
                        </a>

                        <div className={styles.headerNav}>
                            <nav>
                                <li> item 1 </li>
                                <li> item 2 </li>
                                <li> item 3 </li>
                            </nav>
                        </div>

                        <div className={styles.separatorBottomLight} />

                    </div>
                    <div className={styles.separatorBottomLight} />

                </div>
            </header>
        )}
    />
)