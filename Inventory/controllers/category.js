const db = require('../db/query');
const { body, validationResult } = require('express-validator')


const validateNewCategory = [
    body("new_category").trim().isLength({ min: 1 }).withMessage("Category atleast contain one letter")
]

exports.getUpdateCategory = (req, res) => {
    const category = req.query.category;

    res.render('categoryform', { category: category, errors: {} })
}

exports.getCategories = async (req, res, next) => {
    const result = await db.getAllCategories();

    res.render("category", { categories: result, });
}
exports.update = [
    validateNewCategory,
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.redirect('/category/update', { errors: errors })
        }
        const prevCategory = req.body.previouscat;
        const newCategory = req.body.new_category;
        const result = await db.updateCategory(prevCategory, newCategory)
        console.log(result)
        res.redirect('/category')
    }

]

// exports.deleteCategory = async(req,res,next)=>{
//     const result = await db.deleteCategory(categoryName);

// }