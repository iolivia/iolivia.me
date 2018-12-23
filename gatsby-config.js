module.exports = {
  siteMetadata: {
    fullName: 'olivia ifrim',
    title: `olivia ifrim - personal website and technology blog`,
    tagline: ``,
    email: `olivia_github@outlook.com`,
    socialLinks: [
      ["linkedin", "https://www.linkedin.com/in/oliviaifrim/"],
      ["github", "https://github.com/iolivia"],
      ["quora", "https://www.quora.com/profile/Olivia-Ifrim"],
    ],
    settings: {
      animationsEnabled: false,
      disqusShortName: "oliviaifrim"
    },
    description: `<p>
    
    Hi, I'm Olivia! I'm currently a Senior Software Engineer at
  <a href="https://daisie.com">
      Daisie
  </a>
    where I am designing and building the next generation of backend services for
    our upcoming launch. Before this
    I was helping ship
  <a href="https://www.primevideo.com/">
    Amazon Video
  </a>
 to a bunch of TVs and set-top boxes, and even
    before that I was building services for
  <a href="https://docs.microsoft.com/en-us/graph/overview">
    Office 365 at Microsoft
  </a>
  . And even befooooore
    that I was building games for kids at 
  <a href="https://www.metacritic.com/game/xbox-360/kinect-sesame-street-tv">
    Xbox.
  </a>
  </p>
  <p>
    I love technology and I love creating software that lasts. I occasionaly speak at events
    and run workshops.
  </p>`,
    siteUrl: `http://iolivia.me`
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
          },
          {
            resolve: "gatsby-remark-copy-linked-files",
            options: {
              // `ignoreFileExtensions` defaults to [`png`, `jpg`, `jpeg`, `bmp`, `tiff`]
              // as we assume you'll use gatsby-remark-images to handle
              // images in markdown as it automatically creates responsive
              // versions of images.
              //
              // If you'd like to not use gatsby-remark-images and just copy your
              // original images to the public directory, set
              // `ignoreFileExtensions` to an empty array.
              ignoreFileExtensions: [],
            },
          },
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
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        sitemap: 'https://iolivia.github.io/sitemap.xml'
      }
    },
    `gatsby-plugin-styled-components`
  ],
}