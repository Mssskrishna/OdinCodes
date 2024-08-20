var express = require('express');
var router = express.Router();

const firerouter = require('../controllers/firearms')
/* GET home page. */
// router.get('/', catrouter.getAllCategories);

router.get('/', firerouter.getFirearms)
router.get('/firearm', firerouter.getFirearmsLmit);

// router.get('/newCategory',catrouter.updateCategory);

module.exports = router;
