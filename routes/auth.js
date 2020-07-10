const express=require('express');
const passport = require('passport');
const router=express.Router();

//Google authentication

router.get("/google",passport.authenticate('google',{scope:['profile']}))

//Google auth callback
router.get("/google/callback",passport.authenticate('google', { failureRedirect:'/'
}),(req,res)=>{
    res.redirect('/dashboard')
}
)

//Logout
router.get('/logout',(req,res)=>{
    res.logout()
    res.redirect('/')
})

module.exports=router