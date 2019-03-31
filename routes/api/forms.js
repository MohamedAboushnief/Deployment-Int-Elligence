const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Form = require('../../Models/Form')
const validator = require('../../Validation/formValidations')
const controller = require('../../controllers/formController')

//get all forms
router.get('/', async (req,res) => {
    const forms  = await controller.search()
    return res.json({data:forms})
})
//get company aka status=approved
router.get('/getApprovedCompany', async (req,res) => {
    const form = await Controller.search('status','Approved')
    return res.json({data:form})  
})
//get rejected form
router.get('/getRejectedCompany', async (req,res) => {
    const form = await controller.search('status','Rejected')
    return res.json({data:form})
})
//get In progress form
router.get('/getInProgressCompany', async (req,res) => {
    const form = await controller.search('status','In progress')
    return res.json({data:form})
})
//get Lawyer's comments
router.get('/getLawyerComments/:id', async(req, res)=>{
    const formId = req.params.id
    const formComment = await controller.search('_id',formId)
    var arrayLawyerComments = formComment.lawyerComments
    return res.json({ data: arrayLawyerComments});

})
 //get Reviewer's comments
 router.get('/getReviewerComments/:id', async(req, res)=>{
    const formId = req.params.id
    const formComment = await controller.search('_id',formId)
    var arrayReviewerComments = formComment.reviewerComments
    return res.json({ data: arrayReviewerComments});
})
//get a form by id
router.get('/:id', async (req,res) => {
        const id = req.params.id
        const form = await controller.search('_id',id)
        return res.json({data:form})
        
})
//update a form
 router.put('/:id', async (req,res) => {
    try
    {
        const id = req.params.id
        var form = await controller.update('_id',id,req.body)
        if(!form) return res.json({msg:"ID not found"})
        if(form.error) return res.status(400).send(form)
        return res.json({msg:"Form Updated Successfully", data:form})
    }
    catch(error)
    {
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