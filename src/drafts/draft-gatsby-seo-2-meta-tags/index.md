---
title:  "Make search engines love your Gatsby website, the complete guide to Gatsby SEO - Part 2: Adding meta tags"
date:   2018-12-01 21:52:00
categories: [gatsby-seo]
tags: [seo, gatsby, gatsby seo, performance, meta, tags, helmet]
featuredImage: "./performance.jpg"
---

Last time we talked about what we need to do to achieve a better SEO status and one of the top items we identified was missing meta tags. In this article we'll be fixing that. 

One of the recommended ways to get this in Gatsby is to use react helmet. So let's get that setup. 

```sh
npm install --save gatsby-plugin-react-helmet react-helmet
```

Add it to `gatsby-config.js`.

```json
plugins: [`gatsby-plugin-react-helmet`]
```

Now, since we know we'll need to do this is a bunch of places (current and new), like our index page, blog-post template page and any new page we create in the future that might have different metadata to the default website, it makes sense to abstract this into a separate component. Also, given we might want to add other SEO related things in the same way, we can create an SEO component.

The two main things we're focusing on here is the title and description tags. 

```ts
import * as React from 'react'

import Helmet from 'react-helmet'

interface SEOProps {
    description: string;
    title: string;
}

export default class SEO extends React.Component<SEOProps, {}> {

    public render() {

        const { description, title } = this.props;
        
        return (
            <div>

                {/* Helmet */}
                <Helmet
                    htmlAttributes={{ lang: 'en' }}
                    meta={[{ name: 'description', content: description }]}
                    title={title}
                />

            </div>
        );
    }
}
```

Notice how we are receiving the title and description as props since those will change based on the type of page we are on. So now let's update our types of pages. 

In `index.tsx` we'll add:

```ts
        <SEO 
          title={siteMetadata.title}
          description={siteMetadata.description}
        />
```

And in `blog-post.tsx` we'll add:

```ts
        <SEO 
          title={post.frontmatter.title || siteMetadata.title}
          description={post.excerpt || siteMetadata.description}
        />
```

Thanks for reading!

PS: This got our Website Grader SEO score from 5/30 to 20/30 :smiley: :smiley: