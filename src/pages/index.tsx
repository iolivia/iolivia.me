import * as React from 'react'
import * as styles from './index.module.scss'

import Footer from '../components/Footer';
import Header from './../components/Header';
import PostPreview from '../components/PostPreview';
import { graphql } from 'gatsby'

interface IndexPageProps {
  data: {
    site: {
      siteMetadata: {
        logo: string,
        title: string,
        tagline: string,
        footerLinks: Map<string, string>,
        socialLinks: Map<string, string>,
      },
    },
    allMarkdownRemark: {
      edges: {
        node: {
          excerpt: string,
          frontmatter: {
            title: string
          }
        }
      }
    }
  }
}

export const indexPageQuery = graphql`
  query IndexPageQuery {
    site {
      siteMetadata {
        logo
        title
        tagline
        footerLinks
        socialLinks
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
          }
        }
      }
    }
  }
`

export default class IndexPage extends React.Component<IndexPageProps, {}> {

  public render() {

    // site metadata
    const { logo, title, tagline, footerLinks, socialLinks } = this.props.data.site.siteMetadata;

    const edges: any[] = this.props.data.allMarkdownRemark.edges;
    const posts = edges.concat(edges).concat(edges);

    return (
      <div className={styles.container}>

        {/* Header */}
        <Header logoTitle={logo} headerTagline={tagline} headerTitle={title} />

        {/* Main content */}
        <div className={styles.mainContent}>
          <div className={`${styles.mainContentInner} ${styles.innerContainer}`}>

            <div className={styles.postList}>

              <ul>

                {Array.from(Array(10).keys()).map((x, i) =>

                <li key={i}>

                  <PostPreview 
                    imageUrl="https://via.placeholder.com/320x200"
                    title="This is a short title"
                    excerpt="This is an excerpt of the post you are about to read. You just need to click it to read the wh"
                    url="/"
                  />

                </li>
                )}
              </ul>

            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer 
          footerText="Copyright 2018"
          footerMenuOptions={new Map(footerLinks)}
          footerSocialLinks={new Map(socialLinks)}
        />

      </div>
    )
  }
}