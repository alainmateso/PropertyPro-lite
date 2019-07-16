import { Pool } from 'pg';
import moment from 'moment';
import {
  dropPropertyTable,
  dropUserTable,
  createPropertyTable,
  createUserTable,
  addUser1,
  addUser2,
  addProperty1,
  addProperty2
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

const user1 = [
  'alain@propertyprolite.com',
  'Alain',
  'Mateso',
  'asdfghjkl',
  '123456789',
  'Kigali'
]

const user2 = [
  'person@example.com',
  'person',
  'personlast',
  '123abc',
  '0781111111',
  'Muhanga'
]

const property1 = [
  '1',
  'available',
  '2000000',
  'Rwanda',
  'Kigali',
  'KN 130 st',
  '2 bedroom',
  moment().format(),
  'http://res.cloudinary.com/codeal/image/upload/v1562438357/e99ook5kfpkrrtxva64p.jpg'
]
const property2 = [
  '1',
  'available',
  '1000000',
  'Uganda',
  'Kampala',
  '3 bedroom',
  '2 bedroom',
  moment().format(),
  'http://res.cloudinary.com/codeal/image/upload/v1562164635/sample.jpg'
]

export async function db_init() {
  await pool.query(dropPropertyTable);
  await pool.query(dropUserTable);
  await pool.query(createPropertyTable);
  await pool.query(createUserTable);
  await pool.query(addProperty1, property1);
  await pool.query(addProperty2, property2);
  await pool.query(addUser1, user1);
  await pool.query(addUser2, user2);
};

async function properties(req, res) {
  const { rows } = await pool.query('select * from properties')
  console.log(rows)
}
async function users(req, res) {
  const { rows } = await pool.query('select * from users')
  console.log(rows)
}

db_init()
properties()
users()