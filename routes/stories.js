const express=require('express')
const router=express.Router()
const {ensureAuth}=require('../middleware/auth')
const Story=require('../models/Story')

//Get /stories/add
router.get('/add',ensureAuth,(req,res)=>{
    res.render('stories/add')
})

//Process add form
router.post('/',ensureAuth,async(req,res)=>{
    try{
        req.body.user=req.user.id
        await Story.create(req.body)
        res.redirect('/dashboard')
    }
    catch(err){
        console.log(err)
        res.render('500')
    }
})


module.exports=router