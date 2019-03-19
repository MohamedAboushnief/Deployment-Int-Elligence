const express = require('express');
const router = express.Router();
const validator = require('../../validations/caseValidations')
const mongoose = require('mongoose')
const Case = require('../../models/Case')


//get all cases
router.get('/', async (req,res) => {
    const cases = await Case.find()
    res.json({data: cases})
})

//get a case
router.get('/:id', async (req,res) => {
    const id=req.params.id
    const cases = await Case.findOne({id})
    res.json({data: cases})
})


//create new case
router.post('/', async (req,res) => {
    try {
     const isValidated = validator.createValidation(req.body)
     if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
     const newCase = await Case.create(req.body)
     res.json({msg:'Book was created successfully', data: newCase})
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
 })



//update a case
router.put('/:id', async (req,res) => {
    try {
     const id = req.params.id
     const newCase = await Case.findOne({id})
     if(!newCase) return res.status(404).send({error: 'Case does not exist'})
     const isValidated = validator.updateValidation(req.body)
     if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
     const updatedBook = await Book.updateOne(req.body)
     res.json({msg: 'Case updated successfully'})
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
 })


//delete a case
router.delete('/:id', async (req,res) => {
    try {
     const id = req.params.id
     const deletedCase = await Case.findByIdAndRemove(id)
     res.json({msg:' was deleted successfully', data: deletedBook})
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
 })

module.exports = router;
