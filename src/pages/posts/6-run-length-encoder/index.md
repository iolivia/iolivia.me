---
title:  "Encoding - Run length encoder"
date:   2017-06-12 00:18:00
categories: [encoding-series]
tags: [encoding, run length encoder, compression, data]
featuredImage: "./running.jpg"
---

This post is the start of a mini-series on [data compression](https://en.wikipedia.org/wiki/Data_compression). Over the course of the series we will look at some algorithms for encoding, understand their strengths and weaknesses and we'll wrap up at the end with some wise thoughts after we've learnt all of this. 

First, what is data compression and why is it useful? 

Data compression is a way of encoding the raw information in a new format such that the resulting total byte size is smaller. The reason why this is useful is because we live in a world of huge images, videos, documents, etc. Watching a video on my phone requires a different resolution and quality than watching it on my 4K monitor, and encoding is one way to guarantee an experience customized to the device used but also the bandwidth constraints.   

But you might wonder, how do we compress the data so that we don't lose any information? Well, sometimes we do sometimes we don't. The two big types of compression are: **lossy** and **lossless**. Generally lossy algorithms have some sort of heuristic which tells them how to discard the least important information. For example, the JPEG format uses a model based on the human visual system to tell it which information is least perceptible by the human eye, and thus can be discarded without any preceived loss of information. Lossless algorithms usually use interesting tricks to manipulate and store the data in a different format which minimizes duplication.

Now that we understand a bit about data compression, let's got back to what this post is about, [run length encoding](https://en.wikipedia.org/wiki/Run-length_encoding). This is one of the most basic compression schemes. In fact, you might have already implemented a run length encoder without knowing it!

Let's see how it works.

```cpp
// This is our raw data, uncompressed.
"aaaaaaabcdefff"

// The RLE is used to compress identical adjacent characters.
"aaaaaaa" -> "a7"

// So then the whole compressed string would look like this.
"a7b1c1d1e1f3" 
```

So what we do is quite neat, instead of repeating ourselves, we just pack the adjacent identical characters. 

The code is pretty straight-forward.

```cpp
std::string RunLengthEncoder::Encode(const std::string& data) const
{
    std::stringstream stream;
    size_t current = 0;
    size_t length = data.length();

    while (current < (length - 1))
    {
        // Loop while we have the same character
        size_t sequenceLength = 1;
        while (current < length - 1 && data[current] == data[current + 1])
        {
            ++sequenceLength;
            ++current;
        }

        // Add to the encoded string
        stream << data[current] << sequenceLength;

        ++current;
    }

    return stream.str();
}
```

Now, pop quiz. Is RLE a lossy or lossless algorithm? Only counts if you do it without google.

Next up, we'll pick a different encoding algorithm. 