import { arrayLibES6 } from "../array-lib-es6.js";

const assert = chai.assert;

describe('ArrayLibrary tests', () => {
  describe('#take(array, n)', () => {
    it('should return first 4 elements from the array', () => {
        assert.deepEqual(arrayLibES6.take([1, 2, 3, 4, 5, 6], 4), [1, 2, 3, 4]);
    });
    it('should return first 3 elements from the array with 3 elements when asking for 5 elements', () => {
        assert.deepEqual(arrayLibES6.take([1, 2, 3], 5), [1, 2, 3]);
    });
    it('should return an empty array from the empty array when asking for 5 elements', () => {
        assert.deepEqual(arrayLibES6.take([], 5), []);
    });
  });
  describe('#skip(array, n)', () => {
    it('should return last 3 elements from the array', () => {
        assert.deepEqual(arrayLibES6.skip([1, 2, 3, 4, 5, 6], 3), [4, 5, 6]);
    });
    it('should return an empty array from the array with 2 elements when asking for 5 elements', () => {
        assert.deepEqual(arrayLibES6.skip([1, 2], 5), []);
    });
  });
  describe('#map(array, callback)', () => {
    it('should return an array of squared values', () => {
        assert.deepEqual(arrayLibES6.map([1, 2, 3, 4], x => x ** 2), [1, 4, 9, 16]);
    });
  });
  describe('#reduce(array, callback, initialValue)', () => {
    it('should return the sum of values in the array', () => {
        assert.equal(arrayLibES6.reduce([1, 2, 3, 4], (a, b) => a + b, 0), 10);
    });
  });
  describe('#filter(array, callback)', () => {
    it('should return only even numbers', () => {
        assert.deepEqual(arrayLibES6.filter([1, 2, 3, 4, 5, 6], a => a % 2 == 0), [2, 4, 6]);
    });
  });
  describe('#foreach(array, callback)', () => {
    it('should append all values plus 2 to the new array', () => {
      const arrayToAppend = [];

      arrayLibES6.foreach([1, 2, 3, 4], x => {
        arrayToAppend.push(x + 2);
      });

      assert.deepEqual(arrayToAppend, [3, 4, 5, 6]);
    });
  });
  describe('#chain(array)', () => {
    it('take 2 elements than skip one', () => {
      assert.deepEqual(arrayLibES6.chain([1, 2, 3]).take(2).skip(1).value(), [2]);
    });
    it('map to squared elements, than filter even and take 2 elements', () => {
      assert.deepEqual(arrayLibES6.chain([1, 2, 3, 4, 5, 6, 7, 8])
        .map(x => x ** 2)
        .filter(x => x % 2 == 0)
        .take(2)
        .value(), [4, 16]);
    });
    it('filter eneven elements, than multiply them using reduce', () => {
      assert.equal(arrayLibES6.chain([1, 2, 3, 4, 5, 6])
        .filter(x => x % 2 != 0)
        .reduce((a, b) => a * b, 1), 15);
    });
  });
  describe('#sum(array)', () => {
    it('sum elements of the cached array', () => {
      const a = [1, 2, 3, 4, 5];
      arrayLibES6.sum(a);

      const spy = sinon.spy(console, 'log');
      arrayLibES6.sum(a);
      assert.isTrue(spy.calledWithMatch('was memorized'));
      spy.restore();
    });
    it('sum elements of non cached array', () => {
        arrayLibES6.sum([1, 2, 3, 4, 5]);
  
        const spy = sinon.spy(console, 'log');
        arrayLibES6.sum([1, 5, 25]);
        assert.isTrue(spy.calledWithMatch('Computed value'));
        spy.restore();
      });
  });
});