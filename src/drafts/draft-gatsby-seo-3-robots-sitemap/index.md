---
title:  "Make search engines love your Gatsby website, the complete guide to Gatsby SEO - Part 3: Robots and sitemap"
date:   2018-12-01 22:47:00
categories: [gatsby-seo]
tags: [seo, gatsby, gatsby seo, performance, robots, sitemap]
featuredImage: "./performance.jpg"
---

There are a few low hanging SEO fruit which we'll be picking in this article (part of the SEO series):
* sitemap
* robots

## Sitemap
Turns out it's pretty easy to add a sitemap to our gatsby website. 

```sh
npm install --save gatsby-plugin-sitemap
```

Add to the config.

```js
module.exports = {
  siteMetadata: {
    siteUrl: `https://www.example.com`,
  },
  plugins: [`gatsby-plugin-sitemap`],
}
```

## Robots

```sh
npm install --save gatsby-plugin-robots-txt
```

Add to the config.

```js
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        sitemap: 'https://yourdomain.com/sitemap.xml'
      }
    }
```
<<<<<<< HEAD

PS: This got us to 30/30 on Website Grader.
=======
>>>>>>> 11420688acd5d908eb7d6dccbb8568bf820e5f3c
