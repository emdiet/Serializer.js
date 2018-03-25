# Serializer.js
Serialize and deserialize  instantiated ES6 class objects.
You must define in the constructor which classes can be serialized and deserialized

## Usage

The Serializer cannot handle objects containing fields that contain Function types (functions, classes or lambdas) 
(prototypes work fine!), meaning the serializer cannot serialize itself. 

A normal classes should work though.

The deserializer is only guaranteed to deliver the same results if it is initialized the same way as the serializer.

### Constructor `Function[]`

Constructor argument is a single array containing allowed classes. Example:

```javascript
let serializer = new Serializer([Circle, Rectangle, Dog]);
```

### Serialize `Object -> string`

simply give the object as argument, get a string

```javascript
let chappie = new Dog("who is a good boy");
serializer.serialize(chappie);
// e.g: "[2,[["who is a good boy",3]]]"
```

### Deserialize `string -> Object`

Use the string given by the serializer. The deserializer will reconstruct the class object with all the related methods.

```javascript
let doggo = serializer.deserialize('[2,[["who is a good boy",3]]]');
doggo.woof();
// "who is a good boy"
```

### Serializer.fields `: Function[]`

This array contains the class types from the constructor. You can add additional classes with `.fields.push(class)` at runtime

*DO NOT* alter, pop, shift or unshift the array during runtime, or `deserialize` might no longer work

## Example

```javascript
class Dog{
    constructor(call){this.call = call;}
    bark(){return this.call;}
}

let serializer = new Serializer([Dog]);
let chappie = new Dog("who is a good boy");
let str = serializer.serialize(chappie);
console.log(str);
let obj = serializer.deserialize(str);
console.log(obj.bark());
```
