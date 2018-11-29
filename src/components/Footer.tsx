import * as React from 'react'
import * as styles from './Footer.module.scss'

import { StaticQuery, graphql } from 'gatsby';

const buildFooterLinks = (linksData) => {
    const footerMenuOptions = new Map(linksData);
    const links = [];

    for (const key of footerMenuOptions.keys()) {
        links.push(<a key={key} href={footerMenuOptions.get(key)}>{key}</a>);
    }

    return links;
}

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
              footerLinks
              socialLinks
            }
          }
        }
      `}
        render={data => (
            <footer className={`${styles.footer} ${styles.pattern}`}>

                <div className={`${styles.footerInner} ${styles.innerContainer}`}>

                    <div className={styles.footerSeparator} />

                    {/* Social links */}
                    <ul className={styles.footerSocialIcons}>
                        {buildSocialLinks(data.site.siteMetadata.socialLinks)}
                    </ul>

                    {/* Copyright */}
                    <div className={styles.footerCopyright}>
                        {"Copyright 2018/9"}
                    </div>

                    {/* Footer links */}
                    <div className={styles.footerLinks}>
                        {buildFooterLinks(data.site.siteMetadata.footerLinks)}
                    </div>
                </div>

            </footer>
        )}
    />
)