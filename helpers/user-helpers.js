var db=require('../configuration/connection')
var collections = require('../configuration/collections')
const bcrypt=require('bcrypt') 
const objectId=require('mongodb').ObjectId
 module.exports={
    doSignup:(userData)=>{
       return new Promise(async (res,rej)=>{

       
        userData.fpassword = await bcrypt.hash(userData.fpassword, 10)
        db.get().collection(collections.USER_COLLECTION).insertOne(userData).then((data)=>{
            res(data)  
        })
          
  
       })

       
    },

    doLogin:(userData)=>{
        return new Promise(async (res,rej)=>{
           let loginStatus=false
           let response={}
            let user=await db.get().collection(collections.USER_COLLECTION).findOne({fmail:userData.fmail})
            if(user){
               bcrypt.compare(userData.fpassword,user.fpassword).then((status)=>{
                    if(status){
                       
                        console.log('login success');
                        response.user=user
                        response.status=true
                        res(response)

                    }
                    else{
                        console.log("login failed");
                        res({status:false})
                    }
               }) 

            }else{
                console.log("unauthorised user");
                res({status:false})
            }
        })
    },
    getAllUsers:()=>{
        return new Promise(async (res,rej)=>{
            let users=await db.get().collection(collections.USER_COLLECTION).find().toArray()
            res(users);
        })
    },
    adduser:(user, cb) => {
        console.log(user)
        db.get().collection(collections.USER_COLLECTION).insertOne(user).then((data) => {
            console.log(data)
            cb(data.insertedId)
        })

    },
    deleteUser:(userId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collections.USER_COLLECTION).remove({_id:objectId(userId)}).then((response)=>{
                resolve(response)
            })
        })
      },
      getUserDetials:(userId)=>{
        return new Promise((res,rej)=>{
            db.get().collection(collections.USER_COLLECTION).findOne({_id:objectId(userId)}).then((user)=>{
               console.log(user);
                res(user)
            })
        })
    },
    updateUser:(userId,userDetials)=>{
        return new Promise((res,rej)=>{
            db.get().collection(collections.USER_COLLECTION)
            .updateOne({_id:objectId(userId)},{
                $set:{
                     fname:userDetials.fname,
                     fmail:userDetials.fmail,
                     fpassword:userDetials.fpassword
                    
                }
            }).then((response)=>{
               res() 
            })
        })
    }
      

    
}