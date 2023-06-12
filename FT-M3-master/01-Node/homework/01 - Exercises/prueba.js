let arr = [1, 2, 3, 4, 5];
console.log(arr);
arr = arr.join(" ");
console.log(arr);
function saludar(nombre) {
  return function (saludo) {
    return nombre + " " + saludo;
  };
}

const $david = saludar("David");
console.log($david("Hi!"));
