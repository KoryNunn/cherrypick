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