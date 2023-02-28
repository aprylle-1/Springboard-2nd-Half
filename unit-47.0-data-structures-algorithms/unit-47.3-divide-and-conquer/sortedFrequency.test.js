const sortedFrequency = require('./sortedFrequency')

describe('#sortedFrequency', () => {
    test('it is a function', () => {
      expect(typeof sortedFrequency).toBe('function');
})});

describe ('#works', ()=>{
    test('it should work for sorted arrays', ()=>{
        expect(sortedFrequency([1,1,2,2,2,2,3],2)).toBe(4)
        expect(sortedFrequency([1,1,2,2,2,2,3],3)).toBe(1)
        expect(sortedFrequency([1,1,2,2,2,2,3],1)).toBe(2)
        expect(sortedFrequency([1,1,2,2,2,2,3],4)).toBe(-1)
    })
})