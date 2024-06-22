const express=require("express")
const router=express.Router();
const upload = require('../config/multerConfiguration'); 
const { addNote, deleteNote, editNote, getUserNote } = require("../controllers/NoteController");




router.get("/",getUserNote)
router.post("/add", upload.single('file'), addNote);
router.post("/delete",deleteNote);
router.post("/edit",upload.single('file'),editNote)



module.exports=router