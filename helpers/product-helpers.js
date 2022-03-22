var db=require('../configuration/connection')

var collections = require('../configuration/collections')
const objectId=require('mongodb').ObjectId
const async = require('hbs/lib/async')
const { response } = require('express')
module.exports={

    addProduct:(product,cb)=>{
        console.log(product)
        db.get().collection('product').insertOne(product).then((data)=>{
           console.log(data);
            cb(data.insertedId)
        })

    },
    getAllproducts:()=>{
        return new Promise(async (res,rej)=>{
            let products=await db.get().collection(collections.PRODUCT_COLLECTION).find().toArray()
            res(products);
        })
    },
    deleteProduct:(proId)=>{
      return new Promise((resolve,reject)=>{
          db.get().collection(collections.PRODUCT_COLLECTION).remove({_id:objectId(proId)}).then((response)=>{
              resolve(response)
          })
      })
    },
    getProductDetials:(proId)=>{
        return new Promise((res,rej)=>{
            db.get().collection(collections.PRODUCT_COLLECTION).findOne({_id:objectId(proId)}).then((product)=>{
               console.log(product);
                res(product)
            })
        })
    },
    updateProduct:(proId,productDetials)=>{
        return new Promise((res,rej)=>{
            db.get().collection(collections.PRODUCT_COLLECTION)
            .updateOne({_id:objectId(proId)},{
                $set:{
                     name:productDetials.name,
                     title:productDetials.title,
                     price:productDetials.price,
                     discription:productDetials.discription
                }
            }).then((response)=>{
               res() 
            })
        })
    }
}