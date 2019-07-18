import { Pool } from 'pg';
require('dotenv').config();

const { DATABASE_URL } = process.env;
const pool = new Pool({ connectionString: DATABASE_URL });

class QueryExecutor {
  static async queryExecutor(query, params) {
    try {
      return await pool.query(query, params);
    } catch (err) {
      return err
    }
  }
}
export default QueryExecutor;