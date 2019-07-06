import properties from '../data/properties';
import Joi from '@hapi/joi';
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
        return res.status(200).json({
            status: res.statusCode,
            data: properties
        });
    }

    //view a specific property

    static viewPropertyById(req, res) {
        const id = req.params.id;
        const property = properties.find(item => item.id == id)
        if (property) {
            return res.status(200).json({
                status: res.statusCode,
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
        const schema = Joi.object().keys({
            owner: Joi.number().integer().required(),
            status: Joi.string().required(),
            price: Joi.number().required(),
            state: Joi.string().required(),
            city: Joi.string().required(),
            address: Joi.string().required(),
            type: Joi.string().required()
        });
        const { error: validationErrors } = Joi.validate(req.body, schema, {
            abortEarly: false
        });
        if (validationErrors) {
            const error = [];
            const { details: errors } = validationErrors;
            errors.forEach(element => {
                error.push(element.message.split('"').join(''));
            });
            return res.status(400).json({
                status: res.statusCode,
                error: error
            });
        }
        const { owner, status, price, state, city, address, type } = req.body;
        const propertyPhoto = req.files.image.path;
        cloudinary.uploader.upload(propertyPhoto, (result, error) => {
            if (error) {
                return res.status(400).json({
                    status: res.statusCode,
                    error: error
                });
            }
            const newProperty = { id: properties.length + 1, owner, status, price, state, city, address, type, created_on: moment().format(), image_url: result.url }
            properties.push(newProperty);
            return res.status(201).json({
                status: res.statusCode,
                data: newProperty
            });
        });
    }

    static deleteProperty(req, res) {
        const id = req.params.id;
        const propertyIndex = properties.findIndex(item => item.id == id)
        if (propertyIndex != -1) {
            properties.splice(propertyIndex, 1)
            return res.status(200).json({
                status: res.statusCode,
                message: 'Property deleted successfully'
            });
        }
        return res.status(404).json({
            status: res.statusCode,
            error: 'No property found'
        });
    }
}

export default PropertyController;
