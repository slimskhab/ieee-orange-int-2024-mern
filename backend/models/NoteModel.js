const mongoose=require("mongoose");

const NoteSchema=mongoose.Schema({
    id:{
        type:Number,
        required:true,
    },
    userId:{
        type:Number,
        required:true,
    },
    noteTitle:{
        type:String,
        required:true,
    },
    noteType:{
        type:String,
        required:true,
    },
    noteDescription:{
        type:String,
        required:true,
    },
    noteImage:{
        type:String,
        required:true,
    },
    noteStatus:{
        type:String,
        required: true
    },
    
} ,{ timestamps: true })


const Note=mongoose.model("Note",NoteSchema)

module.exports=Note;