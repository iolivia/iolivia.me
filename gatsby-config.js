module.exports = {
    siteMetadata: {
      fullName: 'olivia ifrim',
      title: ``,
      tagline: ``,
      footerLinks: [
      ],
      socialLinks: [
        ["linkedin", "https://www.linkedin.com/in/oliviaifrim/"],
        ["github", "https://github.com/iolivia"],
        ["quora", "https://www.quora.com/profile/Olivia-Ifrim"],
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