const process = require("process");
const { Z_ASCII } = require("zlib");
const commands = require("./commands/index.js");
// { }

function print(output) {
  process.stdout.write(output);
  process.stdout.write("\nprompt > ");
}

function bash() {
  process.stdout.write("prompt > ");
  process.stdin.on("data", (data) => {
    let args = data.toString().trim().split(" ");
    // args -> "hola como estas".split(" ")
    // ["hola", "como", "estas"]
    const cmd = args.shift();
    //"echo hola" -> "echo" ->
    // command -> { echo, pwd}
    args = args.join(" ");
    commands[cmd]
      ? commands[cmd](print, args)
      : print(`command not found: ${cmd}`);
  });
}

bash();

module.exports = {
  print,
  bash,
};
