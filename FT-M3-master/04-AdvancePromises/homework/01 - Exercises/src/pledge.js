"use strict";
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// TU CÓDIGO AQUÍ:
class $Promise {
  constructor(executor) {
    if (typeof executor !== "function")
      throw new TypeError("Executor must be a function");
    this._state = "pending";
    this._value = undefined;
    this._handlerGroups = [];
    const resolve = (value) => {
      this._internalResolve(value);
    };
    const reject = (reason) => {
      this._internalReject(reason);
    };

    executor(resolve, reject);
  }
  _internalResolve(data) {
    if (this._state !== "pending") return;
    this._state = "fulfilled";
    this._value = data;
    this._callHanlder(this._value);
  }

  _internalReject(reason) {
    if (this._state !== "pending") return;
    this._state = "rejected";
    this._value = reason;
    this._callHanlder(this._value);
  }

  then(successCb, errorCb) {
    // successCb => () -> {}
    const handlerGroup = {
      successCb: typeof successCb === "function" ? successCb : false,
      errorCb: typeof errorCb === "function" ? errorCb : false,
    };
    this._handlerGroups.push(handlerGroup);
    this._state !== "pending" && this._callHanlder(this._value);
  }
  _callHanlder(value) {
    while (this._handlerGroups.length) {
      const currentHandler = this._handlerGroups.shift();
      this._state === "fulfilled" &&
        currentHandler.successCb &&
        currentHandler.successCb(value);
      this._state === "rejected" &&
        currentHandler.errorCb &&
        currentHandler.errorCb(value);
    }
  }
  catch(errorCb) {
    return this.then(null, errorCb);
  }
}

// [pr1, pr2, pr3] -> Queue
// promise.then(success, error).

// promise.then(s,e)

/* function $Promise() {
    this._state = "";
    this._internalResolve = this._internalResolve.bind(this)
}

$Promise.prototype._internalResolve = function () {
  this.saludar = () => {};
}; */
function suma() {}
const promise = new $Promise(suma);
// $Promise { _state=""   }
promise;

module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
