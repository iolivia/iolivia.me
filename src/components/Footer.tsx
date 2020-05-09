import * as React from 'react'
import styled from "styled-components"

import { StaticQuery, graphql } from 'gatsby';

const buildSocialLinks = (linksData) => {
    const footerSocialLinks = new Map(linksData);
    const links = [];

    for (const key of footerSocialLinks.keys()) {

        const href = footerSocialLinks.get(key);

        links.push((
            <FooterItem>
                <a href={href} title={key} target="_blank">
                    <i className={`fab fa-${key} fa-lg`} />
                </a>
            </FooterItem>
        ));
    }

    return links;
}

const Footer = styled.footer`
display: block;
width: 100%;
height: 6.5rem;
background: #fff;
border-top: 1px solid #eee;
border-bottom: 1px solid #eee;
padding-top: 15px;
margin-top: 25px;
`;

const FooterItem = styled.li`
position: relative;
float: left;
margin-bottom: 0;
margin-right: 15px;
`

const FooterItems = styled.ul`
list-style: none;
margin-bottom: 0; 
float: right;
`

const Copyright = styled.div`
float: left;
`

const Views = styled.div`
float: left;
font-size: 13px;
`

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
            <Footer>
                <Copyright>
                    Made with ❤️ in 2018-2020
                    
                </Copyright>

                {/* Social links */}
                <FooterItems>
                    {buildSocialLinks(data.site.siteMetadata.socialLinks)}
                </FooterItems>

                <Views>
                    <i>
                        The views expressed on this website are entirely 
                        my own and not associated with any company past 
                        or present.
                    </i>
                </Views>

            </Footer>
        )}
    />
)