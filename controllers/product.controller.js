
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

        //{price:{$gt:50}}
        //{ price: { gt: '50' } }
        // gt, lt, lte, gte


        //console.log(req.query);

        let filters = { ...req.query };
        let filtersString = JSON.stringify(filters);
        filtersString = filtersString.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
        filters = JSON.parse(filtersString)
        console.log(filters);
        const excludeObject = ['sort', 'page', 'limit'];

        excludeObject.forEach(field => delete filters[field])

        const queries = {};

        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            queries.sortBy = sortBy;
            //console.log(sortBy);
        }

        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            queries.fields = fields;
            //console.log(fields);
        }

        if (req.query.page) {
            const { page = 1, limit = 10 } = req.query; // data is string
            const skip = (page - 1) * parseInt(limit);
            queries.skip = skip;
            queries.limit = parseInt(limit);


            /**
             * total product 50
             * each page 10 products
             * page 1 -> 1-10
             * page 2-> 11-20
             * page 3 -> 21-30 -> page 3 skip 1-20 -->3-1=2*10=20
             * page 4 -> 31-40 ->page 4 skip 1-30 
             * page 5 -> 41-50
             */
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