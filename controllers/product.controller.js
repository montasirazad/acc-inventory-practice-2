const { getProductService, createProductService } = require("../services/product.services");



exports.getProducts = async (req, res, next) => {
    try {
        const products = await getProductService()

        // const product = await Product.find({undefined})

        res.status(200).json({
            status: 'success',
            data: products
        })
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: 'Data could not get',
            error: error.message
        })
    }
};


exports.createProduct = async (req, res, next) => {

    try {
        // const product = new Product(req.body);


        const result = await createProductService(req.body);
        result.logger()

        res.status(200).json({
            status: 'success',
            message: 'Data inserted successfully',
            data: result
        })
    }
    catch (error) {

        res.status(400).json({
            status: 'failed',
            message: 'Data not inserted successfully',
            error: error.message
        })
    }


}