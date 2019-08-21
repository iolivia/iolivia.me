---
title:  "6 months of game development in Rust"
date:   2019-08-21 00:00:00
categories: []
tags: ['game dev', 'rust']
featuredImage: "./game.png"
---

If you made it here you might have already read my previous post [24 hours of game development in Rust](/posts/25-hours-of-rust-game-dev), but if you haven't, it was basically a short summary of how I started learning rust and decided to make a game with it. I started with a classical OOP/trait architecture that was taking me nowhere really fast, so I switched to ECS and got a minimal prototype working. Fast forward 6 months, I wanted to catch you folks up on where I am and what I've learnt so far.

## Statistics 
Let's start with some stats:
- first commit: __*Sat Feb 9 12:57:17 2019*__
- longest streak: __*3 days*__
- total commits: __*370 commits*__
- max commits a day: __*35 commits*__

And a nice contribution graph generated with [git-stats](https://github.com/IonicaBizau/git-stats).

![alt text](./commits.png "Contribution graph")

Most of the work is done on the weekends and I'll explain a bit why in the next section of learnings.

## Demo!
Without further ado, let's see where the game is at right now!

<iframe 
    width="560" 
    height="315" 
    margin="auto" 
    src="https://www.youtube.com/embed/96qPwvDEAuI" 
    frameborder="0" 
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen
></iframe>

### Features
- 💵money: every item costs money and the money is substracted when buying an item
- 👟tennis courts of all types: hard, clay, concrete and grass
- 🎁more object types: benches, balls, roof tiles
- ⏱️time: the game keeps track of how many days/months/years it's been
- 🌶️main menu
- 🏠build menu
- ⛹️player selection menu
- ↩️assignments: a player can be assigned to a court or a bench
- 🛣️basic pathfinding: a player can find its way to an assigned court or bench
- 📈skill levels: a player playing on a court will get increased tennis skill level
- 🛌needs: a player who plays too much will get tired and need rest





