
// everything coming after /user/

import express from 'express';
import {register, user} from '../models/user.js';
import { json } from 'sequelize';
import pkg from 'bcryptjs';
import p from 'jsonwebtoken';
import { login} from '../server.js';
import { reg } from '../server.js';
import {EventEmitter} from 'node:events'
import exp from 'node:constants';
import cookieParser from 'cookie-parser';
import http from 'http';



const router = express.Router();

router.use(express.urlencoded({ extended: true}))

//router.use(cookieParser) order matters putting it here made the entire links unresponsive



router.get('/add-user/', (req,res)=>{
  res.render('add-user')
})

router.post('/new_user/',(req,res)=>{
  
  const a = Object.values(req.body)
  console.log(a[0])
  
  user.create({id:a[1], name:a[0]})
   .then((s,f)=>{
    console.log("done")

    user.sync()
   .then(()=>{
    console.log("4")
    res.render('user_added')
   })
   .catch((err)=>{
    console.log(err)
    console.log("5")
    try{res.render('error')
      console.log("3")
   } catch {
    console.log("5")
    res.redirect('/user/error/')
   }
   })
  })

   .catch((err)=>{
    console.log("2")
    res.render('error')
    return
    
   })

   
   
     
   })


router.get('/all-users/', (req,res)=>{
   
    const users = user.findAll({
      attributes:['name', 'id']
    })
     .then((r) => {
      const a = new Array()
      for (let i =0; i<r.length; i++){
        a[i] = r[i].dataValues

       }
       
  res.render('all_users', {arr:a}) // taking it out of then to not wait for the promise to resolve 
     })
     .catch((err)=>{
      console.log(err)
      res.send(err)
     })
   
    })

router.get('/update-user/',(req,res)=>{
  res.render('update_user')
})

router.post('/change_user/',(req,res)=>{
  const a = Object.values(req.body)

  const j = user.findAll({where:{
    name:a[0],
    id: a[1]
  }})
   .then((r)=>{    // r is what is returned for the promise
    r[0].id = a[2]
    r[0].name = a[3]
    r.save();
     


    })
   .catch((err)=>{
    console.log(err)
    res.send(err)
   })
  
  
})

router.post

// user register and verification 


router.get('/sign-up/', (req,res) =>{
  //res.setHeader('Set-cookie',['username=a','password=p','email=e'])
  res.render('signup')
})

router.use(cookieParser()) //dont know what is the problem with this

router.post('/registered/', (req,res)=>{

  

const arr = Object.values(req.body)

 const name = req.body.username
 const pass = req.body.password
 const email = req.body.email

 
 console.log("cookie", req.cookies)

 //const name = req.cookies.token["username"]

const u = register.findOne({where:{
  uname: name
 }})
  .then((r)=>{
    //console.log(r)
    if (r != null){
      res.setHeader("Set-Cookie",{})
      req.cookies = {}
      res.render('already_present')
      return
      
      
    }

reg(name, pass, email)
  .then((r)=>{
  
  console.log("here break")
  res.setHeader('Set-Cookie',{})
  res.redirect('/')
 })

  .catch((err)=>{
  res.send(err)


 })
})
})


router.get('/login/', (req,res)=>{
  res.render('login')
})

router.post('/logged_in/', (req,res)=>{
   
 const uname = req.body.username
 const pass = req.body.password


const a=  login(uname, pass)
   .then((r)=>{
    console.log("returned 2333")
    console.log(r)
    res.send("login ")

  })
   .catch((err)=>{
    console.log(err)
    console.log("4")
    res.send("not accessed")
  })
  console.log("result")
  console.log(a)


})



router.get('/',(req,res)=>{
  res.redirect('/add-user/')
})

export default router


