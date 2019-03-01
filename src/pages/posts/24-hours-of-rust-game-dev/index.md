---
title:  "24 hours of game development in Rust"
date:   2019-03-01 00:00:00
categories: []
tags: ['game dev', 'rust']
featuredImage: "./design.jpg"
---

In this post I'll talk about a small game I've been developing in about 24 hours in total (mostly in a few hour blocks during evenings or weekends). The game is far from finished, but I thought I'd write up about my experience so far, what I've learnt and some interesting observations about building a game from scratch-ish and doing it in Rust. 

## Why Rust?
I picked Rust because I've been hearing great things about it and I see it's been having some traction in the game development space. I have to say at the point which I started this game I had written a few small programs in Rust, just enough to not feel like my hands were tied when I started writing the game. 

## Why a game and what game?
Making games is fun! I wish there was a more elaborate reason than that, but for side projects I normally prefer things that are quite far from what I do daily at my job. Now, what game? I wanted to make a simulation game with a tennis theme, think like Cities Skylines meets Zoo Tycoon with tennis and pixel art. I haven't got it all figured out yet, but it's basically a tennis academy where people come and play tennis.

## The making of the game!

### Research
I knew I wanted to use Rust, but I didn't know exactly how much "from-scratch" I wanted to make it. I didn't want to write pixel shaders, but I didn't want to use drag and drop either, so I had to pick something that gave me enough flexibility but also keep it interesting from an engineering perspective without going too low level. 

I found a few useful resources which I'll link here in case you want to have a look: 
* [Are we game yet](http://arewegameyet.com/) - a list of game dev related Rust packages
* [Rust game dev subreddit](https://www.reddit.com/r/rust_gamedev)
* [Free pixel art](https://kenney.nl)

I did a little research on Rust game engines and was left with two main contenders: Piston and ggez. I tried both in a previous small project and I ended up going with ggez because it seemed easier to use for a small 2D game. Piston's modularity seemed a bit unapproachable from a beginner's point a few.

### The game
I then spent a bit of time thinking about the game. 

In terms of entities we would probably have:
* Floor 
* Person (the tennis players basically, but maybe in the future also coaches)
* Tennis court 

In terms of mechanics we'd need to:
* be able to build entities (some sort of build mode)
* be able to render said entities
* be able to assign people to courts and have them play

And eventually:
* money
* skills
* different types of courts 
* ... 

At this point I felt like I had enough ideas to start coding. (being PM and dev is quite fun! I'd still rather have a PM though ..)

### The beginnings: circles and abstraction
I pretty much ripped off a ggez sample and got a window with a circle in it up on the screen. Amazing! Next, some abstraction. I thought it would be a good idea to abstract the idea of a game object. Every game object can be rendered and updated, something like this (if you're rolling your eyes at this point, this was before I found out about ECS, so bear with me here). 

```rust
// the game object trait
trait GameObject {
    fn update(&mut self, _ctx: &mut Context) -> GameResult<()>;
    fn draw(&mut self, ctx: &mut Context) -> GameResult<()>;
}

// a specific game object - Circle
struct Circle {
    position: Point2,
}

 impl Circle {
    fn new(position: Point2) -> Circle {
        Circle { position }
    }
}
impl GameObject for Circle {
    fn update(&mut self, _ctx: &mut Context) -> GameResult<()> {
        Ok(())
    }
    fn draw(&mut self, ctx: &mut Context) -> GameResult<()> {
        let circle =
            graphics::Mesh::new_circle(ctx, graphics::DrawMode::Fill, self.position, 100.0, 2.0)?;

         graphics::draw(ctx, &circle, na::Point2::new(0.0, 0.0), 0.0)?;
        Ok(())
    }
}
```

This allowed me to have a nice list of objects which I could update and render in a nice loop. 

```rust
impl event::EventHandler for MainState {
    fn update(&mut self, context: &mut Context) -> GameResult<()> {
        // Update all objects
        for object in self.objects.iter_mut() {
            object.update(context)?;
        }

        Ok(())
    }

    fn draw(&mut self, context: &mut Context) -> GameResult<()> {
        graphics::clear(context);

        // Draw all objects
        for object in self.objects.iter_mut() {
            object.draw(context)?;
        }

        graphics::present(context);

        Ok(())
    }
}
```

At this point `main.rs` was the place to be, because every single line of code was there, so I spent some time breaking that up into separate files and rationalizing the directory structure a bit. 

### People, floors and images
The next big milestone was creating a `Person` game object and loading images. I decided everything will be tile based (currently 32x32 tiles).

![alt text](./1.png "People, floors and images")

### Tennis courts
I spent some time looking at images of tennis courts online and I figured I'd want my tennis court to be 4*2 tiles. I would make an image that wide, or I could have 8 separate tiles. On further inspection I actually realized I only need 2 unique tiles to build the whole court. Let me explain. 

2 unique tiles: 1 and 2. 

Each section of the court is actually made up of either tile 1 or tile 2, either as is or rotated 180 degrees. 

![alt text](./tennis_court.png "Constructing a tennis court")

### A terrible build mode
Now that I could render floors, people and courts I figured I needed a basic build mode. I made it so that when a key was pressed, an object was selected and click would then place that type of object. For example, pressing 1 would give you a court and pressing 2 would give you a person.

That wasn't super useful as you needed to remember what 1 or 2 were, so I added a build-mode wireframe so you could at least know what object you had. 

![alt text](./wireframes.gif "Wireframes")



