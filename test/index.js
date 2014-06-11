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

test('deep include', function(t){
    t.plan(1);

    var obj = {a:1,b:2,c:3,d:{e:4}};

    t.deepEqual(cherrypick(obj, 'a c d.e'), {a:1, c:3, d:{e:4}});
});

test('deep include null reference', function(t){
    t.plan(1);

    var obj = {a:1,b:2,c:3,d:{e:4}};

    t.deepEqual(cherrypick(obj, 'l.e.l'), {});
});

test('deep exclude', function(t){
    t.plan(1);

    var obj = {a:1,b:2,c:3,d:{e:4}};

    t.deepEqual(cherrypick(obj, true, 'b d.e'), {a:1, c:3, d:{}});
});

test('deep exclude null reference', function(t){
    t.plan(1);

    var obj = {a:1,b:2,c:3,d:{e:4}};

    t.deepEqual(cherrypick(obj, true, 'l.e.l'), {a:1,b:2,c:3,d:{e:4}});
});

test('include with tuples', function(t){
    t.plan(1);

    var obj = {a:1,b:2,c:3};

    t.deepEqual(cherrypick(obj, 'a g:c'), {a:1, g:3});
});

test('deep include with tuples', function(t){
    t.plan(1);

    var obj = {a:1,b:2,c:3,d:{e:4}};

    t.deepEqual(cherrypick(obj, 'a c g:d.z:e'), {a:1, c:3, g:{z:4}});
});