// const {Client} = require("pg");

// const SQL = 
// "CREATE TABLE IF NOT EXISTS "

const pool = require('./pool');



async function getAllFirearms(category = null,limit,offset) {
    try {
        const query = category
            ? 'SELECT * FROM firearms WHERE category = $1 LIMIT $2 OFFSET $3;'
            : 'SELECT * FROM firearms LIMIT $1 OFFSET $2;';
        const params = category ? [category, limit, offset] : [limit, offset];

        const { rows } = await pool.query(query, params);
        // console.log(rows);

        return { rows };
    } catch (error) {
        console.error('Error fetching firearms:', error);
    }
    // limit += 10
}
// getAllFirearms()
async function getAllCategories() {
    try {
        const query = 'SELECT DISTINCT category FROM firearms';
        const { rows } = await pool.query(query);
        // console.log(rows);
        return rows;
    } catch (error) {
        console.error("Error fetching categories", error);
    }
}


module.exports = {
    getAllFirearms,
    getAllCategories
}