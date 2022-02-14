const category = require('./category')
'use strict';
module.exports =(sequelize,DataTypes) =>{
const product = sequelize.define('product',{
    title:{
       type:DataTypes.STRING(512),
       allowNull:false,
    },
    price:DataTypes.INTEGER,
    description:{
        type:DataTypes.STRING(512),
    },
    image:{
        type:DataTypes.STRING,
    },   
    categoryId: {
        type: DataTypes.INTEGER,      
  },
    category: {
        type :DataTypes.STRING
    }
});
module.exports = product
}
