const fs = require('fs');
export default function jsonToInterface(json, name, path) {
    //Holds the different object interfaces
    let objects = [];
    const parse = (data, key) => {
        let inter = "";
        if (data !== Object(data)) { //Check if primitive
            inter += `  ${key} : ${type(data, key)}\n`;
        }
        else if (data instanceof Array) {
            //For the interface we only need the first element in the array
            let firstObject = data[0];
            inter += `  ${key} : Array<${type(firstObject, key)}>\n`;
            parse(firstObject, key);
        }
        else { //It's an object
            inter += `  ${key} : ${type(data, key)}\n`;
            objects.push(parseObject(data, key));
        }
        return inter;
    };
    const type = (data, key) => {
        if (data !== Object(data)) { //Check if primitive
            return `${typeof data}`;
        }
        else { //It's an object
            return `${capFirstLetter(key)}Type`;
        }
    };
    const parseObject = (data, objName) => {
        let inter = `export interface ${capFirstLetter(objName)}Type{\n`;
        for (let key in data) {
            inter += parse(data[key], key);
        }
        inter += "}";
        return inter;
    };
    //Add the first object to the structure
    objects.push(parseObject(json, name));
    //Remove duplicates
    objects = [...new Set(objects)];
    //Piece all the text together
    let overall = "";
    //For each object in the json
    //Add them in backwards order to preserve json hierarchy
    for (let i = (objects.length - 1); i >= 0; i -= 1) {
        overall += objects[i] + "\n\n";
    }
    //Save the object structure to a file
    saveInterfaceFile(path, name, overall);
}
function saveInterfaceFile(path, name, text) {
    fs.writeFile(`${path}${name}.interface.ts`, text, (err) => {
        if (err) {
            return console.log("Error: " + err);
        }
        console.log(`The interface file, ${name}, was saved!`);
    });
}
function capFirstLetter(string) {
    if (string.length >= 2) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    else if (string.length == 1) {
        return string.charAt(0).toUpperCase();
    }
    else {
        return "";
    }
}
