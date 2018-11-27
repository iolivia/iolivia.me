import * as React from 'react'
import * as styles from './index.module.scss'

import { Button } from '../components/Button';
import { graphql } from 'gatsby'

interface IndexPageProps {
  data: {
    site: {
      siteMetadata: {
        title: string,
        tagline: string,
      }
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
        title
        tagline
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

    const { title, tagline } = this.props.data.site.siteMetadata;
    const edges: any[] = this.props.data.allMarkdownRemark.edges;
    const posts = edges.concat(edges).concat(edges);

    return (
      <div className={styles.container}>

        <div className={styles.banner}>
          <div className={styles.title}>
            <h1>{title}</h1>
          </div>
          <div className={styles.tagline}>
            <span>{tagline}</span>
          </div>
        </div>

        <div className={styles.posts}>
          <ul>
            {posts.map(({ node }) => {

              const slug = node.fields.slug;
              const title = node.frontmatter.title;
              const date = node.frontmatter.date;
              const excerpt = node.excerpt;

              return (
                <div className={styles.post}>

                  {/* title */}
                  <div className={styles.postTitle}>
                    <a href={slug}>
                      <h2>{title}</h2>
                    </a>
                  </div>

                  {/* excerpt */}
                  <div className={styles.postExcerpt}>
                    <span>
                      {excerpt}
                    </span>
                  </div>

                  {/* metadata */}
                  <div className={styles.postMetadata}>
                    <span className={styles.postDate}>
                      {date}
                    </span>
                  </div>

                  {/* separator */}
                  <div className={styles.separator} />
                </div>
              )
            })}
          </ul>
        </div>

        <div className={styles.footer}>
          <span>Copyright 2018</span>
        </div>
      </div>
    )
  }
}