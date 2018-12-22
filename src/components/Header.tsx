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

            <header>

                {/* Logo */}
                <h1>
                    {data.site.siteMetadata.fullName}
                </h1>

                {/* Navigation */}
                <nav>
                    <li> item 1 </li>
                    <li> item 2 </li>
                    <li> item 3 </li>
                </nav>

            </header>
        )}
    />
)