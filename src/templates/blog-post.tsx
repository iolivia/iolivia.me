import * as React from 'react'
import * as styles from './blog-post.module.scss'

import Img from 'gatsby-image'
import Page from '../components/Page';
import { graphql } from 'gatsby'

interface BlogPostTemplateProps {
  data: {
    site: Site
    markdownRemark: MarkdownRemark
  }
}

class BlogPostTemplate extends React.Component<BlogPostTemplateProps> {
  render() {
    const post = this.props.data.markdownRemark;

    return (
      <Page>

        <div className={styles.contentContainer}>
          <div className={styles.postContainer}>

            {/* Featured image */}
            <div className={styles.postImage}>
              <Img sizes={post.frontmatter.featuredImage.childImageSharp.sizes} />
            </div>

            {/* Title */}
            <div className={styles.postTitle}>
              <h1>{post.frontmatter.title}</h1>
            </div>

            {/* Content */}
            <div className={styles.postContent}>
              <div dangerouslySetInnerHTML={{ __html: post.html }} />
            </div>

          </div>

          <div className={styles.sidebar} />
        </div>

      </Page>
    );
  }
}
export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        featuredImage {
          childImageSharp{
            sizes(maxWidth: 700, maxHeight: 300) {
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
    }
  }
`