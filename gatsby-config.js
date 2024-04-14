module.exports = {
  siteMetadata: {
    fullName: 'olivia ifrim',
    title: `olivia ifrim - personal website and technology blog`,
    tagline: ``,
    email: `olivia_github@outlook.com`,
    twitterHandle: "@oliviff",
    socialLinks: [
      ["twitter", "https://twitter.com/oliviff"],
      ["linkedin", "https://www.linkedin.com/in/oliviaifrim/"],
      ["github", "https://github.com/iolivia"],
      ["quora", "https://www.quora.com/profile/Olivia-Ifrim"],
    ],
    settings: {
      animationsEnabled: false,
      disqusShortName: "oliviaifrim",
      disqusEnabled: false
    },
    description: `
    <p>
    Hi, I'm Olivia! I'm currently a <b>Senior Staff Software Engineer</b> at 
    <a href="https://www.personio.com/">Personio</a> where I work on 
    building Payroll.
    </p>
    <p>
    Before this I was fortunate enough to be part of Twitter 1.0 where I 
    led various Media Infrastructure projects. Before that I was the tech lead for 
    <a href="https://en.wikipedia.org/wiki/Maisie_Williams">Maisie Williams</a>'s 
    creative startup <a href="https://daisie.com">Daisie</a>, working on live streaming
    for <a href="https://www.primevideo.com/">Amazon Video</a> and even before that
    building services for <a href="https://docs.microsoft.com/en-us/graph/overview">
    Office 365 at Microsoft</a> and building games for kids at 
    <a href="https://www.metacritic.com/game/xbox-360/kinect-sesame-street-tv">Xbox</a>.
    </p>
    <p>
    I love designing and building software and most of all solving problems. 
    I used to write a lot about Rust and game development, and I was featured on
    multiple Rust gamedev <a href="https://gamedev.rs/news/">newsletters</a>. 
    </p>
    <p>
    I am also the author of the <a href="https://sokoban.iolivia.me/">Rust Sokoban book</a>.
    </p>
    `,
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
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-amazon-onetag`,
      options: {
        adInstanceId: "deb44b72-f054-4d8b-9d02-bbb1974d3c32",
        includeInDevelopment: true,
        marketplace: "US"
      }
    }
  ],
}