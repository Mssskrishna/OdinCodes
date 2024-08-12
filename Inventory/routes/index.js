var express = require('express');
var router = express.Router();

const catrouter = require("../controllers/firearms");

/* GET home page. */
router.get('/', catrouter.getAllCategories);


module.exports = router;
