
const Counter = require("../models/CounterModel");
const Note = require("../models/NoteModel");
const User = require("../models/UserModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

const addUser = async (req, res) => {
  try {

    const {email,username,password}=req.body

    const checkUser=await User.findOne({email})

    if(checkUser){
        return res.status(400).json({
            status: "fail",
            message: "User Already Exists"
        })
    }

    const counter = await Counter.findOneAndUpdate(
      { id: "autovalUser" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      id: counter.seq,
      username: username,
      email: email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({
      status: "success",
      message: "Added User",
      user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error!"
    });
  }
}


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid email or password",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);


    const token = jwt.sign(
      { id: user.id, userType: user.userType,username:user.firstName },
      process.env.JWT_SECRET
  );

    if (passwordMatch) {
      res.status(200).json({
        status: "success",
        message: "Login successful",
        user: user,
        token:token,
      });
    } else {
      res.status(401).json({
        status: "fail",
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error!",
    });
  }

}


const getStats=async (req, res) => {
  try {
      const { userId } = req.body;

      const totalNotes = await Note.countDocuments({ userId });
      const totalActiveNotes = await Note.countDocuments({ userId, noteStatus: 'active' });
      const totalUsers = await User.countDocuments();

      res.status(200).json({
          stats: {
              totalNotes,
              totalActiveNotes,
              totalUsers
          }
      });
      console.log(totalNotes)
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error!" });
  }
}
module.exports = {addUser,loginUser,getStats }