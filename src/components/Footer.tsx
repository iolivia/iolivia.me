import * as React from 'react'
import * as styles from './Footer.module.scss'

import { StaticQuery, graphql } from 'gatsby';

const buildSocialLinks = (linksData) => {
    const footerSocialLinks = new Map(linksData);
    const links = [];

    for (const key of footerSocialLinks.keys()) {

        const href = footerSocialLinks.get(key);

        links.push((
            <li className={styles.footerSocialIconsItem}>
                <a href={href} title={key} target="_blank">
                    <i className={`fab fa-${key} fa-lg`} />
                </a>
            </li>
        ));
    }

    return links;
}

export default () => (
    <StaticQuery
        query={graphql`
        query FooterQuery {
          site {
            siteMetadata {
              socialLinks
            }
          }
        }
      `}
        render={data => (
            <footer className={`${styles.footerContainer} ${styles.pattern}`}>
                <div className={styles.innerContainer}>

                    <div className={styles.separatorBottomLight} />

                    <div className={`${styles.footerInnerContainer} ${styles.innerContainer}`}>

                        {/* Copyright */}
                        <div className={styles.footerCopyrightSection}>
                            {"Copyright 2018"}
                        </div>

                        {/* Social links */}
                        <ul className={styles.footerSocialIconsSection}>
                            {buildSocialLinks(data.site.siteMetadata.socialLinks)}
                        </ul>
                    </div>
                </div>

            </footer>
        )}
    />
)