import properties from '../data/properties';

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
}

export default PropertyController;
