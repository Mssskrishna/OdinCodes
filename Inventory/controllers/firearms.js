const db = require('../db/query');

// async function getAllFirearms(res, req, next) {
//     const 
// }

async function getAllCategories(req, res, next) {
    const result = await db.getAllCategories();
    console.log(result);
    res.render("index", { categories: result });
}
// getAllCategories()

module.exports = {
    getAllCategories
}