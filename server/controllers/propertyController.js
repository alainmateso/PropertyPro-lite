import properties from '../data/properties';
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
		return res.status(200).json({
			status: res.statusCode,
			message: 'The property you were looking for is here',
			data: rows
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
			return res.status(201).json({
				status: res.statusCode,
				message: 'New property ad posted successfuly',
				data: rows
			});
		});
	}

	// Mark property as sold

	static async markPropertyAsSold(req, res) {
		const ownerId = req.user.rows[0].id
		const id = req.params.id;
		const { rowCount } = await queryExecutor(getSpecificProperty, [id])
		if (rowCount == 0) {
			return res.status(404).json({
				status: res.statusCode,
				error: 'No property found'
			});
		}
		if (ownerId != id) {
			return res.status(403).json({
				status: res.statusCode,
				message: 'This is not your property'
			});
		}
		const { rows } = await queryExecutor(markPropertyAsSold, [id])
		return res.status(201).json({
			status: res.statusCode,
			message: 'Property marked as sold',
			data: rows
		});
	}

	// Delete property

	static async deleteProperty(req, res) {
		const ownerId = req.user.rows[0].id
		const id = req.params.id;
		const { rowCount } = await queryExecutor(getSpecificProperty, [id])
		if (rowCount == 0) {
			return res.status(404).json({
				status: res.statusCode,
				error: 'No property found'
			});
		}
		if (ownerId != id) {
			return res.status(403).json({
				status: res.statusCode,
				message: 'This is not your property'
			});
		}
		const { rows } = await queryExecutor(deleteProperty, [id])
		return res.status(200).json({
			status: res.statusCode,
			message: 'Property deleted successfully'
		});
	}

	// update property details

	static async updatePropertyDetails(req, res) {
		const { price, state, city, address, type } = req.body
		const is_admin = req.user.rows[0].is_admin;
		const userId = req.user.rows[0].id;
		const id = req.params.id;
		const { rows, rowCount } = await queryExecutor(getSpecificProperty, [id])
		if (rowCount == 0) {
			return res.status(404).json({
				status: res.statusCode,
				error: 'No property found'
			});
		}
		const owner = rows[0].owner
		const newDetails = [price, state, city, address, type, id]
		if (owner == userId || is_admin == true) {
			const { rows } = await queryExecutor(updatePropertyDetails, newDetails)
			return res.status(201).json({
				status: res.statusCode,
				message: 'New details recorded successfully',
				data: rows
			});
		}
		return res.status(403).json({
			status: res.statusCode,
			message: 'This is not your property'
		})
	}

}

export default PropertyController;
