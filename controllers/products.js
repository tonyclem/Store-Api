const Product = require('../models/products')

const getAllProductsStatic = async (req, res) => {
  // throw new Error('Cannot get all products')
  const products = await Product.find({ name: 'vase table' })
  res.status(200).json({ products, ubHits: products.length })
}

const getAllProducts = async (req, res) => {
  const { featured, company, name } = req.query
  const queryObject = {}
  if (featured) {
    queryObject.featured = featured === 'true' ? true : false
  }

  if (company) {
    queryObject.company = company
  }

  if (name) {
    queryObject.name = name
  }

  console.log(queryObject)
  const products = await Product.find(queryObject)
  res.status(200).json({ products, ubHits: products.length })
}
module.exports = { getAllProducts, getAllProductsStatic }
