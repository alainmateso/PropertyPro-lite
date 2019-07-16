import { Pool } from 'pg';
require('dotenv').config();

const { user, host, database, password, port } = process.env;
const pool = new Pool({
  user: user,
  host: host,
  database, database,
  password: password,
  port: port
});

// pool.connect(() => console.log('Connected to the database....'));

class QueryExecutor {
  static async queryExecutor(query, params) {
    try {
      return await pool.query(query, params);
    } catch (err) {
      return err;
    }
  }
}
export default QueryExecutor;