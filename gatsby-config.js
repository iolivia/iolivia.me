module.exports = {
    siteMetadata: {
      logo: 'john snow',
      title: `Hi! I'm John and this is my website.`,
      tagline: `I am a Typescript guru and I love my static websites.`,
      footerLinks: [
        ["option2", "/link"],
        ["option4", "/link"],
        ["option3", "/link"],
      ],
      socialLinks: [
        ["facebook", "/link"],
        ["github", "/link"],
        ["quora", "/link"],
      ],
      settings: {
        animationsEnabled: false
      }
    },
    plugins: [
      `gatsby-plugin-sass`,
      `gatsby-plugin-typescript`,
      `gatsby-plugin-tslint`,
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: `${__dirname}/src/pages`,
          name: "markdown-pages",
        },
      },
      `gatsby-transformer-remark`,
      `gatsby-transformer-sharp`,
      `gatsby-plugin-sharp`,
    ],
  }