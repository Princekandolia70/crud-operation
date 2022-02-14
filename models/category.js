'use strict';

const product  = require("./product");
module.exports =(sequelize,DataTypes) =>{
const category = sequelize.define('category',{
    categoryId : {
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey:true
    },
    name : {
       type:DataTypes.STRING(512),
    },
})

module.exports = category
}
