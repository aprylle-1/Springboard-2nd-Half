const findRotationCount = require('./findRotationCount')

describe('#findRotationCount', () => {
    test('it is a function', () => {
      expect(typeof findRotationCount).toBe('function');
})});

describe ('#works', ()=>{
    test('it should work', ()=>{
        expect(findRotationCount([15, 18, 2, 3, 6, 12])).toBe(2)
        expect(findRotationCount([7, 9, 11, 12, 5])).toBe(4)
        expect(findRotationCount([7, 9, 11, 12, 15])).toBe(0)
    })
})