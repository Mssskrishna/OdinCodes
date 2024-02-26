const analyze = require('./analyze')

test("check array",()=>{
    expect(analyze([1,2,3])).toMatchObject({"average":2})
})
test("check array",()=>{
    expect(analyze([1,2,3])).toStrictEqual({"average":2,"maxi":3,"mini":1,"length":3})
})
