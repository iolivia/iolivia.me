import * as React from 'react'

import Page from '../components/Page';
import PostPreview from '../components/PostPreview';
import SEO from '../components/SEO';
import { graphql } from 'gatsby'

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

        <nav className="navbar fixed">
          <div className="container">

            <a className="navbar-link" href="#">olivia ifrim</a>

            <ul className="navbar-list u-pull-right">
              <li className="navbar-item"><a className="navbar-link" href="#about">about</a></li>
              <li className="navbar-item"><a className="navbar-link" href="#blog">blog</a></li>
              <li className="navbar-item"><a className="navbar-link" href="#contact">contact</a></li>
            </ul>
          </div>
        </nav>

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

        <a className="button" href="#">Anchor button</a>
        <button>Button element</button>
        <input type="submit" value="submit input" />
        <input type="button" value="button input" />

        <a className="button button-primary" href="#">Anchor button</a>
        <button className="button-primary">Button element</button>
        <input className="button-primary" type="submit" value="submit input" />
        <input className="button-primary" type="button" value="button input" />

        <ul>
          <li>Item 1</li>
          <li>
            Item 2
            <ul>
              <li>Item 2.1</li>
              <li>Item 2.2</li>
            </ul>
          </li>
          <li>Item 3</li>
        </ul>

        <table className="u-full-width">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Sex</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Dave Gamache</td>
              <td>26</td>
              <td>Male</td>
              <td>San Francisco</td>
            </tr>
            <tr>
              <td>Dwayne Johnson</td>
              <td>42</td>
              <td>Male</td>
              <td>Hayward</td>
            </tr>
          </tbody>
        </table>
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