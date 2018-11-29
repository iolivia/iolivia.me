import * as React from 'react'
import * as styles from './index.module.scss'

import { HeaderProps } from '../components/Header';
import Page from '../components/Page';
import PostPreview from '../components/PostPreview';
import { graphql } from 'gatsby'

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
        footerLinks
        socialLinks
        settings {
          animationsEnabled
        }
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
                sizes(maxWidth: 320, maxHeight: 200) {
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

    // site metadata
    const { logo, title, tagline, footerLinks, socialLinks, settings } = this.props.data.site.siteMetadata;
    const headerProps: HeaderProps = {
      logoTitle: logo,
      headerTitle: title,
      headerTagline: tagline,
      animationsEnabled: settings.animationsEnabled
    };
    const footerProps: FooterProps = {
      footerText: "Copyright 2018",
      footerMenuOptions: new Map(footerLinks),
      footerSocialLinks: new Map(socialLinks),
    };

    const posts: any[] = this.props.data.allMarkdownRemark.edges;

    return (

      <Page headerProps={headerProps} footerProps={footerProps}>

        <div>
          <ul className={styles.postList}>
            {this.buildPostList(posts)}
          </ul>
        </div>

      </Page>
    )
  }

  private buildPostList = (posts: any[]) => {
    const postElements = [];

    console.log(posts);

    for (const item of posts) {
      const post = item.node;

      postElements.push((
        <PostPreview
          imageSizes={post.frontmatter.featuredImage.childImageSharp.sizes}
          title={post.frontmatter.title}
          excerpt={post.excerpt}
          url={post.fields.slug}
        />
      ));
    }

    return postElements;
  }
}