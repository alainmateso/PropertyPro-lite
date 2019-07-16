import { Pool } from 'pg';
import QueryExecutor from '../database/queryExecutor'

import queries from '../database/queries'

const {
  getProperties,
  getSpecificType
} = queries
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

  // view a specific type

  static async getSpecificType(req, res) {
    const type = req.query.type
    const { rows, rowCount } = await queryExecutor(getSpecificType, [type])
    if (rowCount == 0) {
      return res.status(404).json({
        status: res.statusCode,
        message: `No ${type} properties were found`
      });
    }
    return res.status(200).json({
      status: res.statusCode,
      message: `${type} properties retrieved successfully `,
      data: rows
    });
  }

}

export default PropertyControllerV2;
