var matchTuple = /^(.*?)\:(.*?)$/,
    matchKey = /^(?:[^\\.]|\\.)*/,
    merge = require('flat-merge'),
    revive = require('statham/revive');

function getKeyAndRest(path){
    var match = path.match(matchKey),
        key = match && match[0].replace(/\\(.)/g, function(match){
            return match.slice(1);
        }), 
        rest = match && path.slice(match[0].length + 1);

    return [key, rest];
}

function cherrypick(object, exclude, properties){
    if(!object || typeof object !== 'object') {
        return object;
    }
    if(typeof exclude !== 'boolean'){
        properties = exclude;
        exclude = false;
    }

    typeof properties === 'string' && (properties = properties.split(' '));

    var result;

    if(exclude){
        result = revive(object);
    }else{
        result = {};
    }

    for(var i = 0; i < properties.length; i++){
        var tuple = properties[i].match(matchTuple),
            key = tuple && tuple[1] || null,
            keyAndRest = getKeyAndRest(tuple && tuple[2] || properties[i]),
            property = keyAndRest[0],
            rest = keyAndRest[1];

        if(rest){
            if(property in object){
                var value = cherrypick(exclude && result[property] || object[property], exclude, rest);
                if (value && typeof value === 'object') {
                    result[key || property] = exclude ? value : merge(result[key || property], value);
                }
            }
        }else{
            if(exclude){
                delete result[property];
            }else{
                if(property in object){
                    result[key || property] = object[property];
                }
            }
        }
    }

    return result;
}

module.exports = cherrypick;
