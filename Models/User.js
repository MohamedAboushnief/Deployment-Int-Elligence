 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Form = require('./Form').schema

const User = new Schema({

  userType:{type: String,enum:['Reviewer','Lawyer','Investor']},
  name: {type:String,required:true},
  gender: {type:String,required:true},
  nationality: {type:String,required:true},
  identificationType: {type:String,required:true},
  identificationNumber: {type:String,required:true,unique:true},
  birthdate: {type:Date,required:true},
  address: {type:String,required:true},
  email: { type: String,required:true} ,
  password: { type: String, required: true },
  telephone:{type:String},
  fax:{type:String},
  forms: {type: Array },
  lawyer: { type: Object},
  investorType: {type: String},
  financialBalance:{type:Number}
});



module.exports = user = mongoose.model('users', User)