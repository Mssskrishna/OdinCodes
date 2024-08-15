const db = require('../db/query')

async function getFirearms(req,res,next){
    const limit = parseInt(req.query.limit) || 12;
    const offset = parseInt(req.query.offset) || 0;
    // console.log(limit,offset)
    const { rows } = await db.getAllFirearms(null,limit,offset)
    // console.log(rows)
    res.render('firearm',{result:rows})
}
// getFirearms()
async function getFirearmsLmit(req,res,next){
    const limit = parseInt(req.query.limit) || 12;
    const offset = parseInt(req.query.offset) || 0;
    // console.log(limit,offset)
    const { rows } = await db.getAllFirearms(null,limit,offset)
    return res.json(rows)
}
module.exports = {
    getFirearms,
    getFirearmsLmit
}