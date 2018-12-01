---
title:  "Implementing a Bloom filter - Part 1"
date:   2017-05-22 19:00:00
categories: [bloom-filter]
tags: [bloom filter, bloom, cpp, c++]
featuredImage: "./bloom-flower-1.jpg"
---

In this series we will implement a very simple Bloom filter in c++. 

But first things first. What's a Bloom filter? 

Simply put, a Bloom filter is a data structure used for doing lookups of items in sets. 
* If the result of the lookup is `false`, the item is definitely not in the set
* If the result of the lookup is `true`, the item *might* be in the set

Note that the Bloom filter doesn't store the raw data so it's not a replacement for storage. The advantage it offers is a constant time lookup optimized for when items are not present in the set.

Let's take a an example. We'll start by putting some items into the Bloom filter.

```cpp
put("A") 
put("B")
put("C")
```

Now let's ask the filter if these items are present

```cpp
isMaybePresent("D") 
false 
// the item is definitely not in the set, and we know this is correct

isMaybePresent("A") 
true
// the item *might* be present, and we know it is, since we've inserted it

isMaybePresent("E") 
true
// the item *might* be present, and we know it's not, since we never inserted it
// but it doesn't matter, because we mostly care about when the answer is false
// and we can afford a few false positives
```

And at this point you might be asking yourself, why would anyone use a Bloom filter when it doesn't actually store any data, and it can only tell you if something is not present or maybe present?

Imagine you are building Medium's recommended articles feature. Your recommendation engine gives you a list of articles which the user might enjoy based on their interests. But the recommendation engine has no state, so in this list you could have articles that the user has already read. In order to filter this list out you could of course make database queries for every article to see if they have been read, but that will be expensive. There must be a better way. 

**Enter the Bloom filter!**   

What if we kept a Bloom filter for every user with the articles they've read? Querying the Bloom filter is a constant time operation, and we wouldn't need to call the database at all. All we have to do is keep the Bloom filter up to date, so every time a user reads something we insert it into the Bloom filter.

Fun fact, this is actually [what Medium does](https://blog.medium.com/what-are-bloom-filters-1ec2a50c68ff#.xlkqtn1vy). 

Bloom filters are widely used for this type of quick filtering when the answer is mostly no. They are also used in [Chrome](http://archive.is/P6NSg), [Akamai](https://www.akamai.com/jp/ja/multimedia/documents/technical-publication/algorithmic-nuggets-in-content-delivery-technical-publication.pdf) and [Bitcoin](http://www.newsbtc.com/2016/05/10/developers-introduce-bloom-filters-improve-bitcoin-wallet-security/).

Now that we've seen what Bloom filters can do and why they are useful, we'll look at how they do this in [part 2](/posts/3-bloom-filter-part-2/).