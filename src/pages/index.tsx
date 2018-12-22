import * as React from 'react'
import styled from "styled-components"

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

const NavBar = styled.nav`
  display: block;
  width: 100%;
  height: 6.5rem;
  background: #fff;
  z-index: 99;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
`;

const NavBarLink = styled.a`
  text-transform: uppercase;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: .2rem;
  margin-right: 35px;
  text-decoration: none;
  line-height: 6.5rem;
  color: #222;

  :hover {
    color: #f7484e; 
  }
`;

const NavBarItem = styled.li`
  position: relative;
  float: left;
  margin-bottom: 0; 
`

const NavBarItems = styled.ul`
  list-style: none;
  margin-bottom: 0; 
  float: right;
`

const MainContent = styled.div`
padding-top: 100px;
`;

const SectionHeading = styled.h1`
  color: #f7484e;
`;

const SectionContainer = styled.div`
  padding-top: 10px;
  margin-bottom: 25px;
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

        <NavBar className="fixed">
          <div className="container">

            <NavBarLink href="#">olivia ifrim</NavBarLink>

            <NavBarItems>
              <NavBarItem><NavBarLink href="#about">about</NavBarLink></NavBarItem>
              <NavBarItem><NavBarLink href="#blog">blog</NavBarLink></NavBarItem>
              <NavBarItem><NavBarLink href="#contact">contact</NavBarLink></NavBarItem>
            </NavBarItems>
          </div>
        </NavBar>

        <MainContent>

        <Section id="about" heading="About">

        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer 
        took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        
        </Section>

        <Section id="blog" heading="Blog">

        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        
        </Section>

        <Section id="contact" heading="Contact">

        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

        </Section>
        </MainContent>

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