'use strict'

const arrayLibES6 = {};

arrayLibES6.take = (array, n) => array.slice(0, n);

arrayLibES6.skip = (array, n) => array.slice(n, array.length);

arrayLibES6.foreach = (array, callback) => {
  for (let i = 0; i < array.length; i++) {
    callback(array[i]);
  }
};

arrayLibES6.map = (array, callback) => {
  const resultArray = []; 
  arrayLibES6.foreach(array, item => {
      resultArray.push(callback(item))
  });
  return resultArray;
};

arrayLibES6.reduce = (array, callback, initialValue) => {
  let resultValue = initialValue;
  arrayLibES6.foreach(array, (item) => {
    resultValue = callback(resultValue, item);
  });
  return resultValue;
};

arrayLibES6.filter = (array, callback) => {
  const resultArray = [];
  arrayLibES6.foreach(array, item => {
    if (callback(item)) {
      resultArray.push(item);
    }
  });
  return resultArray;
};

arrayLibES6.chain = array => {
  return {
    take(n) {
      array = arrayLibES6.take(array, n);
      return this;
    },
    
    skip(n) {
      array = arrayLibES6.skip(array, n);
      return this; 
    },

    map(callback) {
      array = arrayLibES6.map(array, callback);
      return this;
    },
   
    filter(callback) {
      array = arrayLibES6.filter(array, callback);
      return this;
    },

    foreach(callback) {
        arrayLibES6.foreach(array, callback);
        return this;
    },

    reduce(callback, initialValue) {
      return arrayLibES6.reduce(array, callback, initialValue);
    },

    value() {
      return array;
    }
  }
};

arrayLibES6.sum = memo(array => arrayLibES6.reduce(array, (total, item) => total + item, 0));

function memo(func) {
  const memorized = {};
  return function(...args) {
    const key = JSON.stringify(args);
    if (key in memorized) {
      const value = memorized[key];
      console.log(`Value for ${args} was memorized: ${value}`);
      return value;
    } else {
      const value = func(...args);
      console.log(`Computed value for ${args} is: ${value}`)
      memorized[key] = value;
      return value;
    }
  };
}