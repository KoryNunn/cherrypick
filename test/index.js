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

test('deep include multiple', function(t){
    t.plan(1);

    var obj = {a:{c:1,d:2},b:{e:3}};

    t.deepEqual(cherrypick(obj, 'a.c a.d'), {a:{c:1,d:2}});
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

test('deep exclude multiple', function(t){
    t.plan(1);

    var obj = {a:{b:1,c:2,d:3}};

    t.deepEqual(cherrypick(obj, true, 'a.b a.d'), {a:{c:2}});
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

test('non object should return non object', function(t) {
    t.plan(6);

    t.equal(cherrypick('i am not an object', 'a b c'), 'i am not an object');
    t.equal(cherrypick(undefined, 'a b c'), undefined);
    t.equal(cherrypick(1, 'a b c'), 1);
    t.equal(cherrypick(null, 'a b c'), null);
    t.deepEqual(cherrypick({a: null}, 'a.b'), {});
    t.deepEqual(cherrypick({a: 2}, 'a.b'), {});
});
