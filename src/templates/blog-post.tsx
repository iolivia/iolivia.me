import * as React from 'react'
import * as styles from './blog-post.module.scss'

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

            <div>
              <div dangerouslySetInnerHTML={{ __html: post.html }} />
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
      }
    }
  }
`