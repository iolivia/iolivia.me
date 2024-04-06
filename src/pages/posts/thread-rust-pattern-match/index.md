---
title:  "🧵 Rust Pattern Matching"
date:   2021-12-23 09:00:00
featuredImage: "./featured.jpeg"
categories: []
tags: []
---

One of my favourite #rustlang compiler-driven development tricks is exhaustive matches on enums.

Here is a simple example. Let's say we are making a city building game and we want to show:
🌿 background tiles (grass)
🏠 buildings (houses, factories)
🚰 water pipes

We represent the layers as a Rust enum, and we want the Background and Buildings to always be visible while the pipes can be toggled on or off.

For interacting with the UI we have a simple settings struct, so the UI layer would toggle this bool on or off based on a checkbox.

```rust
// Stackable game layers
enum TileLayer {
    Background,
    Buildings,
    Piping,
}

// Used by the UI system
struct RenderingSettings {
    show_pipes: bool, // toggle pipes on/off
}
```

We create a get_rendering_order function which gives us all the layers in the correct order and respects the settings. If the user unchecked the show_pipes checkbox, we don't want to show this layer.

```rust
impl TileLayer {
    pub fn get_rendering_order(settings: &RenderingSettings) -> Vec<TileLayer> {
        // Always on layers
        let mut layers = vec![
            TileLayer::Background,
            TileLayer::Buildings,
        ]

        // Add toggable layers
        if settings.show_pipes {
            layers.push(TileLayer::Piping);
        }

        layers
    }
}
```

So far so good, our code works 🎉

But what happens when we want to add a new enum?

Let's say we are adding electricity and we now need an additional layer for cables, and we also want this layer to be toggled on/off. ⚡🔌

```rust
// Stackable game layers (updated)
#[derive(EnumIter)]
enum TileLayer {
    Background,
    Buildings,
    Piping,
    Cabling, // new
}

// Used by the UI system (updated)
struct RenderingSettings {
    show_pipes: bool,  // toggle pipes on/off
    show_cables: bool, // toggle cables on/off
}
```

What happens is our code compiles just fine, but get_rendering_order returns the same 3 layers as before without including the new Cabling layer or show_cables.

That is because we forgot to update the code.

But what if we could make the compiler tell us what to add where? 💡

Here is another way we could implement get_rendering_order.

We rely on strum (<https://crates.io/crates/strum>) to iterate through all layers with ::iter(), and we have an is_visibile function which better expresses our intent.

Let's see what happens when we add cables now.

```rust
// Example 2
impl TileLayer {
    pub fn is_visible(&self, settings: &RenderingSettings) -> bool {
        match self {
            TileLayer::Background => true,
            TileLayer::Buildings => true,
            TileLayer::Piping => settings.show_pipes,
        }
    }

    pub fn get_rendering_order(settings: &RenderingSettings) -> Vec<TileLayer> {
        TileLayer::iter()
            .filter(|layer| layer.is_visible(settings))
            .collect()
    }
}
```

We are being pointed by the compiler to the `is_visibile` function match, and told that the `Cabling` variant is not covered.

```rust
    pub fn is_visible(&self, settings: &RenderingSettings) -> bool {
        match self {
            TileLayer::Background => true,
            TileLayer::Buildings => true,
            TileLayer::Piping => settings.show_pipes,
            // missing enum variant here
        }
    }
```

Finally, we make the modification and now our Cabling layer is correctly toggled on/off.

```rust
    pub fn is_visible(&self, settings: &RenderingSettings) -> bool {
        match self {
            TileLayer::Background => true,
            TileLayer::Buildings => true,
            TileLayer::Piping => settings.show_pipes,
            TileLayer::Cabling => settings.show_cables,
        }
    }
```

Our code compiles and works 🎉

But most importantly, we relied on the compiler to tell us what to do, and not on the developer remembering to do something. 🔥
