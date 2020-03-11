'use strict'

class ArrayLibES6 {

  take(array, n) {
    return array.slice(0, n);
  }

  skip(array, n) {
    return array.slice(n, array.length);
  }

  foreach(array, callback) {
    for (let i = 0; i < array.length; i++) {
      callback(array[i]);
    }
  }

  map(array, callback) {
    const resultArray = []; 
    this.foreach(array, item => {
        resultArray.push(callback(item))
    });
    return resultArray;
  }
 
  reduce(array, callback, initialValue) {
    let resultValue = initialValue;
    this.foreach(array, (item) => {
      resultValue = callback(resultValue, item);
    });
    return resultValue;
  }

  filter(array, callback) {
    const resultArray = [];
    this.foreach(array, item => {
      if (callback(item)) {
        resultArray.push(item);
      }
    });
    return resultArray;
  }

  chain(array) {
    const lib = this;
    return {
      take(n) {
        array = lib.take(array, n);
        return this;
      },
        
      skip(n) {
        array = lib.skip(array, n);
        return this; 
      },
  
      map(callback) {
        array = lib.map(array, callback);
        return this;
      },
     
      filter(callback) {
        array = lib.filter(array, callback);
        return this;
      },
  
      foreach(callback) {
        lib.foreach(array, callback);
          return this;
      },
  
      reduce(callback, initialValue) {
        return lib.reduce(array, callback, initialValue);
      },
  
      value() {
        return array;
      }
    }
  }

  sum = ArrayLibES6.memo(array => this.reduce(array, (total, item) => total + item, 0));

  static memo(func) {
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
}

export const arrayLibES6 = new ArrayLibES6();
