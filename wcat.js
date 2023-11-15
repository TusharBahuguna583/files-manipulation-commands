#!/usr/bin/env node

let fs = require("fs");

// input
let inputArr = process.argv.slice(2);
// console.log(inputArr);

let optionArr = [];
let filesArr = [];

// identify options
for(let i=0;i<inputArr.length;i++){
    let firstChar = inputArr[i].charAt(0);
    if(firstChar == '-'){
        optionArr.push(inputArr[i]);
    }
    else{
        filesArr.push(inputArr[i]);
    }
}

// option check
let isBothPresent = optionArr.includes("-n") && optionArr.includes("-b");
if(isBothPresent){
    console.log("either use -n or -b");
    return;
}

// existence
for(let i =0;i<filesArr.length;i++){
    let isPresent = fs.existsSync(filesArr[i]);
    if(isPresent == false){
        console.log(`file ${filesArr[i]} does not exist`);
        return;
    }
}

// read
let content = "";
for(let i = 0; i<filesArr.length;i++){
    let bufferContent = fs.readFileSync(filesArr[i]);
    content += bufferContent+"\r\n";
}
let contentArr = content.split("\r\n");
console.log(contentArr);

// -s 
let isPresent = optionArr.includes("-s");
if(isPresent == true){
    for(let i=0;i<contentArr.length;i++){
        if(contentArr[i] == "" && contentArr[i-1] == ""){
            contentArr[i] = null;
        }
        else if(contentArr[i] == "" && contentArr[i-1] == null){
            contentArr[i] = null;
        }
    }
}
let tempArr = [];
for(let i =0;i<contentArr.length;i++){
    if(contentArr[i] != null){
        tempArr.push(contentArr[i]);
    }
}
contentArr = tempArr;
console.log("-----------------------");
// console.log(contentArr.join("\n"));

// -n
let isNPresent = optionArr.includes("-n");
if(isNPresent == true){
    for(let i =0;i<contentArr.length;i++){
        contentArr[i] = `${i+1} ${contentArr[i]}`;
    }
}
// console.log(contentArr.join("\n"));

//-b
let isBPresent = optionArr.includes("-b");
if(isBPresent == true){
    let counter = 1;
    for(let i =0;i<contentArr.length;i++){
        if(contentArr[i] != ""){
            contentArr[i] = `${counter} ${contentArr[i]}`;
            counter++;
        }
    }
}
console.log(contentArr.join("\n"));