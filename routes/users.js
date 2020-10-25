const router = require('express').Router();
const jwt = require('jsonwebtoken')
const multer = require("multer");
const upload = multer({dest:"./images"})

let User = require('../models/user.model');
let auth = require('../middleware/auth')



router.post("/register", async(req, res)=>{

    user = new User();
    user.email = req.body.email;
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    const password = req.body.password;

    try{
        if(!user.fieldsValidity(password)){
            return res.status(400).json({msg:"Not all fields have been entered."});
        }
        if(!user.passwordValidity(password)){
            return res.status(400).json({msg: "Password is weak"});
        }
        const existingUser = await User.findOne({email:req.body.email});
        if(existingUser){
            return res.status(400).json({msg:"User already exists."})
        }

        user.setPassword(password)
        const savedUser = await user.save();
        res.json(user)

    }catch(err){        
        res.status(500).json({error: err.message}); 
    }
})

router.post("/login", async (req, res)=> {

    try{
        const {email, password} = req.body;

        if (!email || !password){
            return res.status(400).json({msg: "not all fields have been filled"});
        }    
        const user = await User.findOne({email: email});
        if (!user){
            return res.status(400).json({msg: "user with this email does not exist "})
        }
        if(!user.checkPassword(password)){
            return res.status(400).json({msg: "password is incorrect"})
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_PW);
        res.json({
            token,
            user: { 
                id: user._id,
                email: user.email
            }
        })


    }catch(err){
        res.status(500).json({error : err.message})
    }
    

})
router.post("/upload",upload.single("myImage"), async(req,res)=>{
    const updateUser = await User.findOneAndUpdate({email:req.body.email},{imgPath:req.file.path},{new:true})
    res.json({msg: "successfully uploaded"})
})

router.get("/:id",auth, async(req,res)=>{
    const user = await User.findById(req.params.id);
    res.json({
        email: user.email,
        path: user.imgPath,
        fName: user.firstName,
        lName: user.lastName
    })
})

router.delete("/delete", auth, async(req, res)=>{
    try {
        const deletedUser = await User.findByIdAndDelete(req.user);
        res.json(deletedUser);
    }catch(err){
        res.status(500).json({error: err.message})
    }
})

router.post("/tokenCheck", async (req,res)=>{
    try{
        const token = req.header("auth_header_token");
        if(!token) return res.json(false);

        const verified = jwt.verify(token, process.env.JWT_PW);
        if(!verified) return res.json(false);

        const user = await User.findById(verified.id);
        if (!user) return res.json(false);

        return res.json(true);
    }catch(err){
        res.status(500).json({error: err.message});
    }
})

router.get("/", auth, async(req,res)=>{
    const user = await User.findById(req.user);
    res.json({
        email: user.email,
        id: user._id
    });
})

module.exports = router;