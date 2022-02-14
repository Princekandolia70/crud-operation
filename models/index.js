
const {Sequelize,DataTypes} =require('sequelize')

const sequelize = new Sequelize('crud-operation','root','',{
    host:'localhost', 
    dialect:'mysql', 
    pool:{max:5,min:0,idle:1000},
    logging:false
})

sequelize.authenticate()
.then(() =>
    {
    console.log("connected")
    })
.catch(err =>{
    console.log("not connected"+err)
})

const db ={} 
    db.Sequelize = Sequelize
    db.sequelize = sequelize

db.sequelize.sync({force:false}) 
.then(() =>{
    console.log("sync user model")  
})
db.product = require('./product')(sequelize,DataTypes)
db.category = require('./category')(sequelize,DataTypes)


module.exports = db;

