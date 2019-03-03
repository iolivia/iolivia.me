---
title:  "Entity component system (ECS) explained"
date:   2019-03-03 00:00:00
categories: []
tags: ['game dev', 'rust', 'ecs']
featuredImage: "./tennis.jpg"
---

In the last post I talked about a small game I built in Rust and roughly how far I got in 24 hours. One of the biggest challenges I had was finding the right architecture where things would be easy to build and any new feature should have clear steps on what patterns to combine to achive it. I started off with a basic inheritance model until I realized that was The Wrong Thing TM and switched to an Entity component system architecture (or ECS as it's most commonly referred to). I didn't find ECS immediately intuitive and I struggled a bit to think in ECS, so I figured I'd write a short post about my current setup and how I got myself to think more ECS and less in a traditional OOP way. I'll be using ggez and specs.

## ECS overview
So what is ECS? [ECS - Entity Component System](https://en.wikipedia.org/wiki/Entity_component_system) is a type of architecture and the gist of it is:
* separate data from logic
* composition over inheritance
* data oriented design

In ECS terminology you have these 3 basic concepts:
- Entities: this is just a type of a thing referenced with an identifier (like a Player, Ball, etc.)
- Components: these are what your entities are made up of. For example, you can have a Renderable component, a Position component, etc. This is purely data storage.
- Systems: systems use entities and components and contain behaviour and logic based on that data. For example, you could have a rendering system which just iterates through all entities which contain renderable components and draws all of them.

If it doesn't make sense yet, hang in there because a real example is coming.

## ECS in practice

So let's talk a specific example. If you didn't read my previous post I'll just quickly describe what I was trying to achieve with this game. See it in action below.

![alt text](./people_to_courts.gif "People going to courts")

So I wanted a few things:
- a floor, which is pretty much static and doesn't do anything
- people, which are tennis players
- tennis courts
- people should find an available tennis court
- people that have an assigned tennis court should travel to said court

And here is how that works in ECS terms. Let's start with components.

### Components
So components are basically the simplest smallest piece of data that makes sense on its own (think an atom) and entities are just a composition of a lot of components. So let's try to break this down. 

We need:
1. a way to assign an image or a list of images to an entity: for example, the court is made up of 8 images and the person is made up of 1 image
1. a way to keep track of where each entity is on the grid
1. a way to link a person to a court
1. a way to link a court to a person

#### Position
Let's start with the easy one. Everything needs to have a position. Normally that would just be an x and y in a 2D game, but since we want to make sure things are layered properly (like no courts on top of people), we need to include a z as well. 

```rust
#[derive(Debug, Component, Clone)]
#[storage(VecStorage)]
pub struct Position {
    pub x: f32,
    pub y: f32,
    pub z: f32,
}

impl Position {
    pub fn new(x: f32, y: f32, z: f32) -> Self {
        Position { x, y, z }
    }

    pub fn to_point(&self) -> Point2 {
        Point2::new(self.x, self.y)
    }
}
```

#### Images 
For handling images, I decided to break this down into two components (although I'm not entirely convinced now that that was a good idea now), but here is how I thought about it. 

`Image` will handle the cases when you only need one image (like the floor and the person)
`Sprite` will handle the more complex case of a list of images with rotations (like the tennis courts)

```rust
// image.rs
// Image doesn't do all that much, just loads
// an image from a path and keeps it so we can 
// use it for rendering later.
#[derive(Debug, Component)]
#[storage(VecStorage)]
pub struct Image {
    pub path: String,
}

impl Image {
    pub fn new(ctx: &mut ::ggez::Context, path: &str) -> Self {
        Image { path: path.to_string() }
    }
}

// sprite.rs
// Sprite is a little more complex but 
// the idea is simple: multiple images, 
// each with an offset and a rotation. 
#[derive(Debug, Clone)]
pub struct SpriteConfig {
  pub image_index: usize,
  pub tile_offset_x: u8,
  pub tile_offset_y: u8,
  pub rotation: f32,
}

impl SpriteConfig {
  pub fn new(image_index: usize, tile_offset_x: u8, tile_offset_y: u8, rotation: f32) -> Self {
    SpriteConfig {
      image_index,
      tile_offset_x,
      tile_offset_y,
      rotation,
    }
  }
}

#[derive(Debug, Component)]
#[storage(VecStorage)]
pub struct Sprite {
  pub images: Vec<graphics::Image>,
  pub config: Vec<SpriteConfig>,
}

impl Sprite {
  pub fn new(ctx: &mut ::ggez::Context, paths: Vec<&str>, config: Vec<SpriteConfig>) -> Self {
    let mut images = Vec::<graphics::Image>::new();
    for path in paths {
      let image =
        graphics::Image::new(ctx, path).expect(&format!("Could not load image at {}", path));
      images.push(image);
    }

    Sprite { images, config }
  }
}
```

#### People and courts 

Now, for people and courts, we just need to keep track of courts on people and people on courts. This made me think of database relations for some reason, since it seems like we are storing a M:M relationship, but we need to do that since in some cases we'll only have access to the person entity not the court and we want the person to know about its assigned court. 

```rust 
// person.rs
// I decided to call this a person even though it's 
// basically a tennis player. It doesn't hold much, just a
// reference to the court entity and the court's position
#[derive(Debug, Component)]
#[storage(VecStorage)]
pub struct Person {
  pub assigned_court: Option<Entity>,
  pub assigned_court_position: Option<Position>,
}

impl Person {
  pub fn new() -> Self {
    Person {
      assigned_court: None,
      assigned_court_position: None,
    }
  }
}
```
You might be wondering why we're also recording the court's position. That is because we want the person to move over to the court and to know where to move it needs to know the court's position. This can be problematic if the court's position can change, since we're keeping a copy at a point in time, but for now it will do. 

Next, courts!

```rust 
// tennis_court.rs
// Tennis courts just keep track of which 
// people are assigned to it, easy!
#[derive(Debug, Component)]
#[storage(VecStorage)]
pub struct TennisCourt {
  pub assigned_people: u32,
}

impl TennisCourt {
  pub fn new(assigned_people: u32) -> Self {
    TennisCourt { assigned_people }
  }
}

```

So here is our final list of components:
* Position
* Image
* Sprite
* Person
* TennisCourt

### Entities
Now entities are just a composition of components. 

So we'll have:
* **floor** which has Position and Image
* **person** which has Position, Image and Person
* **tennis court** which has Position, Sprite and TennisCourt

I created a util file who's sole responsibility is to create these entities. Eventually I can replace this file with a json config to make it easier to change. 

```rust 
// world_factory.rs

impl WorldFactory {
  // Creating floors
  pub fn new_floor(context: &mut Context, world: &mut World, x: f32, y: f32) -> Entity {
    world
      .create_entity()
      .with(Position::new(x, y, 0.0))
      .with(Image::new(context, &"/images/floor_1.png".to_string()))
      .build()
  }

  // Creating people
  pub fn new_person(context: &mut Context, world: &mut World, x: f32, y: f32) -> Entity {
    let path = WorldFactory::get_random_path("person".to_string(), 5);

    world
      .create_entity()
      .with(Person::new())
      .with(Position::new(x, y, 20.0))
      .with(Image::new(context, path.as_str()))
      .build()
  }

  // Creating courts
  pub fn new_tennis_court(context: &mut Context, world: &mut World, x: f32, y: f32) -> Entity {
    // This is just positions and rotations which 
    // help us build the tennis court out of only 
    // two images, don't worry about it too much!
    let sprite_config = [
      SpriteConfig::new(0, 0, 0, 0.0),
      SpriteConfig::new(1, 1, 0, 0.0),
      SpriteConfig::new(0, 1, 2, 3.14),
      SpriteConfig::new(1, 2, 2, 3.14),
      SpriteConfig::new(1, 2, 0, 6.28),
      SpriteConfig::new(0, 3, 0, 6.28),
      SpriteConfig::new(1, 3, 2, 3.14),
      SpriteConfig::new(0, 4, 2, 3.14),
    ];

    world
      .create_entity()
      .with(TennisCourt::new(0))
      .with(Position::new(x, y, 10.0))
      .with(Sprite::new(
        context,
        ["/images/tennis_court_1.png", "/images/tennis_court_2.png"].to_vec(),
        sprite_config.to_vec(),
      ))
      .build()
  }
}
```

There's really not all that much to this code, it just combines the components that make sense for each entity. 

### Systems

