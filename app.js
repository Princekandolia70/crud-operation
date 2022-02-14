const express = require("express")
const app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
const validator = require('express-joi-validation').createValidator({})
const Joi = require('Joi')  //To validate body,header or params in postman

const port =8080

require('./models/index')

var categoryController = require('./controller/categoryController');
var productController = require('./controller/productController')

app.get("/products",productController.fetchProduct)
app.get("/categories",categoryController.getcategory)

app.post("/addproducts",productController.addProduct)
app.post("/addcategories",categoryController.addCategory)

app.put("/updateproducts/:id",productController.updateProduct)
app.put("/updatecategories/:id",categoryController.updateCategory)

app.delete("/deleteproducts/:id",productController.deleteProduct)
app.delete("/deletecategories/:id",categoryController.deleteCategory)


app.listen(port,()=>{
    console.log('port is running at:'+port)
})