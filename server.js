import express from 'express';
import router from './routes/usercontrol.js';
import pkg from 'bcryptjs';
const {bcrypt} = pkg;
import p from 'jsonwebtoken';

import { register } from './models/user.js';
import {dirname} from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url)

const __dirname = dirname(__filename)



const app = express();

app.use(express.json());

app.set('view engine', 'ejs');
app.set('views','templates');
app.use(express.static('public'))

const PORT = process.env.PORT || 3000

app.listen(PORT)

app.use('/user/', router);


const secret_key = 'xxxx-xxxx';


export async function reg(uname,pass,email){

  const hpass = await pkg.hash(pass, 8)

  register.create({ uname:uname, passw:hpass, email:email })
   .then((r)=>{
    console.log(r)
    
   })
   .catch((err)=>{
    console.log(err)
    return err
   })

   register.sync()
    .then((r)=>{
      console.log(r)
     
    })
    .catch((err)=>{
      console.log(err)
    })

 
}

export async function login(name, password){

  const u = register.findOne({where:{
    uname: name
  }})
   .then((r)=>{
    pkg.compare(password, r[0].passw)
     .then((r)=>{
      console.log(r)
      if (r == true){
      console.log("1")
      const res = new Promise(r)
      }
      else{
        console.log("5")
        const res = new Promise((r)=>{

        })
      }
     })
     .catch((err)=>{
      console.log(err)
      console.log("2")
      return err
     })})
  //if (!ismatch){
    //console.log("invalid pass")
    //return null
  }
 // else{ const token = p.sign({name}, secret_key, (err,tok) =>{
   // if (err){
     // console.log(err)
   // }
    //else{
      //console.log(tok)
    //}
  //});
  
 // return token

 // }})
   
  //.catch(()=>{
   // console.log("not found")
   // return null

   //})
    
//}






app.get('/', (req, res) => {
    res.render('home')


})






