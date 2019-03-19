
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Company = require('../../models/Company')


var User = new Schema({

  userType:{type:String,required: true},
  name: {type:String,required:true},
  gender: {type:String,required:true},
  nationality: {type:String,required:true},
  identificationType: {type:String,required:true},
  identificationNumber: {type:String,required:true,unique:true},
  birthdate: {type:date,required:true},
  address: {type:String,required:true},
  telephone:{type:Number,unique:true},
  fax: {type:Number, unique: true},
  cases: {type: [String], required: true },
  email: { type: String, unique: true} ,
  password: { type: String, required: true,unique:true },
  forms: {type: [Object]},
  companies: {type: Company},
  lawyer: {type: User},
  investorType: {type: [String]}
  
});



module.exports = User = mongoose.model('users', User)