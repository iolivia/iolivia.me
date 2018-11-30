import * as React from 'react'
import * as styles from './blog-post.module.scss'

import { DiscussionEmbed } from "disqus-react";

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

    const siteMetadata = this.props.data.site.siteMetadata;
    const author = siteMetadata.fullName;
    
    const disqusShortname = siteMetadata.settings.disqusShortName;
    const disqusConfig = {
      identifier: post.id,
      title: post.frontmatter.title,
    };

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
              <div className={styles.separatorTop} />
              <h1>{post.frontmatter.title}</h1>
              <div className={styles.separatorBottom} />
            </div>

            {/* Metadata */}
            <div className={styles.postMetadata}>

              {/* author and date */}
              <div className={styles.author}>
                by <a href="/">{author}</a> on {post.frontmatter.date}
              </div>

              {/* tags */}
              <div className={styles.tags}>
                <ul className={styles.tagsList}>
                  {
                    post.frontmatter.tags.map((tag, index) => {
                      return (
                        <li key={ index }>
                          &nbsp;{" •"}&nbsp;
                          {tag}
                        </li>);
                    })
                  }
                </ul>
              </div>

            </div>
            <div className={styles.separatorBottom} />


            {/* Content */}
            <div className={styles.postContent}>
              <div dangerouslySetInnerHTML={{ __html: post.html }} />
            </div>

            {/* Disqus comments */}
            <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
          </div>
        </div>

      </Page>
    );
  }
}
export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        fullName
        settings {
          disqusShortName
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        tags
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