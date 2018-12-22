import * as React from 'react'

import Page from '../components/Page';
import PostPreview from '../components/PostPreview';
import SEO from '../components/SEO';
import { graphql } from 'gatsby'

import * as styles from "./../styles.scss";
import Layout from '../components/Layout';

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
      <Layout>

        <div className="container">

          <div className="row">
            <div className="one column">One</div>
            <div className="eleven columns">Eleven</div>
          </div>

          <div className="row">
            <div className="two columns">Two</div>
            <div className="ten columns">Ten</div>
          </div>

          <div className="row">
            <div className="one-third column">1/3</div>
            <div className="two-thirds column">2/3</div>
          </div>
          <div className="row">
            <div className="one-half column">1/2</div>
            <div className="one-half column">1/2</div>
          </div>

          <h1>Heading</h1>
          <h2>Heading</h2>
          <h3>Heading</h3>
          <h4>Heading</h4>
          <h5>Heading</h5>
          <h6>Heading</h6>

          <p>The base type is 15px over 1.6 line height (24px)</p>

          <strong>Bolded</strong>
          <em>Italicized</em>
          <a>Colored</a>
          <u>Underlined</u>

        </div>
      </Layout>
    );
  }


  // return (

  //   <div className="container">
  //     <Page >

  //       <SEO
  //         title={siteMetadata.title}
  //         description={siteMetadata.description}
  //       />

  //       <ul>
  //         {this.buildPostList(posts)}
  //       </ul>

  //     </Page>
  //   </div>
  // )
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