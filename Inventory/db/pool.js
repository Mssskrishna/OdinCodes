const { Pool } = require("pg");
// const doenv = require("dotenv")
require("dotenv").config()
// console.log(process.env.DATABASE_URL)
module.exports = new Pool({
    connectionString: "postgresql://mssskrishna:shanmukha@734@localhost:5432/inventory"
})