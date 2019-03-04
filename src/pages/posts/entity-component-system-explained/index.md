---
title:  "Entity component system (ECS) explained"
date:   2019-03-03 00:00:00
categories: []
tags: ['game dev', 'rust', 'ecs']
featuredImage: "./tennis.jpg"
---

[In the last post](/posts/24-hours-of-rust-game-dev/) I talked about a small game I built in Rust and roughly how far I got in 24 hours. One of the biggest challenges I had was finding the right architecture. 

I started off with a basic inheritance model until I realized that was *The Wrong Thing <sup>TM</sup>* and switched to an **Entity component system architecture** (or ECS). I didn't find ECS immediately intuitive and I struggled a bit to think in ECS, so I figured I'd write a short post about it in case it helps anyone else facing the same challenges. 

I'll be using ggez and specs, but to be honest it doesn't matter too much, the same principles will apply to any ECS implementation although the details might be slightly different.

## ECS overview
In ECS terminology you have these 3 basic concepts:
- **Entities**: this is just a type of a thing referenced with an identifier (like a Player, Ball, etc.)
- **Components**: these are what your entities are made up of. For example, you can have a Renderable component, a Position component, etc. This is purely data storage.
- **Systems**: systems use entities and components and contain behaviour and logic based on that data. For example, you could have a rendering system which just iterates through all entities which contain renderable components and draws all of them.

The whole idea is separating behaviour from logic, so all the data goes in components and all the behaviour goes into systems.

If it doesn't make sense yet, hang in there because a real example is coming.

## ECS in practice

So let's talk a specific example. I'm building a simple tennis simulation/management game, think like a mix of Cities Skylines with a bit of Prison architect, but about tennis. The idea is pretty simple: you have players and you have tennis courts, and you want to assign people to courts and have them go there and play. See it in action below.

![alt text](./people_to_courts.gif "People going to courts")

So we'll need:
- floors
- people
- tennis courts

And then we will also need the following behaviours:
- a person needs to find an available tennis court
- a person with an assigned tennis court needs to travel to that court

And here is how that works in ECS terms. Let's start with components.

### Components
So components are basically the simplest smallest piece of data that makes sense on its own (think an atom). So let's try to break this down. 

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

`Image` will handle the cases when you only need one image (like the floor and the person) and `Sprite` will handle the more complex case of a list of images with rotations (like the tennis courts).

```rust
// image.rs
// Image doesn't do all that much, just keeps
// a path to an image.
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

I created a util file whose sole responsibility is to create these entities. Eventually I can replace this file with a json config to make it easier to change. 

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
So far we talked about the data only, so let's start thinking how we'll address behaviours. 

We have 3 main behaviours:
1. rendering 
1. court assignment
1. path finding

#### Rendering
We can render two types of things basically, either images or sprites. 

```rust
// This is our rendering system.
impl<'a> System<'a> for RenderingSystem<'a> {

    // This is the type of data we will use in this system.
    // It's a good idea to have every system only use the data 
    // it needs. 
    type SystemData = (
        Entities<'a>,
        ReadStorage<'a, Position>,
        ReadStorage<'a, Image>,
        ReadStorage<'a, Sprite>,
    );

    // This is the run method which gets called on every game
    // loop iteration.
    fn run(&mut self, data: Self::SystemData) {

        // This is all the data this system uses.
        let (entities, position_storage, image_storage, sprite_storage) = data;

        // Grab all entities with a position and an image component
        let entities_with_image = (&*entities, &position_storage, &image_storage).join();
        // Draw each
        for (entity, position, image) in entities_with_image {
          self.draw_image(position, image);
        }

        // Grab all entities with a position and a sprite component
        let entities_with_sprite = (&*entities, &position_storage, &sprite_storage).join();
        // Draw each
        for (entity, position, sprite) in entities_with_sprite {
          self.draw_sprite(position, sprite);
        }
    }
}
```

Now let's discuss the rendering system in more detail. 

The system has access to a few things:
- the full list of entities
- the list of position components
- the list of image components
- the list of sprite components

Specs gives a useful `join` method which we can use to get entities with a certain combination of components. For example, this will give us only enitities that have a position component AND an image component.

```rust
  // Grab all entities with a position and an image component
  let entities_with_image = 
    (&*entities, &position_storage, &image_storage).join();
```

Similarly, we can get all entities which have position and sprite.

```rust
  // Grab all entities with a position and a sprite component
  let entities_with_sprite = 
    (&*entities, &position_storage, &sprite_storage).join();
```

Once we have these lists all we have to do is iterate through them and simply render each image and each sprite. This is a very basic rendering system that works. In the future this might need to be more complex like: sort entities by depth first, group images and sprite so we can render them more efficiently, etc. 

The key bit here is also that we are not rendering based on entity type, but we are rendering based on components of entities. For example, this code doesn't care that we have floors or courts, it just cares about "entities with images" or "entities with sprites". In a more traditional game architecture we might care about what the entity is, but the beauty of ECS is that you break everything down into the simplest thing and you gave systems working with the minimum amount of information they need. Imagine we add thousands of new entities, this system doesn't need to change one bit. If that is not elegant, I don't know what is! 

#### Court assignment

The other system we care about is how people get assigned to courts. Again for this system we only need to care about: people, courts and positions.

We find all available courts, we find all people that don't have courts and we match them up. I won't include the code because it needs a bit of tidying up but hopefully you get the gist. 

#### Path finding

Once we've assigned a court and a court position to each player, we need to make them move there. This is a greedy style path finding, we just try to get closer at very step in the direction of our desired position. 

```rust
impl<'a> System<'a> for PersonMovementSystem {
    type SystemData = (
      ReadStorage<'a, Person>, 
      WriteStorage<'a, Position>
    );

    fn run(&mut self, data: Self::SystemData) {
        let (people, mut positions) = data;

        for (person, position) in (&people, &mut positions).join() {
            match (person.assigned_court, &person.assigned_court_position) {
                (Some(_), Some(court_position)) => {
                    // Calculate some stuff
                    let x_distance = (court_position.x - position.x) / TILE_WIDTH;
                    let y_distance = (court_position.y - position.y) / TILE_WIDTH;
                    let mut x_direction = 1.0;
                    let mut y_direction = 1.0;
                    if x_distance < 0.0 {
                        x_direction = -1.0;
                    }
                    if y_distance < 0.0 {
                        y_direction = -1.0;
                    }

                    // Check if we are there
                    if x_distance == 0.0 && y_distance == 0.0 {
                        continue;
                    }

                    // If we're not there yet, go with the highest distance first
                    if x_distance.abs() > y_distance.abs() {
                        position.x += TILE_WIDTH * x_direction;
                    } else {
                        position.y += TILE_WIDTH * y_direction;
                    }
                }
                (_, _) => (),
            }
        }
    }
}
```

## Wrapping up

And there you have it: components, entities and systems explained with a real world example. Hopefully this demystifies ECS a little and helps you understand how you would use it yourself. 

Got some questions? Want me to write more? Let me know!


