import * as React from 'react'
import * as styles from './index.module.scss'

import Page from '../components/Page';
import PostPreview from '../components/PostPreview';
import SEO from '../components/SEO';
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
            date: string,
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
          title
          description
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
                sizes(maxWidth: 230, maxHeight: 230) {
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
    const posts: any[] = this.props.data.allMarkdownRemark.edges;
    const siteMetadata = this.props.data.site.siteMetadata;

    return (

      <Page>

        <SEO 
          title={siteMetadata.title}
          description={siteMetadata.description}
        />

        <ul className={styles.postList}>
          {this.buildPostList(posts)}
        </ul>

      </Page>
    )
  }

  private buildPostList = (posts: any[]) => {
    const postElements = [];

    for (const item of posts) {
      const post = item.node;

      postElements.push((
        <PostPreview
          imageSizes={post.frontmatter.featuredImage.childImageSharp.sizes}
          title={post.frontmatter.title}
          excerpt={post.excerpt}
          url={post.fields.slug}
          date={post.frontmatter.date}
        />
      ));
    }

    return postElements;
  }
}