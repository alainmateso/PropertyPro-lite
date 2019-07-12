import properties from '../data/properties';
import moment from 'moment';

require('dotenv').config();

import cloudinary from 'cloudinary';


const { cloud_name, api_key, api_secret } = process.env;

cloudinary.config({
	cloud_name: cloud_name,
	api_key: api_key,
	api_secret: api_secret
});

class PropertyController {
	// view all properties

	static viewAllProperties(req, res) {
		if (properties.length > 0) {
			return res.status(200).json({
				status: res.statusCode,
				message: 'A complete list of properties',
				data: properties
			});
		}
		return res.status(404).json({
			status: res.statusCode,
			error: 'No proerties found'
		});

	}

	//view a specific property

	static viewPropertyById(req, res) {
		const id = req.params.id;
		const property = properties.find(item => item.id == id)
		if (property) {
			return res.status(200).json({
				status: res.statusCode,
				message: 'The property you were looking for is here',
				data: property
			});
		}
		return res.status(404).json({
			status: res.statusCode,
			error: 'No property found'
		});
	}

	// create a new property advert

	static postNewProperty(req, res) {
		const { price, state, city, address, type } = req.body;
		if (!req.files.image) {
			return res.status(400).json({
				status: res.statusCode,
				error: 'No image file selected'
			})
		}
		const propertyPhoto = req.files.image.path;
		cloudinary.uploader.upload(propertyPhoto, (result, error) => {
			if (error) {
				return res.status(400).json({
					status: res.statusCode,
					error: error
				});
			}
			const newProperty = { id: properties.length + 1, owner: req.user.id, status: 'available', price, state, city, address, type, created_on: moment().format(), image_url: result.url }
			properties.push(newProperty);
			return res.status(201).json({
				status: res.statusCode,
				message: 'New property ad posted successfuly',
				data: newProperty
			});
		});
	}

	static deleteProperty(req, res) {
		const ownerID = req.user.id
		const id = req.params.id;
		const propertyIndex = properties.findIndex(item => item.id == id)
		if (propertyIndex != -1) {
			if (ownerID == id) {
				properties.splice(propertyIndex, 1)
				return res.status(200).json({
					status: res.statusCode,
					message: 'Property deleted successfully'
				});
			}
			return res.status(401).json({
				status: res.statusCode,
				message: 'This is not your property'
			})
		}
		return res.status(404).json({
			status: res.statusCode,
			error: 'No property found'
		});
	}

	// update property details
	static updatePropertyDetails(req, res) {
		const ownerID = req.user.id;
		const id = req.params.id;
		const property = properties.find(item => item.id == id)
		if (property) {
			if (ownerID == id) {
				const newDetails = Object.keys(req.body);
				newDetails.forEach(newDetail => {
					property[newDetail] = req.body[newDetail]
				});
				return res.status(201).json({
					status: res.statusCode,
					message: 'New details recorded successfully',
					data: property
				});
			}
			return res.status(401).json({
				status: res.statusCode,
				message: 'This is not your property'
			})
		}
		return res.status(404).json({
			status: res.statusCode,
			error: 'No property found'
		});
	}
	// mark property as sold
	static markAsSold(req, res) {
		const ownerID = req.user.id
		const id = req.params.id
		const property = properties.find(item => item.id == id)
		if (property) {
			if (ownerID == id) {
				property.status = 'sold'
				return res.status(200).json({
					status: res.statusCode,
					message: 'Property marked as sold',
					data: property
				});
			}
			return res.status(401).json({
				status: res.statusCode,
				message: 'This is not your property'
			})
		}
		return res.status(404).json({
			status: res.statusCode,
			error: 'No property found'
		});
	}

	// view properties by type

	static viewPropertiesByType(req, res) {
		const foundProperties = properties.filter(item => item.type == req.query.type)
		if (foundProperties.length > 0) {
			return res.status(200).json({
				status: res.statusCode,
				message: `${req.query.type} properties retrieved successfully`,
				data: foundProperties
			});
		}
		return res.status(404).json({
			status: res.statusCode,
			error: `No ${req.query.type} properties were found`
		});
	}
}

export default PropertyController;
