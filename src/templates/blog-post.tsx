import * as React from 'react'
import styled from "styled-components"

import { DiscussionEmbed } from "disqus-react";
import Img from 'gatsby-image'
import SEO from '../components/SEO';
import { graphql } from 'gatsby'
import Layout from '../components/Layout';

interface BlogPostTemplateProps {
  data: {
    site: Site
    markdownRemark: MarkdownRemark
  }
}

const Center = styled.div`
text-align: center;
`

const Title = styled.h1`
  padding: 20px 30px 0 30px;
`;

const Date = styled.div`
padding-bottom: 80px;
`;

const Tags = styled.ul`
`;

const Tag = styled.li`
  display: inline-block;
  position: relative;
  margin-bottom: 0;
  margin-right: 15px;
  color: white;
  background-color: #f7484e;
  padding: 2px 5px;
  font-size: 0.8em;
`

const PostContent = styled.div`
  width: 700px;
  max-width: 100%;
  margin: 0 auto;

  ul {
    list-style-type: square;
    padding-left: 20px;
  }
`;

class BlogPostTemplate extends React.Component<BlogPostTemplateProps> {
  render() {
    const post = this.props.data.markdownRemark;

    const siteMetadata = this.props.data.site.siteMetadata;

    const disqusShortname = siteMetadata.settings.disqusShortName;
    const disqusConfig = {
      identifier: post.id,
      title: post.frontmatter.title,
    };

    const imageSizes = post.frontmatter.featuredImage.childImageSharp.sizes;

    return (
      <Layout>

        <SEO
          title={post.frontmatter.title || siteMetadata.title}
          description={post.excerpt || siteMetadata.description}
          siteUrl={siteMetadata.siteUrl}
          twitterHandle={siteMetadata.twitterHandle}
          imageSizes={imageSizes}
        />

        <PostContent>

          <Center>

            <Img sizes={imageSizes} />

            <Title>{post.frontmatter.title}</Title>

            <Tags>
              {
                post.frontmatter.tags.map((tag, index) => {
                  return (
                    <Tag key={index}>{tag}</Tag>);
                })
              }
            </Tags>

            <Date>{post.frontmatter.date}</Date>

          </Center>

          <div dangerouslySetInnerHTML={{ __html: post.html }} />

          <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
        </PostContent>

      </Layout>
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
        twitterHandle
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