var matchTuple = /^(.*?)\:(.*?)$/,
    matchKey = /^(?:[^\\.]|\\.)*/,
    merge = require('flat-merge'),
    revive = require('statham/revive'),
    NonExistant = {};

function isObject(value){
    return value && (typeof value === 'object' || typeof value === 'function');
}

function pathToParts(path){
    var parts = [],
        match;

    do{
        match = path.match(matchKey);
        if(match){
            parts.push(match[0].replace(/\\(.)/g, function(match){
                return match.slice(1);
            }));
            path = path.slice(match[0].length + 1);
        }
    }while(path);

    return parts;
}

function getSourceAndTarget(path){
    var match = path.match(matchTuple),
        source = match ? match[1] : path,
        target = match ? match[2] : path;

    return [source, target];
}

function get(data, path){
    var parts = pathToParts(path),
        target = data;

    while(parts.length){
        var targetKey = parts.shift();

        if(!isObject(target) || !(targetKey in target)){
            return NonExistant; // The requested leaf didn't exist.
        }

        target = target[targetKey];
    }

    return target;
};

function set(data, path, value){
    var parts = pathToParts(path),
        target = data;

    // The source data did not contain the leaf,
    // do not add it to the result.
    if(value === NonExistant){
        return;
    }

    while(parts.length){
        var targetKey = parts.shift();

        if(parts.length === 0){
            target[targetKey] = value;
            return;
        }

        if(!isObject(target[targetKey])){
            target[targetKey] = isNaN(targetKey) ? {} : [];
        }

        target = target[targetKey];
    }
};

function remove(data, path){
    var parts = pathToParts(path),
        target = data;

    while(parts.length){
        var targetKey = parts.shift();

        if(parts.length === 0){
            target && (delete target[targetKey]);
            return;
        }

        if(!isObject(target)){
            return;
        }

        target = target[targetKey];
    }
};

function cherrypick(object, exclude, properties){
    if(!object || typeof object !== 'object') {
        return object;
    }

    if(typeof exclude !== 'boolean'){
        properties = exclude;
        exclude = false;
    }

    var result = exclude ? revive(object) : new object.constructor();

    if(properties == null){
        return result;
    }

    properties = ('' + properties).split(' ');

    for (var i = properties.length - 1; i >= 0; i--) {
        var path = properties[i],
            sourceAndTarget = getSourceAndTarget(path),
            source = sourceAndTarget[0],
            target = sourceAndTarget[1];

        if(exclude){
            remove(result, target);
        }else{
            set(result, target, get(object, source));
        }
    };

    return result;
}

module.exports = cherrypick;
