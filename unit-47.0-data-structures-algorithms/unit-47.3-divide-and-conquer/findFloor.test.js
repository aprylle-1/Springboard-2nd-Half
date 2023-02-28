const findFloor = require('./findFloor')

describe('#findFloor', () => {
    test('it is a function', () => {
      expect(typeof findFloor).toBe('function');
})});

describe ('#works', ()=>{
    test('it should work', ()=>{
        expect(findFloor([1,2,8,10,10,12,19], 9)).toBe(8)
        expect(findFloor([1,2,8,10,10,12,19], 20)).toBe(19)
        expect(findFloor([1,2,8,10,10,12,19], 0)).toBe(-1)
    })
})