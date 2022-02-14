var Category = require('../models/category')

module.exports = {
    getcategory: async (req, res, next) => {
       try {

           const data = await Category.findAll();
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
    addCategory: async (req, res, next) => {
       try {
         let { name } = req.body
         let fieldIsMissing = req.body
    
         if(!fieldIsMissing){
           return res.status(400).json({
             success:false,
             status:400,
             message:'Some fields are missing, please check'
           });
         }
    
         const alreadyExist =await Category.count({
           where:{
             name : req.body.name
           }
         });
    
         if(alreadyExist){
          return res.status(409).json({
            success:false,
            status:409,
            message:'Category already exists'
          })
        }

          let dataExist = await Category.create({
                name : req.body.name
           });
      
         if (!dataExist) {
           return res.status(400).json({
             success: false,
             status: 400,
             message: "Category has not been added successfully",
           });
         } 
    
         return res.status(200).json({
           success: true,
           status: 200,
           message: "Category has been added successfully",
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
     updateCategory: async (req, res, next) => {
        try {
          const id = req.params.id;
          const category = await Category.findByPk(id);
          let { name } = req.body 

          if(!name){
            return res.status(400).json({
              success:false,
              status:400,
              message:'Some fields are missing, please check'
            });
          }

          if(!category){
            return res.status(409).json({
              success:false,
              status:404,
              message:"No record(s) found"
            })
          } 

          const updateProduct = await category.update({
            name : req.body.name,
            },{
            where : {
               id : id
            }
          });
       
          if (!updateProduct) {
            return res.status(400).json({
              success: false,
              status: 400,
              message: "Category has not been added successfully",
            });
          } 
     
          return res.status(200).json({
            success: true,
            status: 200,
            message: "Category has been updated successfully",
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
      deleteCategory: async (req, res, next) => {
        try {
          const category = await Category.findByPk(req.params.id);
          if (!category) {
            return res.status(404).json({
              success: false,
              status: 404,
              message: "No record(s) found",
            });
          }
     
          const deleteCategory = await Category.destroy({
             where : {
                categoryId : req.params.id
             }
          });
     
          if (!deleteCategory) {
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