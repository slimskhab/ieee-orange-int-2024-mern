const Counter = require("../models/CounterModel");
const Note = require("../models/NoteModel");
const fs = require("fs");

const addNote = async (req, res) => {
  try {
    const { noteTitle, noteDescription,noteType } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({message:"No file uploaded!"});
      }

    const counter = await Counter.findOneAndUpdate(
      { id: "autovalNote" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const note = new Note({
      id: counter.seq,
      noteTitle,
      noteDescription,
      noteType,
      noteImage: file.path,
      status: "Active",
    });

    await note.save();

    res.status(201).json({
      status: "success",
      message: "Added Note",
      note: note,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error!",
    });
  }
};

const editNote = async (req, res) => {
  try {
    const { noteId, noteTitle, noteType, noteDescription, status } = req.body;
    let file;

    if (req.file) {
      const oldNote = await Note.findOne({ id: noteId });
      if (oldNote && oldNote.noteImage) {
        fs.unlinkSync(oldNote.noteImage);
      }
      file = req.file.path;
    }

    const updatedData = {
      noteTitle,
      noteType,
      noteDescription,
      status,
    };

    if (file) {
      updatedData.noteImage = file;
    }

    const updatedNote = await Note.findOneAndUpdate(
      { id: noteId },
      updatedData,
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({
      status: "success",
      message: "Note updated",
      note: updatedNote,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error!",
    });
  }
};


const deleteNote = async (req, res) => {
  try {
    const noteId = req.body.noteId;

    const deletedNote = await Note.findOneAndDelete({
      id: noteId,
    });

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (deletedNote.noteImage) {
      fs.unlinkSync(deletedNote.noteImage);
    }

    res.status(200).json({
      status: "success",
      message: "Note deleted",
      note: deletedNote,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error!",
    });
  }
};

const getUserNote = async (req, res) => {
  try {

    const {userId} = req.body;
    const note = await Note.find({
      userId
    });

    return res.status(200).json({
      status: "success",
      message: "Note retrieved",
      note: note,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Server Error!",
    });
  }
};

module.exports = {
  addNote,
  deleteNote,
  editNote,
  getUserNote,
};