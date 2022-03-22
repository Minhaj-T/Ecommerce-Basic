var express = require('express');
var router = express.Router();
var productHelpers=require('../helpers/product-helpers')
const userHelper=require('../helpers/user-helpers')
/* GET users listing. */
router.get('/', function(req, res, next) {
  productHelpers.getAllproducts().then((products)=>{
    res.render('admin/view-products',{admin:true,products})
  })
 
 

});

router.get('/add-product',(req,res)=>{
  res.render('admin/add-product',{admin:true})
})
router.post('/add-product',(req,res)=>{
  console.log(req.body)
  console.log(req.files.Images)

  productHelpers.addProduct(req.body,(id)=>{
    let img=req.files.Images
    img.mv('./public/product-images/'+id+'.jpg',(err,data)=>{
      if(!err){
        res.redirect('/admin')

      }else{
        console.loglog(err)
      }
    })
    
  })
})
router.get('/product-delete/:id',(req,res)=>{
  let proId=req.params.id
  console.log(proId)
productHelpers.deleteProduct(proId).then((resp)=>{
  res.redirect('/admin/')
})
})
router.get('/edit-product/:id',async (req,res)=>{
  let product= await productHelpers.getProductDetials(req.params.id)
  res.render('admin/edit-product',{product,admin:true})
})
router.post('/edit-product/:id',(req,res)=>{
let id=req.params.id
  productHelpers.updateProduct(req.params.id,req.body).then(()=>{
  res.redirect('/admin')
  if(req.files.Images){
    let image=req.files.Images
    image.mv('./public/product-images/'+id+'.jpg')
  }
})
})
router.get('/All-users',(req,res)=>{
  userHelper.getAllUsers().then(users=>{
    console.log(users)
    res.render('admin/All-users',{admin:true,users})
  })
 
})
router.get('/products',(req,res)=>{
  res.redirect('/admin')
})
router.get('/add-users',(req,res)=>{
  res.render('admin/add-users',{admin:true})
})
router.post('/add-users',(req,res)=>{
  console.log(req.body)
  
userHelper.adduser(req.body,(data)=>{
  res.redirect('/admin/All-users',)
})

  
})

router.get('/user-delete/:id',(req,res)=>{
  let userId=req.params.id
  console.log(userId)
userHelper.deleteUser(userId).then((resp)=>{
  res.redirect('/admin/All-users')
})
})

router.get('/edit-users/:id',async (req,res)=>{
  let users= await userHelper.getUserDetials(req.params.id)
  res.render('admin/edit-users',{users,admin:true})
})
router.post('/edit-users/:id',(req,res)=>{
   let id=req.params.id
    userHelper.updateUser(id,req.body).then(()=>{
    res.redirect('/admin/All-users')
    
  })
  })
router.get('/login2',(req,res)=>{
  res.render("admin/login2")
})

router.post('/login2',(req,res)=>{
  const password="1234"
  const email="mj@gmail.com"
  const {fmail,fpassword}=req.body;
  if(fmail==email&&fpassword==password){
    res.redirect('/admin');
  }
  else{
    res.render('admin/login2',{msg:"login failed"})
  }
})


router.get('/adminlogout',(req,res)=>{
  res.render('admin/login2')
})

module.exports = router;
