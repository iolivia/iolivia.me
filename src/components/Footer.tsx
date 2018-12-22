import * as React from 'react'

import { StaticQuery, graphql } from 'gatsby';

const buildSocialLinks = (linksData) => {
    const footerSocialLinks = new Map(linksData);
    const links = [];

    for (const key of footerSocialLinks.keys()) {

        const href = footerSocialLinks.get(key);

        links.push((
            <li>
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
            <footer>
                <div>

                    {/* Copyright */}
                    <div>
                        {"Copyright 2018"}
                    </div>

                    {/* Social links */}
                    <ul>
                        {buildSocialLinks(data.site.siteMetadata.socialLinks)}
                    </ul>
                </div>

            </footer>
        )}
    />
)