
export const createPropertyTable = `CREATE TABLE IF NOT EXISTS properties(
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
export const createUserTable = `CREATE TABLE IF NOT EXISTS 
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
export const addUser1 = `INSERT INTO users(email, first_name, last_name, password, phoneNumber, address) values($1, $2, $3, $4, $5, $6)`;
export const addUser2 = `INSERT INTO users(email, first_name, last_name, password, phoneNumber, address) values($1, $2, $3, $4, $5, $6)`;
export const addProperty1 = `INSERT INTO properties (owner, status, price, state, city, address, type, created_on, image_url) values($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
export const addProperty2 = `INSERT INTO properties (owner, status, price, state, city, address, type, created_on, image_url) values($1, $2, $3, $4, $5, $6, $7, $8, $9)`;


export const dropPropertyTable = `DROP TABLE IF EXISTS properties`;
export const dropUserTable = `DROP TABLE IF EXISTS users`;