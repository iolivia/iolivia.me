import * as React from 'react'

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
            <div>
                {post.html}
            </div>
        );
    }
}
export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`