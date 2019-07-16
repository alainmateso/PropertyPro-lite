import { Pool } from 'pg';
import QueryExecutor from '../database/queryExecutor'

import queries from '../database/queries'

const { getProperties } = queries
const { queryExecutor } = QueryExecutor

class PropertyControllerV2 {
  // view all properties

  static async getAllProperties(req, res) {
    const { rows, rowCount } = await queryExecutor(getProperties)
    if (rowCount == 0) {
      return res.status(404).json({
        status: res.statusCode,
        message: 'No properties were found'
      });
    }
    return res.status(200).json({
      status: res.statusCode,
      message: 'A complete list of properties',
      data: rows
    });
  }

}

export default PropertyControllerV2;
