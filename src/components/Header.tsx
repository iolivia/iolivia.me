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
                        <div className={styles.separatorBottomLight} />

                        {/* Header info */}
                        <div className={styles.headerInfo} >

                            {/* Title */}
                            {/* <h4> {data.site.siteMetadata.title} </h4> */}

                            {/* Tagline */}
                            {/* <p> {data.site.siteMetadata.tagline}  </p> */}

                            {/* Email */}
                            {/* <a href={`mailto:${data.site.siteMetadata.email}`}>
                                <p>
                                    {data.site.siteMetadata.email}
                                </p>
                            </a> */}

                        </div>

                    </div>

                </div>
            </header>
        )}
    />
)