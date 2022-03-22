var express = require('express');
var router = express.Router();
var productHelpers=require('../helpers/product-helpers')
var userHelper=require('../helpers/user-helpers')
const verifyLogin=(req,res,next)=>{
  if(req.session.loggedIn){
    next()
  }
  else{
    res.redirect('/login')
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  let user=req.session.user
  console.log(user)
  productHelpers.getAllproducts().then((products)=>{
    res.render('user/user',{products,user})
  })
});
router.get('/login',(req,res)=>{
  if(req.session.loggedIn){
    res.redirect('/')
  }else{

  res.render("user/login",{"loginErr":req.session.loginErr})
  req.session.loginErr=false
  }
})

router.get('/signup',(req,res)=>{
  res.render("user/signup")
})
router.post('/signup',(req,res)=>{
    userHelper.doSignup(req.body).then((resp)=>{
      console.log(resp);
      res.redirect('/login')

    })
})

router.post('/login',(req,res)=>{
  userHelper.doLogin(req.body).then((resp)=>{
    if(resp.status){
      req.session.loggedIn=true
      req.session.user=resp.user
      
      res.redirect('/')
    }else{
      req.session.loginErr=true 
      res.redirect('/login')
      
    }
  })
})
router.get('/logout',(req,res)=>{
  req.session.destroy()
  res.redirect('/login')
})

router.get('/cart',verifyLogin,(req,res)=>{

  res.render('user/cart')
})


module.exports = router;
