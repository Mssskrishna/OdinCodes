const db = require('../db/query')

async function getFirearms(req,res,next){
    const limit = parseInt(req.query.limit) || 12;
    const offset = parseInt(req.query.offset) || 0;
    const category = req.query.category || null;
    // console.log(limit,offset)
    console.log(category)
    const { rows } = await db.getAllFirearms(category,limit,offset)
    // console.log(rows)
    res.render('firearm',{result:rows})
}
// getFirearms()
async function getFirearmsLmit(req,res,next){
    const limit = parseInt(req.query.limit) || 12;
    const offset = parseInt(req.query.offset) || 0;
    const category = req.query.category || null;
    // console.log(limit,offset,category)
    const { rows } = await db.getAllFirearms(category,limit,offset)
    return res.json(rows)
}
module.exports = {
    getFirearms,
    getFirearmsLmit
}