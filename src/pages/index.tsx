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

        {/* Header */}
        <div className={styles.header}>

          <div className={`${styles.headerInner} ${styles.innerContainer}`}>

            {/* Navigation */}
            <div className={styles.headerNavigation}>

              {/* Logo */}
              <a className={styles.headerNavigationLogo} href="/">
                john snow
              </a>

              {/* Nav menu */}
              <nav className={styles.headerNavigationMenu}>
                <a href="/">menu1</a>
                <a href="/">menu2</a>
                <a href="/">menu3</a>
              </nav>
            </div>

            {/* Banner */}
            <div className={styles.banner}>

              {/* Graphic */}
              <div className={styles.bannerGraphic}>
              </div>

              {/* Title */}
              <div className={styles.bannerTitle}>
                <h1>
                  Hello! This is the title.
                </h1>
              </div>

              {/* Tagline */}
              <div className={styles.bannerTagline}>
                <h3>
                  This is a slightly smaller piece of text, the tagline. Make me interesting.
                </h3>
              </div>

            </div>
          </div>

        </div>

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
        <footer className={styles.footer}>

          <div className={`${styles.footerInner} ${styles.innerContainer}`}>

            <div className={styles.footerCopyright}>
              Copyright 2018
            </div>

            <div className={styles.footerLinks}>
              <a href="/">footerMenu1</a>
              <a href="/">footerMenu2</a>
            </div>

          </div>
          
        </footer>

      </div>
    )
  }
}