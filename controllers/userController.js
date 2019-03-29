const mongoose = require('mongoose');
const User = require('../Models/User')
const userValidator = require('../Validation/UserValidation')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const tokenKey = require('../../config/keys').secretOrKey
const config = require('../config');




 //comparing between creation dates
exports.compareByDate=function compareByDate(a,b){                                               
    if(Date.parse(a.creationDate)>Date.parse(b.creationDate)) return 1;
    
    if(Date.parse(a.creationDate)<Date.parse(b.creationDate)) return -1;

    return 0;
}

//creating Investor
exports.registerInvestor=async function registerInvestor(body){                      
    const { error1 } = userValidator.createValidationI(body)            
    
    if (error1) {
        return error1.details[0].message;
    }
    
    let user = await User.findOne({ email: body.email });
   // const user = await User.findOne({body:email})
    if(user) return {error: 'Account already exists'}
    
   
    const newUser = await User.create(body)
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    await newUser.save();

    
    return newUser
}

//Login
exports.loginUser= async function loginUser(body)
{
    try{
    const {email,password}=req.body;
    const user = await User.findById({email});
    if (!user)
        return res.status(404).send({email:'This email is not registered yet'})
    const doesItMatch= bcrypt.compareSync(password,user.passowrd);
    if (doesItMatch)
    {
        const payload={
            id:user.id,
            name:user.name,
            email:user.email
        }
    const token=jwt.sign(payload,tokenKey,{expiresIn:'1h'})  
    res.send( [`Bearer ${token}`])
    return 'Token'
    } 
    else 
        return res.status(400).send({ password: 'Wrong password' });   
}
catch(e){}
}

// Search users
exports.search = async function search(att ,value ){  
    if(att === null){
     var values = await User.find()
     return values
    }
    
    if(att === '_id'){
        var values = await User.findById(value)
        return values
    }

    var values = User.find({att:value})
    return values

}



//delete user
exports.remove=async function remove(att,value){                           

    
        if(att===null){
            return 'there is no user to delete'
        }
        else if(att==='_id'){

         const deletedUser = await User.findByIdAndDelete(value)
         return deletedUser
        }
       
    }
        
// Update Users
exports.update = async function update(att, value, body){  
   
    try {
        if(! att ) 
        return null

        if(body.userType==='Lawyer'){
             const isValidated = validator.updateValidationL(body)
             if (isValidated.error) return { error: isValidated.error.details[0].message }
        }
        if(body.userType==='Investor'){
            const isValidated = validator.updateValidationI(body)
             if (isValidated.error) return { error: isValidated.error.details[0].message }
        }
        if(body.userType==='Reviewer'){
           const isValidated = validator.updateValidationR(body)
            if (isValidated.error) return { error: isValidated.error.details[0].message }
       }
       if(att ==='_id' ){
        var updatedUser = await User.findByIdAndUpdate(value,body)
        var x = await User.findById(value)
        return x
       }
       var updatedUser = User.updateMany({att:value},body)
       var x = await User.findById(value)
       return x
       }
      
       catch(error) {
           // We will be handling the error later
           console.log(error)
       }
    }

       
    // for sorting the cses by caseID
       function compareById(a , b){  
        if(a._id > b._id )
        return 1;
        
        if(b._id > a._id )
        return -1;
        
        return 0;
        
        }

   


    










