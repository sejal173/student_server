import { model ,Schema} from "mongoose";

const studentSchema = new Schema({
    name: String,
    age: Number,
    mobile: String,
    email: String,
  });
  
  const Student = model("Student", studentSchema);

export default Student;