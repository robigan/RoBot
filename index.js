// JavaScript source code main entry point
//const Code = require("./Code.js");
const Gateway = require("./Gateway.js");

const Start = async (Class) => {
    new Class();
};

//Start(Code);
Start(Gateway);