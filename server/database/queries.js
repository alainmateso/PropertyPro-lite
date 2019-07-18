
const createPropertyTable = `CREATE TABLE IF NOT EXISTS properties(
         id SERIAL PRIMARY KEY,
         owner INTEGER,
         status TEXT DEFAULT 'available',
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
const createUserAdmin = `INSERT INTO users (email, first_name, last_name, password, phoneNumber, address, is_admin) values($1, $2, $3, $4, $5, $6, $7) RETURNING *; `;
const loginUser = `SELECT * FROM users WHERE email = $1 AND password = $2`;
const getSpecificProperty = `SELECT * FROM properties WHERE id = $1`;
const postNewProperty = `INSERT INTO properties (owner, price, state, city, address, type, created_on, image_url) values($1, $2 , $3, $4, $5, $6, $7, $8) RETURNING *`;
const markPropertyAsSold = `UPDATE properties SET status = 'sold' WHERE id = $1 RETURNING *`;
const deleteProperty = `DELETE FROM properties where id = $1`;
const updatePropertyDetails = `UPDATE properties SET price = $1, state = $2, city = $3, address = $4, type = $5 where id = $6 RETURNING *`;

export default {
  createPropertyTable,
  createUserTable,
  dropPropertyTable,
  dropUserTable,
  getProperties,
  getSpecificType,
  createUserAccount,
  createUserAdmin,
  loginUser,
  getSpecificProperty,
  postNewProperty,
  markPropertyAsSold,
  deleteProperty,
  updatePropertyDetails
}