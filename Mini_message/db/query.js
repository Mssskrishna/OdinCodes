const pool = require('./pool')

async function getAllMessages(){
    const {rows} = await pool.query('SELECT * from messages');
    console.log(rows)
    return rows;
    // return JSON.parse(results);
}

async function insertMessage(text, username){
    try {
        console.log(new Date().toISOString().split('T')[0]);
        await pool.query('INSERT INTO messages (text,username,added) VALUES ($1,$2,$3)',[text,username,new Date().toISOString().split('T')[0]])
    } catch (error) {
        console.error('error in inserting data',error)
    }

}

module.exports = {
    getAllMessages,
    insertMessage
}