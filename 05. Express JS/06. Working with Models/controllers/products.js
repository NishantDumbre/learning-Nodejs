const Product = require('../models/products');


exports.getAddProduct = (req, res, next) => {
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

exports.postAddProduct = (req, res, next) => {
  const products = new Product(req.body.title)
  products.save()
  res.redirect('/');
};

exports.getProducts = (req, res, next) => {
  let products = Product.fetchAll((products) =>{
    res.render('shop', {
    prods: products,
    pageTitle: 'Shop',
    path: '/',
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true
  });
  })
};
// We pass the callback function here. The render code above is passed as a callback to the fetchAll method. In the line cb(JSON.parse(data)) from the model file, JSON.parse(data) will be passed in place of products as the argument in the above anonymous callback. It will provide the parsed data and create objects for each instance accordigly
