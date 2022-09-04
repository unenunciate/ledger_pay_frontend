const makeUpdatable = (toMakeUpdatable, model) => {
    switch(typeof toMakeUpdatable) {
        case Array:
            if(model) {
                return Array(toMakeUpdatable).forEach(element => {
                    return makeModeledObjectUpdatable(element, model);
                });
            } else {
                return Array(toMakeUpdatable).forEach(element => {
                    return makePrimaitveUpdatable(element);
                });
            }
        case Object:
            if(model) {
                return makeModeledObjectUpdatable(element, model);
            } else {
                return Array(Object(toMakeUpdatable).values).forEach(() => makePrimaitveUpdatable(toMakeUpdatable));
            }
        case Default:
            makePrimaitveUpdatable(toMakeUpdatable)
            return;
    }
}

const makeModeledObjectUpdatable = (toMakeUpdatable, model) => {

}

const makePrimaitveUpdatable = (toMakeUpdatable) => {

}

export {
    makeUpdatable
}
