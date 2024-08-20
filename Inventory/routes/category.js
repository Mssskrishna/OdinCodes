const express = require('express')
const router = express.Router()
// const app = express();

const categoryController = require('../controllers/category')


router.get('/', categoryController.getCategories);

router.get('/update', categoryController.getUpdateCategory )

router.post('/update',categoryController.update)

// router.post('/delete',categoryController.deleteCategory)

module.exports = router;
