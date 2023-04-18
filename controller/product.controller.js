const Product = require('../model/product.model');

const searchProducts = async (req, res) => {
  const {
    category = '', direction = 'DESC', name = '', sortBy = 'productId',
  } = req.query;

  const sortOrder = direction === 'ASC' ? 1 : -1;
  const sortCriteria = { [sortBy]: sortOrder };

  const searchCriteria = {};
  if (category) {
    searchCriteria.category = category;
  }
  if (name) {
    searchCriteria.name = { $regex: `.*${name}.*`, $options: 'i' };
  }

  const pageNo = parseInt(req.query.pageNo || 0, 10);
  const pageSize = parseInt(req.query.pageSize || 10, 10);

  try {
    const totalProducts = await Product.countDocuments(searchCriteria);
    const products = await Product.find(searchCriteria)
      .sort(sortCriteria)
      .skip(pageNo * pageSize)
      .limit(pageSize);

    const totalPages = Math.ceil(totalProducts / pageSize);
    const response = {
      products,
      pageNumber: pageNo,
      pageSize,
      totalPages,
      totalProducts,
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { searchProducts };