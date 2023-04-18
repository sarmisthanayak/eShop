const Product = require('../model/product.model');

exports.getCategory = async (req, res) => {
    try {
        // retrieve all distinct categories from the database
        const categories = await Product.distinct('category');
        // send response with categories
        res.status(200).json(categories);
    }
    catch (err) {
        res.status(500).json({ message: "Some error occurred while fetching products by Category" });
    }
}
