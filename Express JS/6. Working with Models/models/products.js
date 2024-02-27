// Models are created to represent the data. In this file we create a class instance to give structure to each new product that is added. We have created 2 methods in the classes. save() will add the respective instance to a file to save it. fetchAll() is static in nature as we can't specifically call the method from an object as we will have to uselessly create a new object. 


const fs = require('fs')
const path = require('path')
const rootDirectory = require('../util/path')

module.exports = class Product{
    constructor(t){
        this.title = t.title
        this.price = t.price
    }

    save(){
        const p = path.join(rootDirectory,'data','products.json')
        fs.readFile(p,(err,data)=>{
            let products = []
            if(!err){
                products = JSON.parse(data)
            }
            products.push(this)
            fs.writeFile(p,JSON.stringify(products),(err)=>{
                console.log(err)
            })
        })        
    }
// In above code, we first create an empty array to hold the JSON values. The data is stored in JSON.stringify format in the file. We read the file to check if it has something. If it has something, we take the data in a variable, attach the object we want to attach. If there was nothing in the file, we create an empty array, append our object and pass it in JSON.stringify format to the file. We cannot use appendFile as we need to store the data in JSON format

    static fetchAll(cb){
        const p = path.join(rootDirectory,'data','products.json')
        fs.readFile(p,(err,data)=>{
            if(err){
                console.log(cb([]))
                return cb([])
            }
            console.log(cb(JSON.parse(data)))
            return cb(JSON.parse(data))
        })
    }
}
// In the above code, readFile is asynchronous in nature, thus the funtion completes executing before the async readFile completes. To solve this we pass a callback function. This callback function. Continued in the file ./controllers/product.js