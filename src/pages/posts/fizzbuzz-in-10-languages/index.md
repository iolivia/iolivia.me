---
title:  "FizzBuzz in 10 languages!"
date:   2018-12-29 00:00:00
categories: []
tags: ['FizzBuzz', 'challenge', 'languages']
featuredImage: "./languages.jpg"
---

[FizzBuzz](https://www.hackerrank.com/challenges/fizzbuzz/problem), as you might have heard, is a simple programming challenge given as an interview question to see if someone can code or not. 

```
Write a short program that prints each number 
from 1 to 100 on a new line. 

> For each multiple of 3, print "Fizz" instead of the number. 
> For each multiple of 5, print "Buzz" instead of the number. 
> For numbers which are multiples of both 3 and 5, 
print "FizzBuzz" instead of the number.
```

Simple modulo operations to see if something is divisible by 3 and/or 5, a loop and printing to the console. It doesn't sound complicated. And it isn't, unless you are doing it in an obscure language you've never used before or in a programming paradigm which is less than common. So the thought occurred to me, FizzBuzz is actually perfect for learning the basics of a new language. It's simple enough, it doesn't leave much room for interpretation and we've all done it before in a language we are familiar with. 

So I thought to myself, why not use some time this holiday to experiment with FizzBuzz? Oh boy did I experiment. 

##javascript (node)
I started with JavaScript, more for calibration purposes if nothing else. To remind myself of the problem and do it in a language I am very familiar with. Nothing special, here it is. 

```javascript
for (let i = 1; i <= 100; ++i) {
  const divBy3 = i % 3 === 0;
  const divBy5 = i % 5 === 0;

  if (divBy3 && divBy5) {
    console.log(`FizzBuzz`);
  } else if (divBy3) {
    console.log(`Fizz`);
  } else if (divBy5) {
    console.log(`Buzz`);
  } else {
    console.log(i);
  }
}
```

##haskell
Then I thought, you know what I haven't used in a while? A functional language. I did a bit of Haskell in university so this wasn't soo unknown to me, but it wasn't super easy either. About 20 minutes. The hardest part was probably the fact that there is no loop, the loop is implicit. But this code is really elegant.

```haskell
fb :: Integer -> String
fb n
  | mod n 3 == 0 && mod n 5 == 0    = "FizzBuzz"
  | mod n 3 == 0                    = "Fizz"
  | mod n 5 == 0                    = "Buzz"
  | otherwise                       = show n

main = do 
  putStrLn $ unlines (map fb [1..100])
```

##rust
Rust. I've been hearing about rust from a bunch of people, and now I finally got around to trying it. It was quite nice, I liked the pattern matching. I can't say I got into the more complex aspects of the language like the reference counting or friendly compiler messages, but I liked what I saw so far. 

```rust
fn main() {
    for x in 1..=100 {
        match (x % 3, x % 5) {
            (0, 0) => println!("FizzBuzz"),
            (0, _) => println!("Fizz"),
            (_, 0) => println!("Buzz"),
            _ => println!("{}", x),
        }
    }
}
```

##python
Not even worth discussing. Probably around a minute.

```python
for i in range(1, 101):
  divBy3 = i % 3 == 0
  divBy5 = i % 5 == 0
  if divBy3 and divBy5:
      print("FizzBuzz")
  elif divBy3:
      print("Fizz")
  elif divBy5:
      print("Buzz")
  else:
      print(i)
```

##ada
Now, this one was quite interesting. My observations were:
* it reminded me a lot of Pascal with the `:=` assignment syntax and `begin`s and `end`s
* I thought it was a bit verbose
* I found it a bit ugly (I mean `for I in Integer range 1 .. 100 loop` is quite considerably less elegant than `for x in 1..101`)

Overall it was an enjoyable experience though, I can't complain.

```ada
with Ada.Text_IO; use Ada.Text_IO;
with Ada.Integer_Text_IO; use Ada.Integer_Text_IO;
procedure Hello is
    Div_By_3 : Boolean := false;
    Div_By_5 : Boolean := false;
begin
For_Loop :
   for I in Integer range 1 .. 100 loop
  
      Div_By_3 := I mod 3 = 0;
      Div_By_5 := I mod 5 = 0;
      
    if Div_By_3 and Div_By_5 then 
        Put_Line("FizzBuzz");
    elsif Div_By_3 then
        Put_Line("Fizz");
    elsif Div_By_5 then
        Put_Line("Buzz");
    else
        Put( I );
        New_Line(1);
    end if;
      
   end loop For_Loop;

end Hello;
```

##go
Probably around a minute (even though I don't know go). At this point I realized a few things:
* it's getting a little repetitive, so maybe it's time to pick a wilder language
* I developed a system for breaking the problem down:
 * how do I loop though a list of numbers? (which normally also comes with the how to print those numbers)
 * how to do a modulus operator?
 * how to do an else-if

```go
package main

import (
    "fmt"
)

func main() {

    for i := 1; i <= 100; i++ {
        divBy3 := i%3 == 0
        divBy5 := i%5 == 0

        if divBy3 && divBy5 {
            fmt.Println("FizzBuzz")
        } else if divBy3 {
            fmt.Println("Fizz")
        } else if divBy5 {
            fmt.Println("Buzz")
        } else {
            fmt.Println(i)
        }
        
    }
}
```

##brainfuck
So, remember how I was saying I was getting a little bored? Enter brainfuck. Let me start by saying this language really serves its name. I am going to assume you don't know anything about it (because let's be honest, it's not taught in CS101), so I will tell you it only supports these operations: `<>+_.,[]`. You have a registry of numbers (255 I think) and you can do left right on the registry, increment and decrement, print something and loop while a registry's value is not zero. Yep. That's it. That is literally everything that comes as part of a language. 

So I took a small intermission to the problem solving to read these guides:
* [BrainFuck Programming Tutorial by: Katie](https://gist.github.com/roachhd/dce54bec8ba55fb17d3a)
* [Brainfuck for dummies](https://blog.klipse.tech/brainfuck/2016/12/17/brainfuck.html)
* [Brainfuck algorithms](https://esolangs.org/wiki/Brainfuck_algorithms)

And then I thought, ah, let me see how I can print a list of numbers. Well, here is [a page](https://esolangs.org/wiki/Brainfuck_algorithms) telling you how to do: `x = 0`, `x = y`, `	x = x < y` ... Umm, ok. This approach _might_ not work. 

Fast forward a couple of hours, I figure out how to print Fizz. Here it is. 
```brainfuck
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
.>++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++.>+++++++++++++++++++++++++++++++
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++.>+++++++++++++++++++++++++++++++++++++++++++++++
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++.>
```

I change my approach for this one to:
* figure out how to print a string
* figure out how to print a number
* figure out how to do modulo
* figure out how to do and if statement
* figure out how to do if x = 0
* figure out how to do if x and y
* figure out how to store one number
* figure out how to check if that number is divisible by 3
* ... then by 5
* ... then by both
* ... then by neither
* connect this with the prints
* loop through a list of numbers 

At the time of writing this, I got through everything apart from the loop. So the code below will print `Fizz`, `Buzz`, `FizzBuzz` or the numbers correctly, given a hardcoded number. 

```
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
>+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
++++++++++++++++++++++++++++++++++++>+++++++++++++++++++++++++++++++++
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++>++++++++++++++++++++++++++++++++++++++++++++++++++
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
++>++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++>
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++>++++++++++++++++++++++
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
++++++++++++++++++++++++++++++>+++++++++++++++++++++++++++++++++++++++
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++><<<<<<<<>>>>>>>>>+++++++++++++++>>+++<<[>+>->+<[>]>[<+>-
]<<[<]>-]>>[-]>>+<[>-<[-]]>[<<<<<<<<<<<<<.>.>.>.<<<>>>>>>>>>>>>>-]<+++
++<<[>+>->+<[>]>[<+>-]<<[<]>-]>>[-]>>+<[>-<[-]]>[<<<<<<<<<<.>.>.>.<<<>
>>>>>>>>>-]<+++<<[>+>->+<[>]>[<+>-]<<[<]>-]>>[-]>>+<[>-<[-]]>[>>>>>>+<
<<<<<-]<+++++<<[>+>->+<[>]>[<+>-]<<[<]>-]>>[-]>>+<[>-<[-]]>[>>>>>>+<<<
<<<-]>>>>>><[>>[-]+<<[-]]>[>[-]+<[-]]>[<<+>>-]<<>+<[>-<[-]]>[<<<<<<<<<
[>>+>+<<<-]>>>[<<<+>>>-]<<+>[<->[>++++++++++<[->-[>+>>]>[+[-<+>]>+>>]<
<<<<]>[-]++++++++[<++++++>-]>[<<+>>-]>[<<+>>-]<<]>]<[->>++++++++[<++++
++>-]]<[.[-]<]<>>>>>>>>>-]<<<<<<<<<
```

Wow. I spent a good afternoon on this and I solved like 80% of the problem. 1435 characters. But I will say this, getting anything to work in brainfuck was amazing. Even printing something so simple as Fizz is incredibly rewarding, cause you have to build those ASCII codes yourself. 

The best part though, in a normal language when you are stuck on something, you can easily google around for an answer. You look at some snippet of code and you're like: ah, I get it now. I was so silly. Doing the same for brainfuck just doesn't work. You look at how to do a modulus, you see `[>+>->+<[>]>[<+>-]<<[<]>-]` and you're like: well, I (still) don't get it. 

But it was fun! It also peaked my interest into the [esoteric languages](https://en.wikipedia.org/wiki/Esoteric_programming_language). Shakespeare and Chef also sounded interesting but didn't get to those yet. 

##bash
I needed a quick break to keep me going after the brainfuck adventure and bash did the trick. Ugly syntax if you ask me but overall nothing special or unexpected.

```bash
#!/bin/bash
# GNU bash, version 4.3.46

for i in {1..100}
do
    if [ `expr $i % 3` == 0 ] && [ `expr $i % 5` == 0 ]; then
        echo "FizzBuzz"
    elif [ `expr $i % 3` == 0 ]; then
        echo "Fizz"
    elif [ `expr $i % 5` == 0 ]; then
        echo "Buzz"
    else
        echo $i
    fi
done
```

##prolog
You know you're off to a good start when you see you can't do a for loop. I thought this might be the second brainfuck but it ended up being quite easy and enjoyable actually. 

```prolog
divBy3(X) :- 0 is mod(X, 3).
divBy5(X) :- 0 is mod(X, 5).

print_fizz_buzz(X) :- 
    (divBy3(X),divBy5(X))
    	-> write('FizzBuzz') 
    	; divBy3(X) 
    		-> write('Fizz') 
    		; divBy5(X) 
    			-> write('Buzz') 
    			; write(X).

print_numbers(100) :- print_fizz_buzz(100), !.
print_numbers(X) :- print_fizz_buzz(X), nl, Next is X + 1, print_numbers(Next).
```

##lolcode
Now, at last, another esoteric language, LOLCODE. It looks weird, it's weird to write, it's weird to read and just weird all around.  

```lolcode
HAI 1.2

IM IN YR loop UPPIN YR var TIL BOTH SAEM var AN 101

    DIFFRINT 0 AN var
    O RLY?
      YA RLY
    	I HAS A by3 ITZ BOTH SAEM 0 AN MOD OF var AN 3
    	I HAS A by5 ITZ BOTH SAEM 0 AN MOD OF var AN 5
    	
    	BOTH OF by3 AN by5 
        O RLY?
          YA RLY
            VISIBLE "FizzBuzz"
          NO WAI
        	by3
            O RLY?
              YA RLY
                VISIBLE "Fizz"
              NO WAI
                by5
                O RLY?
                  YA RLY
                    VISIBLE "Buzz"
                  NO WAI
                    VISIBLE var
                OIC
            OIC
        OIC
    OIC
	
IM OUTTA YR loop
KTHXBYE
```

##what have I learnt
10 languages and a couple of afternoons later, what have I learnt? 
* I genuinely enjoy writing code even for the sake of writing code
* Most languages that we use every day really aren't that different from eachother on a fundamental syntax level, they all have for loops and ifs and variables, etc.
* Functional, declarative and low-level languages are fundamentally different from the rest and programming in them requires a complete mind shift (like operating on a list in haskell using recursion instead of a loop, or moving the register pointer around in brainfuck)
* Language syntax has evolved somewhat from verbose to implicit and elegant (not sure if that is a good or bad thing, probably neither)

And if you'are after the code, it's all on [github](https://github.com/iolivia/fizzbuzz). Let me know what you thought of my FizzBuzz challenge and if you want to make your own and/or contribute to the repo let me know!