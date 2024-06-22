const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');
const dotenv = require("dotenv");
const path  = require('path')

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());


const _dirname = path.dirname("")
const buildPath = path.join(_dirname  , "../client/build");

app.use(express.static(buildPath))
app.use('/uploads', express.static('uploads'));



mongoose.connect(process.env.DBURI);

const db = mongoose.connection;
db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});


const NoteRouter = require("./routes/NoteRoutes")
app.use("/note", NoteRouter)

const server = app.listen(process.env.PORT, () => {
  console.log(`server started on port ${process.env.PORT}`);
})