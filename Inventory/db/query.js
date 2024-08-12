// const {Client} = require("pg");

// const SQL = 
// "CREATE TABLE IF NOT EXISTS "

const pool = require('./pool');

// const db = new 
async function getAllFirearms(category = null) {
    try {
        const query = category
            ? 'SELECT * FROM firearms WHERE category = $1;'
            : 'SELECT * FROM firearms;';
        const params = category ? [category] : [];

        const { rows } = await pool.query(query, params);
        // console.log(rows);
        return rows;
    } catch (error) {
        console.error('Error fetching firearms:', error);
    } 
}

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
// getAllCategories();
// getAllFirearms()
module.exports = {
    getAllFirearms,
    getAllCategories
}