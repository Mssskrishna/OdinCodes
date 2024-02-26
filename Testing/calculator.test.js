const calculator = require('./calculator')

test('add 1 and 2',()=>{
    expect(calculator.add(1,2)).toBe(3);
})

test('subtract 1 and 2',()=>{
    expect(calculator.subtract(1,2)).toBe(-1);
})
test('multiply 1 and 2',()=>{
    expect(calculator.multiply(1,2)).toBe(2);
})
test('division 1 and 2',()=>{
    expect(calculator.division(1,2)).toBe(0.5);
})

