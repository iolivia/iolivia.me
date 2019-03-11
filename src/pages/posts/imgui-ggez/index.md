---
title:  "Making a game UI with imgui and ggez"
date:   2019-03-11 00:00:00
categories: []
tags: ['game dev', 'rust', 'imgui', 'ggez']
featuredImage: "./demo.png"
---

In this post I'll walk you through how you can create a pretty nice game UI with imgui and ggez. I spent a lot of time trying to make this work for my game and suffered greatly because of the lack of documentation, so I'm writing this so you don't have to! 

## Packages

Let's start with our tech stack, we'll be needing the following packages.

```rust
# Cargo.toml

[dependencies]
ggez = "0.4.4"

gfx = "0.17.1"
gfx_core = "0.8.3"
gfx_device_gl = "0.15.3"

imgui = {  git="https://github.com/Gekkio/imgui-rs" }
imgui-gfx-renderer = { git="https://github.com/Gekkio/imgui-rs" }
imgui-sys = { git="https://github.com/Gekkio/imgui-rs" }

sdl2 = "0.31.0"

nalgebra = { version="0.14", features= ["serde-serialize"] }
```

## Packages
