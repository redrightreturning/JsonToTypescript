# JsonToTypescript
A little library for taking json and creating a Typescript interface file

## Intro
Json to Typescript is a small library of one function that takes complex nested json and creates an interface file. It was created when working with the Spotfy Web API that didn't have corresponding types. Although there is a third party repository of Spotify API types, I wanted a means to be able to solve this problem easily in the future.

## Usage
JsonToTypescript has one function ```jsonToInterface(json : JSON, name : string, path: string)```.

Params: 
  - ```json : JSON``` — The JSON being used as the template to create the interface
  - ```name : string``` — The name of the top level interface object. The other objects will get their name from the object key.
  - ```path : string``` — A path of where to save the interface file.

It is most likely you will call this function during the development stage and then not need to call it again. It is recommended that you remove it (after creating the interface) so that your program will fail efficiently if the structure of the JSON is ever changed.

## Future Roadmap
This was a tool used personally without much testing or rigor. Please feel free to use/extend/etc as you see fit. If there are any bugs feel free to file an issue or fix it and create a PR.

## License
This project is licensed under the MIT License Copyright (c) 2023.

See the [LICENSE](https://github.com/Elliot-KG/JsonToTypescript/blob/main/LICENSE) for information on the history of this software, terms & conditions for usage, and a DISCLAIMER OF ALL WARRANTIES.

All trademarks referenced herein are property of their respective holders.
