const Joi = require('joi')

module.exports = {
    createValidationL: request => {                         // create for lawyer
        const createSchema = {
        userType: Joi.string().required(),    
        name: Joi.string().required().max(50),
        gender:   Joi.string().required().max(6),
        nationality: Joi.string().required().max(50),
        identificationType: Joi.string().required().max(50), 
        identificationNum: Joi.string().required().max(50),
        birthDate:  Joi.date().required().max(50),
        address: Joi.string().required().max(50),
        telephone: Joi.string().max(20),
        fax:  Joi.string().max(20),
        email:  Joi.string().email().max(20),
        password : Joi.string().required().min(8).max(50),
        cases: Joi.array.items(Joi.object()).required(),                //not sure yet
        
       

        }


        return Joi.validate(request, createSchema)
    },



    createValidationI: request => {                                 // create for investor
        const createSchema = {
        userType: Joi.string().required(),    
        name: Joi.string().required().max(50),
        gender:   Joi.string().required().max(6),
        nationality: Joi.string().required().max(50),
        identificationType: Joi.string().required().max(50), 
        identificationNum: Joi.string().required().max(50),
        birthDate:  Joi.date().required().max(50),
        address: Joi.string().required().max(50),
        telephone: Joi.string().max(20),
        fax:  Joi.string().max(20),
        email:  Joi.string().email().max(20),
        password : Joi.string().required().min(8).max(50),
        forms: Joi.array.items(Joi.object()).required(),                //not sure yet
        companies: Joi.array.items(Joi.object()).required(),            //not sure yet
        lawyer: Joi.object().required(),                                //not sure yet
        investorType: Joi.string().required()

        }


        return Joi.validate(request, createSchema)
    },



    createValidationR: request => {                             // create for reviewer
        const createSchema = {
        userType: Joi.string().required(),    
        name: Joi.string().required().max(50),
        gender:   Joi.string().required().max(6),
        nationality: Joi.string().required().max(50),
        identificationType: Joi.string().required().max(50), 
        identificationNum: Joi.string().required().max(50),
        birthDate:  Joi.date().required().max(50),
        address: Joi.string().required().max(50),
        telephone: Joi.string().max(20),
        fax:  Joi.string().max(20),
        email:  Joi.string().email().max(20),
        password : Joi.string().required().min(8).max(50),
        cases: Joi.array.items(Joi.object()).required(),                //not sure yet

    
        

        }


        return Joi.validate(request, createSchema)
    },


    updateValidationL: request => {                                     //update for lawyer
        const updateSchema = {
            name: Joi.string().required().max(50),
            gender:   Joi.string().required().max(6),
            nationality: Joi.string().required().max(50),
            identificationType: Joi.string().required().max(50), 
            identificationNum: Joi.string().required().max(50),
            birthDate:  Joi.date().required().max(50),
            address: Joi.string().required().max(50),
            telephone: Joi.string().max(20),
            fax:  Joi.string().max(20),
            email:  Joi.string().email().max(20),
            password : Joi.string().required().min(8).max(50),
            cases: Joi.array.items(Joi.object()).required(),                //not sure yet
        }

        return Joi.validate(request, updateSchema)
    }, 




    updateValidationI: request => {                                     //update for investor
        const updateSchema = {
            name: Joi.string().required().max(50),
            gender:   Joi.string().required().max(6),
            nationality: Joi.string().required().max(50),
            identificationType: Joi.string().required().max(50), 
            identificationNum: Joi.string().required().max(50),
            birthDate:  Joi.date().required().max(50),
            address: Joi.string().required().max(50),
            telephone: Joi.string().max(20),
            fax:  Joi.string().max(20),
            email:  Joi.string().email().max(20),
            password : Joi.string().required().min(8).max(50),
            forms: Joi.array.items(Joi.object()).required(),                //not sure yet
            companies: Joi.array.items(Joi.object()).required(),            //not sure yet
            lawyer: Joi.object().required(),                                //not sure yet
            investorType: Joi.string().required()
    
        }

        return Joi.validate(request, updateSchema)
    }, 





    updateValidationR: request => {                                             //update for reviewer
        const updateSchema = {
            name: Joi.string().required().max(50),
        gender:   Joi.string().required().max(6),
        nationality: Joi.string().required().max(50),
        identificationType: Joi.string().required().max(50), 
        identificationNum: Joi.string().required().max(50),
        birthDate:  Joi.date().required().max(50),
        address: Joi.string().required().max(50),
        telephone: Joi.string().max(20),
        fax:  Joi.string().max(20),
        email:  Joi.string().email().max(20),
        password : Joi.string().required().min(8).max(50),
        forms: Joi.array.items(Joi.object()).required(),                //not sure yet
        companies: Joi.array.items(Joi.object()).required(),            //not sure yet
        lawyer: Joi.object().required(),                                //not sure yet
        investorType: Joi.string().required()

        }

        return Joi.validate(request, updateSchema)
    }, 



}










