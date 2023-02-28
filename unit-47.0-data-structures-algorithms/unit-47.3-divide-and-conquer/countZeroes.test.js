const countZeroes = require('./countZeroes')

describe('#countZeories', () => {
    test('it is a function', () => {
      expect(typeof countZeroes).toBe('function');
})});

describe ('#works', ()=>{
    test('it should work when array has a mix of 1s and 0s', ()=>{
        expect(countZeroes([1,1,1,1,0,0])).toBe(2)
        expect(countZeroes([1,0,0,0,0])).toBe(4)
    })

    test('it should work when array has all 0s', ()=>{
        expect(countZeroes([0,0,0])).toBe(3)
    })

    test('it should work when array has all 1s', ()=>{
        expect(countZeroes([1,1,1,1])).toBe(0)
    })
})