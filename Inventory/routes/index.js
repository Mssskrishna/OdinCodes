var express = require('express');
var router = express.Router();

const catrouter = require("../controllers/categories");
const firerouter = require('../controllers/firearms')
/* GET home page. */
// router.get('/', catrouter.getAllCategories);

router.get('/category',catrouter.getCategories);
router.get('/firearms',firerouter.getFirearms)
router.get('/firearm',firerouter.getFirearmsLmit)
// router.get('/newCategory',catrouter.updateCategory);

module.exports = router;
