const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Form = require('../../Models/Form')
const validator = require('../../Validation/formValidations')
const controller=require('../../controllers/formController')


//get all companies
 
router.get('/', async (req,res) => {
    const forms  = await controller.search()
    return res.json({data:forms})
    
})
//get a company by id
router.get('/:id', async (req,res) => {
        const id = req.params.id
        const form = await controller.search('_id',id)
        return res.json({data:form})
        
})
//create a form
router.post('/', async (req,res) => {
    try {
        if(req.body.type==='SSCForm'){
            for(i=0;i<req.body.SSCManagers.length;i++)
            {
            const SSCMValidated=validator.createValidationSSCManagers(req.body.SSCManagers[i])
                if(!SSCMValidated)
            {    
                 return res.status(400).send({ error: SSCMValidated.error.details[0].message })
            }
        }
                const isValidated = validator. createValidationSSC(req.body)
                 if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
                const newSSCForm = await Form.create(req.body)
                res.json({msg:'SSC Form was created successfully', data:newSSCForm})
            }
             
    if(req.body.type==='SPCForm'){
        const isValidated = validator. createValidationSPC(req.body)
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        const newSPCForm = await Form.create(req.body)   
        res.json({msg:'SPC Form was created successfully', data:newSPCForm})

        
       }
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
      } 

    })
    //update a company
 router.put('/:id', async (req,res) => {
    try {
        
     const id = req.params.id
     const form = await Form.findById(id)
     if(form.type==='SSCForm'){
     if(!form) return res.status(404).send({error: 'SSC Form does not exist'})
     const isValidated = validator.updateValidationSSC(req.body)
     if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
     const x = await Form.findByIdAndUpdate(id,req.body)
     const updatedSSC = await Form.findById(id)
     return res.json({msg: 'SSCForm updated successfully',data:updatedSSC})
        }
        if(form.type==='SPCForm'){
            if(!form) return res.status(404).send({error: 'SPC Form does not exist'})
            const isValidated = validator.updateValidationSPC(req.body)
            if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
            const x = await Form.findByIdAndUpdate(id,req.body)
            const updatedSPC = await Form.findById(id)
            return res.json({msg: 'SPCForm updated successfully', data:updatedSPC})
               }
               return res.status(404).send({error: 'Form does not exist'})
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
 })
//delete a company
 router.delete('/:id', async (req,res) => {
    try {
     const id = req.params.id
     const deletedForm= await controller.remove('_id',id)
    return res.json({msg:'Form was deleted successfully', data: deletedForm})
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
 })


    module.exports = router