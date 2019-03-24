// Dependencies
const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const validator = require('../../Validation/adminValidations')


// Models
const Admin = require('../../Models/Admin');
const Cases = require('../../Models/Case');


// Get admins
router.get('/', async (req,res) => {
	const admins = await Admin.find()
	res.json({data: admins})
})
router.get('/CasesSortedById', async(req, res) => {
    var cases= await Cases.find()
    cases.sort(compareById)
    return res.json({ data: cases });
})

router.get('/CasesSortedByCreationDate', async(req, res) => {
    var cases= await Cases.find()
    cases.sort(compare)
    return res.json({ data: cases });
})
router.get('/:id', async(req, res) => {
    const id=req.params.id
    const admins= await Admin.findById(id)
    return res.json({ data: admins});
})

//sort cases by ID



function compareById(a,b){
    if(a._id < b._id) return -1
    if(b._id < a._id) return 1
    
    return 0
}




//View the sorted cases by date

function compare(a,b){
    if(Date.parse(a.creationDate)>Date.parse(b.creationDate)) return 1
    if(Date.parse(a.creationDate)<Date.parse(b.creationDate)) return -1
    return 0
}




// Create a new admin

router.post('/', async (req,res) => {
   try {
    const isValidated = validator.createValidation(req.body)
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
    const newAdmin = await Admin(req.body).save()
    res.json({msg:'Admin was created successfully', data: newAdmin})
   }
   catch(error) {
       // We will be handling the error later
       console.log(error)
   }  
})

router.put('/:id', async (req,res) => {
    try {
     const id = req.params.id
     const admin = await Admin.findById(id)
     if(!admin) return res.status(404).send({error: 'Admin does not exist'})
     const isValidated = validator.updateValidation(req.body)
     if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
     const x = await Admin.findByIdAndUpdate(id,req.body)
     const updatedAdmin = Admin.findById(id)
     res.json({msg: 'Admin updated successfully',data:updatedAdmin})
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
 })

router.delete('/:id', async (req, res) => {
	try{
    const adminId = req.params.id 
    const deletedAdmin = await Admin.findByIdAndRemove(adminId)
	res.json({msg:'Admin was deleted successfully', data: deletedAdmin})
	}
	catch(error){
		console.log(error)
	}
})



module.exports = router;