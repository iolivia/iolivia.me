---
title:  "Making a game UI with imgui and ggez"
date:   2019-03-11 00:00:00
categories: []
tags: ['game dev', 'rust', 'imgui', 'ggez']
featuredImage: "./demo.png"
---

In this post I'll walk you through how you can create game user interface with imgui and ggez. I spent a lot of time trying to make this work for my game (which you can read more about [here](/posts/24-hours-of-rust-game-dev/)) and suffered greatly because of the lack of documentation, so I'm writing this so you don't have to! 

## Packages

Let's start with our tech stack, we'll be needing the following packages.

```rust
# Cargo.toml

[dependencies]
ggez = "0.4.4"

gfx_core = "0.8.3"
gfx_device_gl = "0.15.3"

imgui = "0.0.22"
imgui-gfx-renderer = "0.0.22"
```

## Starting with ggez 
We are going to start with the ggez [super simple example](https://github.com/ggez/ggez/blob/0.4/examples/super_simple.rs) which just draws a circle which is moving from left to write and then we'll add all the imgui bits.

```rust
// main.rs
extern crate ggez;

use ggez::conf;
use ggez::event;
use ggez::graphics::{self, DrawMode, Point2};
use ggez::{Context, GameResult};

struct MainState {
    pos_x: f32,
}

impl MainState {
    fn new(_ctx: &mut Context) -> GameResult<MainState> {
        let s = MainState { pos_x: 0.0 };
        Ok(s)
    }
}

impl event::EventHandler for MainState {
    fn update(&mut self, _ctx: &mut Context) -> GameResult<()> {
        self.pos_x = self.pos_x % 800.0 + 1.0;
        Ok(())
    }

    fn draw(&mut self, ctx: &mut Context) -> GameResult<()> {
        graphics::clear(ctx);
        graphics::circle(
            ctx,
            DrawMode::Fill,
            Point2::new(self.pos_x, 380.0),
            100.0,
            2.0,
        )?;
        graphics::present(ctx);
        Ok(())
    }
}

pub fn main() {
    let c = conf::Conf::new();
    let ctx = &mut Context::load_from_conf("super_simple", "ggez", c).unwrap();
    let state = &mut MainState::new(ctx).unwrap();
    event::run(ctx, state).unwrap();
}
```

## Adding imgui
We are going to wrap all imgui functionality in a separate class which we will then use in our main. So for now, let's define the public interface of our imgui wrapper. 

There are a few pieces of functionality we'll need:
* initializing imgui
* rendering game ui
* receiving mouse events
  * mouse position
  * mouse button up/down

It should look something like this. 

```rust
// This ImGuiWrapper will be the class that encapsulates all 
// imgui functionality.
impl ImGuiWrapper {
  // This is going to take a ggez context and give us 
  // back a fresh instance of the wrapper.
  pub fn new(ctx: &mut Context) -> Self {
    // ...
  }

  // This is what we will call on every render iteration
  // to render the imgui bits on top of our game.
  pub fn render(&mut self, ctx: &mut Context) {
    // ...
  }

  // This is how we'll update the mouse position. The UI needs 
  // to be aware of the position so it can display a different color
  // when you hover over a button etc.
  pub fn update_mouse_pos(&mut self, x: i32, y: i32) {
    // ...
  }

  // This is how we'll tell imgui a mouse button has been pressed 
  // or released. The 3 bools here are counterintuitively actually
  // 1. has the left mouse button been pressed
  // 2. has the right mouse button been pressed
  // 3. has the middle mouse button been pressed
  pub fn update_mouse_down(&mut self, pressed: (bool, bool, bool)) {
    // ...
  }

  // We could also handle mouse wheels for scrolling or
  // key events in a similar fashion, I'm hoping you get
  // the gist.
}
```

The implementation of this wrapper is essentially a bunch of boilerplate code to connect the ggez context with imgui. There are a few key parts around getting raw context bits, like the render target and factory, but apart from that it should be code you write (or copy) once and then pretty much forget about. You can see the full implementation [here](https://github.com/iolivia/imgui-ggez-starter/blob/master/src/imgui_wrapper.rs) if you's like to go a bit deeper into the details.

Something that is worth looking at deeper is the render function, since that actually decides what goes on screen.

```rust
pub fn render(&mut self, ctx: &mut Context) {
  // Update mouse, this will take the mouse state stored
  // in the wrapper and make sure imgui is aware of it.
  self.update_mouse();

  // Create new frame using the ggez context window size
  let w = ctx.conf.window_mode.width;
  let h = ctx.conf.window_mode.height;

  let frame_size = FrameSize {
    logical_size: (w as f64, h as f64),
    hidpi_factor: 2.0,
  };

  let now = Instant::now();
  let delta = now - self.last_frame;
  let delta_s = delta.as_secs() as f32 + delta.subsec_nanos() as f32 / 1_000_000_000.0;
  self.last_frame = now;

  // Create the frame
  let ui = self.imgui.frame(frame_size, delta_s);

  // Various ui things
  // This is where all our windows/menus/popups will go.
  // For now we just have the sample window.
  {
    // Window
    ui.window(im_str!("Hello world"))
      .size((300.0, 600.0), ImGuiCond::FirstUseEver)
      .position((100.0, 100.0), ImGuiCond::FirstUseEver)
      .build(|| {
        ui.text(im_str!("Hello world!"));
        ui.text(im_str!("こんにちは世界！"));
        ui.text(im_str!("This...is...imgui-rs!"));
        ui.separator();
        let mouse_pos = ui.imgui().mouse_pos();
        ui.text(im_str!(
          "Mouse Position: ({:.1},{:.1})",
          mouse_pos.0,
          mouse_pos.1
        ));

        if ui.small_button(im_str!("small button")) {
          println!("Small button clicked");
        }
      });
  }

  // Render
  let (factory, _, encoder, _, _) = graphics::get_gfx_objects(ctx);
  self.renderer.render(ui, &mut *factory, encoder).unwrap();
}
```

## Integrating imgui in our main
Now that we have a clear interface for how we'll handle imgui, we can extend our main to include this. 

```rust
// excluding imports here.

// This is our main state, same as before, except
// now we have an instance of imgui_wrapper.
struct MainState {
  pos_x: f32,
  imgui_wrapper: ImGuiWrapper,
}

impl MainState {
  fn new(mut ctx: &mut Context) -> GameResult<MainState> {
    // Note how we are initializing imgui_wrapper here,
    // we just give it a context and it gives us back
    // an instance which we pass to main state.
    let imgui_wrapper = ImGuiWrapper::new(&mut ctx);
    let s = MainState {
      pos_x: 0.0,
      imgui_wrapper,
    };
    Ok(s)
  }
}

impl event::EventHandler for MainState {
  fn update(&mut self, _ctx: &mut Context) -> GameResult<()> {
    self.pos_x = self.pos_x % 800.0 + 1.0;
    Ok(())
  }

  fn draw(&mut self, ctx: &mut Context) -> GameResult<()> {
    graphics::clear(ctx);

    // Render game stuff (same as before)
    {
      graphics::circle(
        ctx,
        DrawMode::Fill,
        Point2::new(self.pos_x, 380.0),
        100.0,
        2.0,
      )?;
    }

    // Render game ui
    {
      self.imgui_wrapper.render(ctx);
    }

    graphics::present(ctx);
    Ok(())
  }

  // We subscribe to ggez's mouse motion event to
  // get the position of the mouse and we pretty much
  // just give that to imgui.
  fn mouse_motion_event(&mut self,  _ctx: &mut Context, _state: MouseState, x: i32, y: i32, _xrel: i32, _yrel: i32) {
      self.imgui_wrapper.update_mouse_pos(x, y);
  }

  // Same for button down events.
  fn mouse_button_down_event(&mut self, _ctx: &mut Context, button: MouseButton, _x: i32, _y: i32 ) {
    self.imgui_wrapper.update_mouse_down((
      button == MouseButton::Left,
      button == MouseButton::Right,
      button == MouseButton::Middle,
    ));
  }

  // Same for button up events.
  fn mouse_button_up_event(&mut self, _ctx: &mut Context, button: MouseButton, _x: i32, _y: i32) {
    self.imgui_wrapper.update_mouse_down((
        match button {
            MouseButton::Left => false,
            _ => true,
        },
        match button {
            MouseButton::Right => false,
            _ => true,
        },
        match button {
            MouseButton::Middle => false,
            _ => true,
        },
    ));
    }
}

pub fn main() {
    // Same as before
}
```

## Wrapping up
If all went well, we should see something like this on the screen .

![alt text](./demo.gif "Demo")
