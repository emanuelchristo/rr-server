require('dotenv').config()
const pg = require('pg')
// const pool = new pg.Pool({
// 	user: 'ufgmxzmdkpknnk',
// 	password: 'f10162ba59a432071c28abc832c290c08f4ed54c10f77a3d638a7e48bbc046fe',
// 	database: 'deifgqvhotvbog',
// 	host: 'ec2-54-173-138-144.compute-1.amazonaws.com',
// 	port: 5432,
// })

// var conString = "postgres://YourUserName:YourPassword@localhost:5432/YourDatabase";

const client = new pg.Client({
	connectionString: process.env.DATABASE_URL,
	ssl: { rejectUnauthorized: false },
})

client
	.connect()
	.then((res) => console.log(res))
	.catch((err) => console.log(err))

module.exports = client
