cherrypick
==========

cherrypick props off an object

## What

Check out the example

## Example

Grab it:

    var cherrypick = require('cherrypick');

Use it:

    var someObject = {
        a:1,
        b:2,
        c:3
    };

    var picked = cherrypick(someObject, 'a b');

picked will be:

    {
        a:1,
        b:2
    }

You can switch to exclude mode by passing true as the second parameter:

    var someObject = {
        a:1,
        b:2,
        c:3
    };

    var picked = cherrypick(someObject, true, 'a b');

picked will be:

    {
        c:3
    }

You can also pick on dot-notated deeply nested keys:

    var someObject = {
        a:1,
        b:2,
        c:3,
        d:{
          e:{
                g:4
            },
            f:{
                h:2
            }
        }
    };

    var picked = cherrypick(someObject, 'a d.e.g');

And you can change the name of keys using a tuple syntax:

    var someObject = {
        hello: 'world',
        things:{
            stuff: 'majigger'
        }
    };

    var picked = cherrypick(someObject, 'hello:greetings things.stuff:things.whatsits');

    ->

    {
        greetings: 'world',
        things:{
            whatsits: 'majigger'
        }
    }

## Breaking changes from v1 to v2

the rename/tuple syntax has changed to be much less confusing.

old:

per key: putHere:fromHere

    var obj = {a:1,b:2,c:3,d:{e:4}};

    t.cherrypick(obj, 'a c g:d.z:e'); -> {a:1, c:3, g:{z:4}}

new:

per path: take.from.here:put.it.here

    var obj = {a:1,b:2,c:3,d:{e:4}};

    cherrypick(obj, 'a c d.e:g.z'); -> {a:1, c:3, g:{z:4}}