
const pool = require('./pool');

async function getAllFirearms(category = null, limit, offset) {
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
        const query = 'SELECT DISTINCT category FROM firearms ORDER BY category ASC';
        const { rows } = await pool.query(query);
        // console.log(rows);
        return rows;
    } catch (error) {
        console.error("Error fetching categories", error);
    }
}

async function updateCategory(prevCategory, newCategory) {
    try {
       if(prevCategory.length < 1 || newCategory.length < 1){
            throw Error("must contain letters");
        }
        const query = "UPDATE firearms SET category = $1 WHERE category = $2";
        const result = await pool.query(query, [newCategory,prevCategory]);
        
        return result.rowCount > 0;
        
    } catch (error) {
        console.error("Error updating category:", error.message);
    }
}


async function deleteCategory(category){
    try {
        const query = 'UPDATE firearms SET category = null WHERE category = $1';
        const result = await pool.query(query, [category]);

        console.log(result.rowCount > 0);
    } catch (error) {
        
    }
}

// deleteCategory("AirRifle");

module.exports = {
    getAllFirearms,
    getAllCategories,
    updateCategory
}