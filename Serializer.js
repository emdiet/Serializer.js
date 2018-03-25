class Serializer{
    /**
     * Construct with an array of classes, e.g. [Circle, Rectangle, Dog].
     * These classes need to be able to handle an empty constructor.
     * @param types {Function[]}
     */
    constructor(types){
        this.types = types;
    }

    /**
     * Takes object of a type defined in the constructor.
     * @param object {Object}
     */
    serialize(object) {
        let idx = this.types.findIndex((e)=> {
            return e.name == object.constructor.name
        });
        if (idx == -1) throw "type  '" + object.constructor.name + "' not initialized";
        return JSON.stringify([idx, Object.entries(object)]);
    }

    /**
     * Takes string produced by this serialize()
     * @param jstring {string}
     */
    deserialize(jstring) {
        let array = JSON.parse(jstring);
        let type = this.types[array[0]];
        let object = new type();
        array[1].map(e=>{
            object[e[0]] = e[1];
        });
        return object;
    }
}
