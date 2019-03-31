const Joi = require('joi')


module.exports = {
    createValidationL: request => {                         // create for lawyer
        const createSchema = {
        userType: Joi.string().required(),    
        name: Joi.string().required().min(3).max(50),
        gender:   Joi.string().required().min(4).max(6),
        nationality: Joi.string().required().max(50),
        identificationType: Joi.string().required().min(8).max(20), 
        identificationNumber: Joi.string().required().min(8).max(50),
        birthdate:  Joi.date().required(),
        address: Joi.string().required().min(5).max(50),
        email:  Joi.string().required().email().min(3).max(254),
        password : Joi.string().required().min(8).max(16),
        telephone: Joi.string().min(4).max(15),
        fax:  Joi.string().min(5).max(20),
        forms: Joi.array()
         }

        return Joi.validate(request, createSchema)
    },



    createValidationI: request => {                                 // create for investor
        const createSchema = {
        userType: Joi.string().required(),    
        name: Joi.string().required().min(3).max(50),
        gender:   Joi.string().required().min(4).max(6),
        nationality: Joi.string().required().max(50),
        identificationType: Joi.string().required().min(8).max(20), 
        identificationNumber: Joi.string().required().min(8).max(50),
        birthdate:  Joi.date().required(),
        address: Joi.string().required().min(5).max(50),
        email:  Joi.string().required().email().min(3).max(254),
        password : Joi.string().required().min(8).max(16),
        telephone: Joi.string().min(4).max(15),
        fax:  Joi.string().min(5).max(20),
        investorType: Joi.string().required(),
        financialBalance:Joi.number(),
        forms:Joi.array().required() 
        }


        return Joi.validate(request, createSchema)
    },



    createValidationR: request => {                             // create for reviewer
        const createSchema = {
        userType: Joi.string().required(),    
        name: Joi.string().required().min(3).max(50),
        gender:   Joi.string().required().min(4).max(6),
        nationality: Joi.string().required().max(50),
        identificationType: Joi.string().required().min(8).max(20), 
        identificationNumber: Joi.string().required().min(8).max(50),
        birthdate:  Joi.date().required(),
        address: Joi.string().required().min(5).max(50),
        email:  Joi.string().email().required().min(3).max(254),
        password : Joi.string().required().min(8).max(16),
        telephone: Joi.string().min(4).max(15),
        fax:  Joi.string().min(5).max(20),
        forms: Joi.array()
        }


        return Joi.validate(request, createSchema)
    },


    updateValidationL: request => {                                     //update for lawyer
        const updateSchema = {
            name: Joi.string().max(50).min(3),
            gender:   Joi.string().max(6).min(4),
            nationality: Joi.string().max(50),
            identificationType: Joi.string().max(20).min(8), 
            identificationNumber: Joi.string().max(50).min(8),
            birthdate:  Joi.date(),
            address: Joi.string().max(50).min(5),
            email:  Joi.string().email().max(254).min(3),
            password : Joi.string().min(8).max(16),
            telephone: Joi.string().max(15).min(4),
            fax:  Joi.string().min(5).max(20),
            forms: Joi.array()
             }

        return Joi.validate(request, updateSchema)
    }, 




    updateValidationI: request => {                                     //update for investor
        const updateSchema = {
            name: Joi.string().max(50).min(3),
            gender:   Joi.string().max(6).min(4),
            nationality: Joi.string().max(50),
            identificationType: Joi.string().max(20).min(8), 
            identificationNumber: Joi.string().max(50).min(8),
            birthdate:  Joi.date(),
            address: Joi.string().max(50).min(5),
            email: Joi.string().email().max(254).min(3),
            password : Joi.string().min(8).max(16),   
            telephone: Joi.string().max(15).min(4),
            fax: Joi.string().min(5).max(20),
            investorType: Joi.string(),
            financialBalance: Joi.number(),
            forms:Joi.array()
   }

        return Joi.validate(request, updateSchema)
    }, 





    updateValidationR: request => {                                             //update for reviewer
        const updateSchema = {
        name: Joi.string().max(50).min(3),
        gender:   Joi.string().max(6).min(4),
        nationality: Joi.string().max(50),
        identificationType: Joi.string().max(20).min(8), 
        identificationNumber: Joi.string().max(50).min(8),
        birthdate:  Joi.date(),
        address: Joi.string().max(50).min(5),
        email:  Joi.string().email().max(254).min(3),
        password : Joi.string().min(8).max(16),
        telephone: Joi.string().max(15).min(4),
        fax:  Joi.string().min(5).max(20),
        forms:Joi.array()

     }

        return Joi.validate(request, updateSchema)
    }, 



}










