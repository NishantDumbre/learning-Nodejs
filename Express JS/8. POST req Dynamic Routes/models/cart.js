// We create a class but inside it we create a static function as we do not want to create new instance. After reading check the controllers/shop.js file

const fs = require('fs')
const path = require('path')

const p = path.join(
    path.dirname(require.main.filename),
    'data',
    'cart.json'
  );

module.exports = class Cart{
    static addProduct(id, productPrice ){
        fs.readFile(p,(err,fileContent)=>{      //reading the file 
            let cart = {products: [], totalPrice: 0}    // we already create a cart object for single instance in case the file never existed
            if(!err){      // if our file was not empty, we parse the JSON content to our cart variable
                cart = JSON.parse(fileContent)
            }
            const existingProductIndex = cart.products.findIndex(
                prod => prod.id === id
              );    // we loop through only cart products using JS method findIndex() to see if our product already exiists
            const existingProduct = cart.products[existingProductIndex]     // we target the index where our product already exists
            let updatedProduct;
            if(existingProduct){    // if we find a product in the cart already, we make a new copy of that object and the entire cart, increase the quantity and then update the quantity of our item
                updatedProduct = {...existingProduct}
                updatedProduct.qty++
                cart.products = [...cart.products]
                cart.products[existingProductIndex] = updatedProduct
            }
            else{       // if the product never existed, we add a new one with the id that was taken as argument and 1 qty
                updatedProduct = {id:id, qty:1}
                cart.products = [...cart.products, updatedProduct]      // appending the product to our cart copy
            }
            cart.totalPrice = cart.totalPrice + + productPrice  //updating total price. The price is taken as string and concatenates, so we added a space in between
            fs.writeFile(p,JSON.stringify(cart),(err)=>{
                console.log(err)
            })
        })
    }
}