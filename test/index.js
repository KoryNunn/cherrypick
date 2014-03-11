var test = require('grape');
var cherrypick = require('../');

test('include', function(t){
    t.plan(1);

    var obj = {a:1,b:2,c:3};

    t.deepEqual(cherrypick(obj, 'a c'), {a:1, c:3});
});

test('exclude', function(t){
    t.plan(1);

    var obj = {a:1,b:2,c:3};

    t.deepEqual(cherrypick(obj, true, 'a c'), {b:2});
});