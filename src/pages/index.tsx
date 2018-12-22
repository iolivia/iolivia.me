import * as React from 'react'
import styled from "styled-components"
import { graphql } from 'gatsby'

import PostPreview from '../components/PostPreview';
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

const SectionHeading = styled.h1`
  color: #f7484e;
`;

const SectionContainer = styled.div`
  padding-top: 35px;
`;

const Section = props => (
  <SectionContainer id={props.id}>
    <SectionHeading>{props.heading}</SectionHeading>
    {props.children}
  </SectionContainer>
);

export default class IndexPage extends React.Component<IndexPageProps, {}> {

  public render() {
    const posts: any[] = this.props.data.allMarkdownRemark.edges;
    const siteMetadata = this.props.data.site.siteMetadata;

    return (
      <Layout>

        <Section id="about" heading="About">

          <p>

            Hi, I'm Olivia! I'm currently a Senior Software Engineer at&nbsp;
          <a href="daisie.com">
              Daisie
          </a>
            &nbsp;where I am designing and building the next generation of backend services for
            our upcoming launch. Before this
            I was helping ship Amazon Video to a bunch of TVs and set-top boxes, and even
            before that I was building services for Office 365 at Microsoft. And even befooooore
            that I was building games for kids at Xbox.
          </p>
          <p>
            I love technology and I love creating software that lasts. I occasionaly speak at events
            and run workshops.
          </p>
        </Section>

        <Section id="blog" heading="Blog">

          <ul>
            {this.buildPostList(posts)}
          </ul>

        </Section>

        <Section id="contact" heading="Contact">

          If you'd like to reach out, please do so at&nbsp;
        <strong>
            <a href="mailto:olivia_github@outlook.com">
              olivia_github@outlook.com
          </a>
          </strong>
          .
        </Section>

      </Layout>
    );
  }

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