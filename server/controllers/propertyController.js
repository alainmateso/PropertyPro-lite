import moment from 'moment';
import dotENV from 'dotenv';
import cloudinary from 'cloudinary';
import QueryExecutor from '../database/queryExecutor';
import queries from '../database/queries';

dotENV.config();

const {
	getProperties,
	getSpecificType,
	getSpecificProperty,
	postNewProperty,
	markPropertyAsSold,
	deleteProperty,
	updatePropertyDetails
} = queries

const { queryExecutor } = QueryExecutor

const { cloud_name, api_key, api_secret } = process.env;

cloudinary.config({
	cloud_name: cloud_name,
	api_key: api_key,
	api_secret: api_secret
});

class PropertyController {
	// get all listed properties

	static async getAllProperties(req, res) {
		const { rows, rowCount } = await queryExecutor(getProperties)
		if (rowCount == 0) {
			return res.status(404).json({
				status: res.statusCode,
				message: 'No properties were found'
			});
		}
		if (rowCount == 1) {
			const [results] = rows
			return res.status(200).json({
				status: res.statusCode,
				message: `A complete list of properties`,
				data: results
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
		if (rowCount == 1) {
			const [results] = rows
			return res.status(200).json({
				status: res.statusCode,
				message: `${type} properties retrieved successfully `,
				data: results
			});
		}

		return res.status(200).json({
			status: res.statusCode,
			message: `${type} properties retrieved successfully `,
			data: rows
		});
	}


	//view a specific property

	static async getSpecificProperty(req, res) {
		const id = req.params.id;
		const { rows, rowCount } = await queryExecutor(getSpecificProperty, [id]);
		if (rowCount == 0) {
			return res.status(404).json({
				status: res.statusCode,
				error: 'No property found'
			});
		}
		const [results] = rows
		return res.status(200).json({
			status: res.statusCode,
			message: 'The property you were looking for is here',
			data: results
		});
	}

	// Post a new property advert

	static async postNewProperty(req, res) {
		const { price, state, city, address, type } = req.body;
		const owner = req.user.rows[0].id;
		if (!req.files.image) {
			return res.status(400).json({
				status: res.statusCode,
				error: 'No image file selected'
			})
		}
		const propertyPhoto = req.files.image.path;
		cloudinary.uploader.upload(propertyPhoto, async (result, error) => {
			if (error) {
				return res.status(400).json({
					status: res.statusCode,
					error: error
				});
			}
			const newProperty = [owner, price, state, city, address, type, moment().format(), result.url]
			const { rows } = await queryExecutor(postNewProperty, newProperty)
			const [results] = rows
			return res.status(201).json({
				status: res.statusCode,
				message: 'New property ad posted successfuly',
				data: results
			});
		});
	}

	// Mark property as sold

	static async markPropertyAsSold(req, res) {
		const id = req.params.id;
		const { rows, rowCount } = await queryExecutor(getSpecificProperty, [id])
		if (rowCount == 0) {
			return res.status(404).json({
				status: res.statusCode,
				error: 'No property found'
			});
		}
		const [results] = rows
		const owner = results.owner
		const [user] = req.user.rows
		const userId = user.id
		if (owner != userId) {
			return res.status(403).json({
				status: res.statusCode,
				message: 'This is not your property'
			});
		} else {
			const { rows } = await queryExecutor(markPropertyAsSold, [id])
			const [results] = rows
			return res.status(201).json({
				status: res.statusCode,
				message: 'Property marked as sold',
				data: results
			});
		}

	}

	// Delete property

	static async deleteProperty(req, res) {
		const id = req.params.id;
		const { rows, rowCount } = await queryExecutor(getSpecificProperty, [id])
		if (rowCount == 0) {
			return res.status(404).json({
				status: res.statusCode,
				error: 'No property found'
			});
		}
		const [results] = rows
		const owner = results.owner
		const [user] = req.user.rows
		const userId = user.id
		if (owner != userId) {
			return res.status(403).json({
				status: res.statusCode,
				message: 'This is not your property'
			});
		} else {
			await queryExecutor(deleteProperty, [id])
			return res.status(200).json({
				status: res.statusCode,
				message: 'Property deleted successfully'
			});
		}

	}

	// update property details

	static async updatePropertyDetails(req, res) {
		const { price, state, city, address, type } = req.body
		const id = req.params.id;
		const { rows, rowCount } = await queryExecutor(getSpecificProperty, [id])
		if (rowCount == 0) {
			return res.status(404).json({
				status: res.statusCode,
				error: 'No property found'
			});
		}
		const [results] = rows
		const owner = results.owner
		const [user] = req.user.rows
		const userId = user.id
		if (owner != userId) {
			return res.status(403).json({
				status: res.statusCode,
				message: 'This is not your property'
			})
		} else {
			const newDetails = [price, state, city, address, type, id]
			const { rows } = await queryExecutor(updatePropertyDetails, newDetails)
			const [results] = rows
			return res.status(201).json({
				status: res.statusCode,
				message: 'New details recorded successfully',
				data: results
			});
		}

	}

}

export default PropertyController;
