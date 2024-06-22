const express=require("express")
const router=express.Router();



const{
  addUser,loginUser,
  getStats,
} = require("../controllers/UserController");

router.post("/stats",getStats);

router.post("/login",loginUser);
router.post("/signup",addUser);



module.exports=router