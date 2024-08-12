const { Pool } = require('pg');


module.exports = new Pool({
    connectionString: "postgresql://mssskrishna:shanmukha@734@localhost:5432/prisma_play"
})
