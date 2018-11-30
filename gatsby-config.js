module.exports = {
    siteMetadata: {
      fullName: 'olivia ifrim',
      title: ``,
      tagline: ``,
      footerLinks: [
        ["google.com", "https://www.google.com"],
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
      {
        resolve: `gatsby-transformer-remark`,
        options: {
          plugins: [
            {
              resolve: `gatsby-remark-prismjs`,
              options: {
                classPrefix: "language-",
            }
            }
          ]
          }
        },
      `gatsby-transformer-sharp`,
      `gatsby-plugin-sharp`
    ],
  }