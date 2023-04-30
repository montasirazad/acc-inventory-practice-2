
const {
    getProductService,
    createProductService,
    updateProductService,
    bulkUpdateProductService,
    deleteProductByIdService,
    bulkDeleteProductService
} = require("../services/product.services");



exports.getProducts = async (req, res, next) => {
    try {
        const filters = { ...req.query };

        const excludeObject = ['sort', 'page', 'limit'];

        excludeObject.forEach(field => delete filters[field])

        const queries = {};

        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            queries.sortBy = sortBy;
            console.log(sortBy);
        }

        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            queries.fields = fields;
            console.log(fields);
        }

        
        const products = await getProductService(filters, queries)

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


};


exports.updateProducts = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await updateProductService(id, req.body);

        res.status(200).json({
            status: 'success',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: 'updating product failed',
            error: error.message
        })
    }
};


exports.bulkUpdateProducts = async (req, res, next) => {
    try {


        const result = await bulkUpdateProductService(req.body);

        res.status(200).json({
            status: 'success',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: 'updating product failed',
            error: error.message
        })
    }
}

exports.deleteProductById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await deleteProductByIdService(id)
        if (!result.deletedCount) {
            res.status(400).json({
                status: 'failed',
                message: 'delete products failed',
                error: error.message
            })
        }
        res.status(200).json({
            status: 'success',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: 'delete product failed',
            error: error.message
        })
    }
}

exports.bulkDeleteProduct = async (req, res, next) => {
    try {


        const result = await bulkDeleteProductService(req.body.ids)

        if (!result.deletedCount) {
            res.status(400).json({
                status: 'failed',
                message: 'delete products failed',
                error: error.message
            })
        }

        res.status(200).json({
            status: 'success',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: 'delete products failed',
            error: error.message
        })
    }
}