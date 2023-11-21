const Product = require('../models/products')

const getAllProductsStatic = async (req, res) => {
  // throw new Error('Cannot get all products')

  const products = await Product.find({}).sort('-name price')
  res.status(200).json({ products, ubHits: products.length })
}

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort } = req.query
  const queryObject = {}
  if (featured) {
    queryObject.featured = featured === 'true' ? true : false
  }

  if (company) {
    queryObject.company = company
  }

  if (name) {
    queryObject.name = { $regex: name, $options: 'i' }
  }
  console.log(queryObject)

  let result = Product.find(queryObject)
  if (sort) {
    // products = products.sort()
    const sortList = sort.split(',').join(' ')
    result = result.sort(sortList)
  } else {
    result = result.sort('createdAt')
  }
  const products = await result
  res.status(200).json({ products, ubHits: products.length })
}
module.exports = { getAllProducts, getAllProductsStatic }
