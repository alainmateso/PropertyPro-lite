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

class QueryExecutor {
  static async queryExecutor(query, params) {
    try {
      return await pool.query(query, params);
    } catch (err) {
      return (req, res) => {
        res.status(500).json({
          status: res.statusCode,
          message: 'An error occured'
        })
        console.log(`Here's what happened => ${err}`);
      }
    }
  }
}
export default QueryExecutor;