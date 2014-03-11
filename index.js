function cherrypick(object, exclude, properties){
    if(typeof exclude !== 'boolean'){
        properties = exclude;
        exclude = false;
    }

    typeof properties === 'string' && (properties = properties.split(' '));

    var result = {};

    for(var key in object){
        if(~properties.indexOf(key) ? !exclude : exclude){
            result[key] = object[key];
        }
    }

    return result;
}

module.exports = cherrypick;