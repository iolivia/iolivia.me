module.exports = {
  siteMetadata: {
    fullName: 'olivia ifrim',
    title: `Software Engineer`,
    tagline: ``,
    email: `olivia_github@outlook.com`,
    socialLinks: [
      ["linkedin", "https://www.linkedin.com/in/oliviaifrim/"],
      ["github", "https://github.com/iolivia"],
      ["quora", "https://www.quora.com/profile/Olivia-Ifrim"],
    ],
    settings: {
      animationsEnabled: true,
      disqusShortName: "oliviaifrim"
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
          },
          {
            resolve: 'gatsby-remark-emojis',
            options: {
              // Deactivate the plugin globally (default: true)
              active: true,
              // Add a custom css class
              class: 'emoji-icon',
              // Select the size (available size: 16, 24, 32, 64)
              size: 64,
              // Add custom styles
              styles: {
                display: 'inline',
                margin: '0',
                'margin-top': '1px',
                position: 'relative',
                top: '5px',
                width: '25px'
              }
            }
          }
        ]
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-26280927-2",
        head: true,
      },
    },
  ],
}