---
title:  "How to deploy a personal Gatsby site to Github pages"
date:   2018-12-01 12:59:00
categories: []
tags: [gatsby, github, github pages, gh-pages]
featuredImage: "./gatsbyjs-github.jpg"
---

I recently revamped my personal website to use [Gatsby](https://www.gatsbyjs.org/) and I spent a little more than I thought it was necessary to figure out how to deploy it to Github pages as my personal website at the root of `<username>.github.io` so I wanted to share what I did with you so you don't have to spend that extra time reinventing the wheel. 

First, install the `gh-pages` plugin. 

```sh
npm install gh-pages --save-dev
```

Add a deploy script to `package.json`. We'll use this script to trigger a deployment from our local command-line to github pages. Note that we are saying we'll be deploying to the `master` branch as enforced by Github.

```json
  "scripts": {
    ...
    "deploy": "gatsby build && gh-pages -d public -b master"
  },
```

Now here is where it gets tricky, if we just ran `npm run deploy` at this point what will happen is that this command will build our site and create a new commit which just has the statically built version of the website. This means the source code is buried under this commit and if we want to make updates, well ... we can't. 

So here is what we are doing to do instead:
* master -> we'll use this for publishing only (because we have to) so this will only every have the statically built version
* master-source -> we'll use this for keeping the source code and we'll run `npm run deploy` from it (which will take the code in master-source, build it and push it to master, where github pages will get it from)

So take the branch you have all your source code in, presumably master, and let's create the `master-source` local and origin branch.

```sh
git checkout -b master-source
git push --set-upstream origin master-source
```

Now from the master-source branch run this to get your site deployed. 

```sh
npm run deploy
```

You should see something like this at the end if all went well.

```
npm run deploy
....
....
success Building static HTML for pages — 0.604 s — 9/9 44.66 pages/second
info Done building in 11.112 sec
Published
```

Navigate to [https://username.github.io](https://username.github.io) and everything should be there waiting for you :smiley: .

Let me know if this worked for you or if you found a better way!