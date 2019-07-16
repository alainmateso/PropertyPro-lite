import { Pool } from 'pg';
import moment from 'moment';
import {
  dropPropertyTable,
  dropUserTable,
  createPropertyTable,
  createUserTable,
  addProperty,
  addUser
} from '../database/queries';

require('dotenv').config();
const { user, host, database, password, port } = process.env;

const pool = new Pool({
  user: user,
  host: host,
  database, database,
  password: password,
  port: port
});

pool.connect(() => console.log('Connected to the database....'));

export async function db_init() {
  await pool.query(dropPropertyTable);
  await pool.query(dropUserTable);
  await pool.query(createPropertyTable);
  await pool.query(createUserTable);
};
db_init()