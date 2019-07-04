import properties from '../data/properties'

class PropertyController {
    // view all properties

    static viewAllProperties(req, res) {
        return res.status(200).json({
            status: res.statusCode,
            data: properties
        });
    }
}

export default PropertyController;
