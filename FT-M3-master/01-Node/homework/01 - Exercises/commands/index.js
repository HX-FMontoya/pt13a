const fs = require("fs");
const utils = require("../utils/request");
const process = require("process");

function pwd(print) {
  print(process.cwd());
}

function date(print) {
  print(Date());
}

function echo(print, args) {
  print(args);
}

function ls(print) {
  fs.readdir(".", (error, files) => {
    if (error) throw Error(error);
    // ["prueba", "index"]
    print(files.join(" "));
    // "prueba index"
  });
}

function cat(print, args) {
  fs.readFile(args, "utf-8", (error, data) => {
    if (error) throw Error(error);
    print(data);
  });
}

function head(print, args) {
  fs.readFile(args, "utf-8", (error, data) => {
    if (error) throw Error(error);
    print(data.split("\n")[0]);
  });
}

function tail(print, args) {
  fs.readFile(args, "utf-8", (error, data) => {
    if (error) throw Error(error);
    // data && print(data.split("\n").at(-1).split(" ").join(""));
    // print(data.split("\n").at(-1).trim());
    // print(data.split("\n").join(" ").at(-1));
    print(data.split("\n").at(-1));
  });
}

function curl(print, args) {
  utils.request(args, (error, response) => {
    if (error) throw Error(error);
    print(response);
  });
}

module.exports = { pwd, date, echo, ls, cat, head, tail, curl };
