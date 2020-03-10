'use strict'

var arrayLibES5 = {};

arrayLibES5.take = function(array, n) {
  return array.slice(0, n);
};

arrayLibES5.skip = function(array, n) {
  return array.slice(n, array.length);
};

arrayLibES5.foreach = function(array, callback) {
    for (var i = 0; i < array.length; i++) {
      callback(array[i]);
    }
};

arrayLibES5.map = function(array, callback) {
  var resultArray = []; 
  arrayLibES5.foreach(array, function(item) {
    resultArray.push(callback(item));
  });
  return resultArray;
};

arrayLibES5.reduce = function(array, callback, initialValue) {
  var resultValue = initialValue;
  arrayLibES5.foreach(array, function(item) {
    resultValue = callback(resultValue, item);
  });
  return resultValue;
};

arrayLibES5.filter = function(array, callback) {
  var resultArray = [];
  arrayLibES5.foreach(array, function(item) {
    if (callback(item)) {
      resultArray.push(item);
    }
  });
  return resultArray;
};

arrayLibES5.chain = function(array) {
  var chainArray = {
    take(n) {
      array = arrayLibES5.take(array, n);
      return this;
    },
    
    skip(n) {
      array = arrayLibES5.skip(array, n);
      return this; 
    },

    map(callback) {
      array = arrayLibES5.map(array, callback);
      return this;
    },
   
    filter(callback) {
      array = arrayLibES5.filter(array, callback);
      return this;
    },

    foreach(callback) {
        arrayLibES5.foreach(array, callback);
        return this;
    },

    reduce(callback, initialValue) {
      return arrayLibES5.reduce(array, callback, initialValue);
    },

    value() {
      return array;
    }
  }

  return chainArray;
};
