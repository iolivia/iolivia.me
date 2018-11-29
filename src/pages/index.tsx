import * as React from 'react'
import * as styles from './index.module.scss'

import Footer from '../components/Footer';
import Header from './../components/Header';
import { graphql } from 'gatsby'

interface IndexPageProps {
  data: {
    site: {
      siteMetadata: {
        logo: string,
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
        logo
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

    const { logo, title, tagline } = this.props.data.site.siteMetadata;
    const edges: any[] = this.props.data.allMarkdownRemark.edges;
    const posts = edges.concat(edges).concat(edges);

    return (
      <div className={styles.container}>

        {/* Header */}
        <Header logoTitle={logo} headerTagline={tagline} headerTitle={title} />

        {/* Main content */}
        <div className={styles.mainContent}>
          <div className={`${styles.mainContentInner} ${styles.innerContainer}`}>

            <div className={styles.postList}>

              <ul>

                {Array.from(Array(10).keys()).map((x, i) =>

                <li key={i}>

                  <a className={styles.post} href="/">

                    <img src="https://via.placeholder.com/320x200" />

                    <h2>
                      This is the title
                    </h2>

                    <p>
                      This is an excerpt of the post you are about to read. You just need to click it to read the whole thing.
                    </p>
                  </a>

                </li>
                )}


              </ul>

            </div>


          </div>
        </div>

        {/* Footer */}
        <Footer 
          footerText="Copyright 2018"
          footerMenuOptions={
            new Map([
              ["option1", "/link"],
              ["option2", "/link"],
              ["option3", "/link"],
            ])
          }
        />

      </div>
    )
  }
}