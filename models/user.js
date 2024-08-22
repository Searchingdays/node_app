import Datatypes, { Sequelize } from 'sequelize';
import sqlite from 'sqlite3';
import path from 'path';

// model attributes

const usermodel ={
    id :{
        type: Datatypes.INTEGER,
        allowNull: true,
        primaryKey: true
    },
    name: {
        type: Datatypes.STRING,
        allowNull: false
    },
       
}

const signup = {
    uname :{
        type: Datatypes.STRING,
        allowNull: false,
        unique: true   
    },
    passw :{
        type: Datatypes.STRING, // for debugging
        allowNull: false,
    },
    email :{
        type: Datatypes.STRING // temporary for debugging

    }
}



const sequelize = new Sequelize( "database1", "username1", null , {
    dialect: 'sqlite',
    storage: 'users1.sqlite'
});

export const user = sequelize.define( "user", usermodel)

export const register = sequelize.define("signup", signup)






//if (require.main === module) {
  //  main()                               // copied from stackoverflow,... improve every time
//}


user.sync()
 .then((res)=> {
    console.log("sync done!!")
 })
 .catch((err)=>{
    console.log(err)
 })

register.sync()
 .then(()=>{
    console.log("register model")
 })
 .catch((err)=>{
    console.log(err)
 })



 




