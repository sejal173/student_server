import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

import Student  from "./src/models/student.js";


const app = express();
app.use(express.json());

const connectMongoDB = async () => {
  const conn = await mongoose.connect(process.env.MONGODB_URI);

  if (conn) {
    console.log("MongoDB connected successfully");
  }
};

connectMongoDB();



app.get("/health", (req, res) => {
  res.json({
    message: `All Good , All Set`,
  });
});

app.get("/students",async (req, res) => {

  const students = await Student.find()

  res.json({
    success: true,
    data: students,
    message: "succefully fetched all students",
  });
});

app.post('/student', async (req, res) => {
  const { name, age, mobile, email } = req.body;

  if (!name) {
    return res.json({
      success: false,
      message: "Name is required",
    });
  }

  if (!age) {
    return res.json({
      success: false,
      message: "age is required",
    });
  }

  if (!mobile) {
    return res.json({
      success: false,
      message: "mobile is required",
    });
  }
  if (!email) {
    return res.json({
      success: false,
      message: "email is required",
    });
  }

  const stud = new Student({
    name,
    age,
    mobile,
    email,
  });

  const savedStudent = await stud.save();

  res.json({
    success: true,
    data: savedStudent,
    message: "succefully added new students",
  });
});


app.get('/student', async (req, res) => {
  const {email} = req.query;

  const stud = await Student.findOne({email : email})

  res.json({
    success :true,
    data:stud,
    message :'successfully fetched student'
  });
})

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
