const caeser = require('./caeser')

test("shift 3 bits",()=>{
    expect(caeser("abcd",3)).toBe("defg")
})
test("shift 26 bits",()=>{
    expect(caeser("abcd",26)).toBe("abcd")
})
test("leave punctuation",()=>{
    expect(caeser("abcd!",26)).toBe("abcd!")
})
test("upper and lower and  punctuation",()=>{
    expect(caeser("Abcd!",26)).toBe("Abcd!")
})

test("upper and lower and  punctuation",()=>{
    expect(caeser("Abcdff!",26)).toBe("Abcdff!")
})
test("upper and lower and  punctuation",()=>{
    expect(caeser("abcd!",13)).toBe("nopq!")
})
