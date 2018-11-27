module.exports = {
    siteMetadata: {
      title: `Hi! I'm John and this is my website.`,
      tagline: `I am a Typescript guru 💪 and I love my static websites.`
    },  
    plugins: [
      `gatsby-plugin-sass`,
      `gatsby-plugin-typescript`,
      `gatsby-plugin-tslint`,
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: `${__dirname}/src/posts`,
          name: "markdown-pages",
        },
      },
      `gatsby-transformer-remark`
    ],
  }