const capitaliz = require('./capitalize.js');

test('Capitalize first word',()=>{
    expect(capitaliz("shanmukh")).toBe("Shanmukh");
})
test('Capitalize first word',()=>{
    expect(capitaliz("A")).toBe("A");
})

test('Capitalize first word',()=>{
    expect(capitaliz("angular is framework")).toBe("Angular is framework");
})

