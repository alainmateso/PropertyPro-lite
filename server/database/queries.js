
const createPropertyTable = `CREATE TABLE IF NOT EXISTS properties(
         id SERIAL PRIMARY KEY,
         owner INTEGER,
         status TEXT,
         price INTEGER NOT NULL,
         state VARCHAR (255) NOT NULL,
         city VARCHAR (255) NOT NULL,
         address VARCHAR (255) NOT NULL,
         type VARCHAR (255) NOT NULL,
          created_on TIMESTAMP,
         image_url TEXT
       )`;
const createUserTable = `CREATE TABLE IF NOT EXISTS 
users(
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL,
  phoneNumber VARCHAR(50) NOT NULL,
  address VARCHAR(255) NOT NULL,
  is_admin BOOLEAN NOT NULL DEFAULT false
)`;

const dropPropertyTable = `DROP TABLE IF EXISTS properties`;
const dropUserTable = `DROP TABLE IF EXISTS users`;

const getProperties = `SELECT * FROM properties`;
const getSpecificType = `SELECT * FROM properties WHERE type = $1`;
const createUserAccount = `INSERT INTO users (email, first_name, last_name, password, phoneNumber, address) values($1, $2, $3, $4, $5, $6) RETURNING *; `;
const loginUser = `SELECT * FROM users WHERE email = $1 AND password = $2`;

export default {
  createPropertyTable,
  createUserTable,
  dropPropertyTable,
  dropUserTable,
  getProperties,
  getSpecificType,
  createUserAccount,
  loginUser
}