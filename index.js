var matchProp = /^([^.]*?)\.(.*?)$/,
    revive = require('statham/revive');

function cherrypick(object, exclude, properties){
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
        var property = properties[i],
            deep = property.match(matchProp);

        if(deep){
            if(deep[1] in object){
                result[deep[1]] = cherrypick(object[deep[1]], exclude, deep[2]);
            }
        }else{
            if(exclude){
                delete result[property];
            }else{
                if(property in object){
                    result[property] = object[property];
                }
            }
        }
    }

    return result;
}

module.exports = cherrypick;