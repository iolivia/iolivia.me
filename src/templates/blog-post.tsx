import * as React from 'react'

import { DiscussionEmbed } from "disqus-react";
import Img from 'gatsby-image'
import Page from '../components/Page';
import SEO from '../components/SEO';
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

        <SEO
          title={post.frontmatter.title || siteMetadata.title}
          description={post.excerpt || siteMetadata.description}
        />

        <div>
          {/* Featured image */}
          <div>
            <Img sizes={post.frontmatter.featuredImage.childImageSharp.sizes} />
          </div>

          {/* Title */}
          <div>
            <h1>{post.frontmatter.title}</h1>
          </div>

          {/* Metadata */}
          <div>

            {/* author and date */}
            <div>
              by <a href="/">{author}</a> on {post.frontmatter.date}
            </div>

            {/* tags */}
            <div>
              <ul>
                {
                  post.frontmatter.tags.map((tag, index) => {
                    return (
                      <li key={index}>
                        &nbsp;{" •"}&nbsp;
                          {tag}
                      </li>);
                  })
                }
              </ul>
            </div>

          </div>

          {/* Content */}
          <div>
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
          </div>

          {/* Disqus comments */}
          <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
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
      excerpt
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