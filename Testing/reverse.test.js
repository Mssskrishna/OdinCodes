const reverse = require('./reverse')

test('reverse a string', () => {
    expect(reverse("123")).toBe("321")
})

test('reverse a string',()=>{
    expect(reverse("1")).toBe("1")
})