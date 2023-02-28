const findRotatedIndex = require('./findRotatedIndex')

describe('#findRotatedIndex', () => {
    test('it is a function', () => {
      expect(typeof findRotatedIndex).toBe('function');
})});

describe ('#works', ()=>{
    test('it should work', ()=>{
        expect(findRotatedIndex([3,4,1,2],4)).toBe(1)
        expect(findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 8)).toBe(2)
        expect(findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 3)).toBe(6)
        expect(findRotatedIndex([37,44,66,102,10,22],14)).toBe(-1)
        expect(findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 12)).toBe(-1)
    })
})