import * as React from 'react'
import * as styles from './index.module.scss'

import Footer from '../components/Footer';
import Header from './../components/Header';
import Img from 'gatsby-image'
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
        settings: {
          animationsEnabled: boolean
        }
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
        settings {
          animationsEnabled
        }
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
            featuredImage {
              childImageSharp{
                sizes(maxWidth: 320, maxHeight: 200) {
                  ...GatsbyImageSharpSizes
                }
              }
          }
          }
        }
      }
    }
  }
`

export default class IndexPage extends React.Component<IndexPageProps, {}> {

  public render() {

    // site metadata
    const { logo, title, tagline, footerLinks, socialLinks, settings } = this.props.data.site.siteMetadata;

    const posts: any[] = this.props.data.allMarkdownRemark.edges;

    return (
      <div className={styles.container}>

        {/* Header */}
        <Header 
          logoTitle={logo} 
          headerTagline={tagline} 
          headerTitle={title} 
          animationsEnabled={settings.animationsEnabled}
        />

        {/* Main content */}
        <div className={styles.mainContent}>
          <div className={`${styles.mainContentInner} ${styles.innerContainer}`}>

            <div>

              <ul className={styles.postList}>
                {this.buildPostList(posts)}
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

  private buildPostList = (posts: any[]) => {
    const postElements = [];

    console.log(posts);
    
    for (const item of posts) {
      const post = item.node;
      
      postElements.push((
        <PostPreview 
          imageSizes={post.frontmatter.featuredImage.childImageSharp.sizes}
          title={post.frontmatter.title}
          excerpt={post.excerpt}
          url="/"
        />
      ));
    }

    return postElements;
}
}