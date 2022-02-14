var Category = require('../models/category')
var Product = require('../models/product')
const { Op } = require("sequelize");

module.exports = {
fetchProduct: async (req, res, next) => {
   try {
     let { sortBy, orderBy, name="",search="" } = req.query;

     const order =
       sortBy && orderBy ? [[sortBy, orderBy]] : sortBy ? [[sortBy]] : [];

     let where = {};
     if(name.trim()){
       where = {
         name: { [Op.like]: `%${name}%` },
       };
     }
     if(search.trim()){
       where[Op.or]={
         'title':{[Op.like]:`%${search}%`},
       }
     }
  
       const data = await Product.findAll({
         where,
         order,
         include : [{
            model : Category,
         }],
       },Product.belongsTo(Category,{ foreignKey:'categoryId'}),
       Category.hasOne(Product,{ foreignKey : 'categoryId'})
       );

       if (!data.length) {
         return res.status(404).json({
           success: false,
           status: 404,
           message: "No record(s) found",
         });
       }

       return res.status(200).json({
         success: true,
         status: 200,
         message: "Success",
         data: {
           list: data,
         },
       });
   } catch (error) {
     next(error);
     return res.status(500).json({
       success: false,
       status: 500,
       message: "Something went wrong, please try again",
     });
   }
 },
addProduct: async (req, res, next) => {
   try {
     let { title , price , description , image , category } = req.body
     let fieldIsMissing = req.body

     if(!fieldIsMissing){
       return res.status(400).json({
         success:false,
         status:400,
         message:'Some fields are missing, please check'
       });
     }

     let condition = [{title},{price},{description},{image}];

     const alreadyExist =await Product.count({
       where:{
         [Op.or]:condition
       }
     });

     if(alreadyExist){
      return res.status(409).json({
        success:false,
        status:409,
        message:'Product already exists'
      })
    }

   const data1 = await Category.findOne({
      where : {
         name : req.body.category
      }
   })

   let dataExist;

    if(!data1) {
      let category = await Category.create({
          name : req.body.category
      })

       dataExist = await Product.create({
          title : req.body.title,
          price : req.body.price,
          description : req.body.description,
          image : req.body.image,
          categoryId : category.categoryId
       });
    }

    else {
       dataExist = await Product.create({
         title : req.body.title,
         price : req.body.price,
         description : req.body.description,
         image : req.body.image,
         categoryId : category.categoryId
      });
    }

     if (!dataExist) {
       return res.status(400).json({
         success: false,
         status: 400,
         message: "Product has not been added successfully",
       });
     } 

     return res.status(200).json({
       success: true,
       status: 200,
       message: "Product has been added successfully",
       data: dataExist,
     });
   } catch (error) {
     next(error);
     return res.status(500).json({
       success: false,
       status: 500,
       message: "Something went wrong, please try again",
     });
   }
 },
updateProduct: async (req, res, next) => {
   try {
     const id = req.params.id;
     let { title , price , description , image , category } = req.body

     const product = await Product.findByPk(id);

     if(!product){
      return res.status(409).json({
        success:false,
        status:404,
        message:"No record(s) found"
      })
    }

    const data = await Category.findOne({
      where : {
         name : req.body.category
      }
   })

   if(!data){
      return res.status(409).json({
        success:false,
        status:409,
        message:'Category not exists'
      })
    }

    const updateProduct = await Product.update({
      title : req.body.title,
      price : req.body.price,
      description : req.body.description,
      image : req.body.image,
      category : req.body.category,
      categoryId : data.categoryId,
      },{
      where : {
         id : id
      }
    });

    if (!updateProduct) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Company has not been updated successfully",
      });
    }

     return res.status(200).json({
       success: true,
       status: 200,
       message: "Product has been updated successfully",
     });
   } catch (error) {
     next(error);
     return res.status(500).json({
       success: false,
       status: 500,
       message: "Something went wrong, please try again",
     });
   }
 },
 deleteProduct: async (req, res, next) => {
   try {
     const product = await Product.findByPk(req.params.id);
     if (!product) {
       return res.status(404).json({
         success: false,
         status: 404,
         message: "No record(s) found",
       });
     }

     const deleteProducts = await Product.destroy({
        where : {
           id : req.params.id
        }
     });

     if (!deleteProducts) {
       return res.status(400).json({
         success: false,
         status: 400,
         message: "Products has not been deleted successfully",
       });
     }

     return res.status(200).json({
       success: true,
       status: 200,
       message: "Products has been deleted successfully",
     });
   } catch (error) {
     next(error);
     return res.status(500).json({
       success: false,
       status: 500,
       message: "Something went wrong, please try again",
     });
   }
 }
}
