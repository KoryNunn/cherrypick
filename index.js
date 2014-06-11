var matchTuple = /^(.*?)\:(.*?)$/,
    matchProp = /^([^.]*?)\.(.*?)$/,
    revive = require('statham/revive');

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
            property = tuple && tuple[2] || properties[i],
            deep = property.match(matchProp);

        if(deep){
            if(deep[1] in object){
                var value = cherrypick(object[deep[1]], exclude, deep[2]);
                if (value && typeof value === 'object') {
                    result[key || deep[1]] = value;
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
