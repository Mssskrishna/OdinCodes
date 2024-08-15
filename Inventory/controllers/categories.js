const db = require('../db/query');


async function getCategories(req, res, next) {
    const result = await db.getAllCategories();

    res.render("category", { categories: result, });
    // console.log(result)
}
module.exports = {
    getCategories
}