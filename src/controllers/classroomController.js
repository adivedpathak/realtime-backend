const Classroom = require("../models/Classroom");
const User = require("../models/User");

// Create a new classroom
exports.createClassroom = async (req, res) => {
  try {
    const { name, teacherId } = req.body;
    const teacher = await User.findById(teacherId);
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });

    const classroom = new Classroom({
      name,
      teacher: teacherId,
      students: [],
    });

    await classroom.save();
    res.status(201).json({ message: "Classroom created successfully", classroom });
  } catch (error) {
    res.status(500).json({ message: "Error creating classroom", error: error.message });
  }
};

// Add student to classroom
exports.addStudentToClassroom = async (req, res) => {
  try {
    const { classroomId, studentId } = req.body;
    const classroom = await Classroom.findById(classroomId);
    if (!classroom) return res.status(404).json({ message: "Classroom not found" });

    const student = await User.findById(studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });

    classroom.students.push(studentId);
    await classroom.save();
    res.status(200).json({ message: "Student added to classroom successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding student", error: error.message });
  }
};

// Remove student from classroom
exports.removeStudentFromClassroom = async (req, res) => {
  try {
    const { classroomId, studentId } = req.body;
    const classroom = await Classroom.findById(classroomId);
    if (!classroom) return res.status(404).json({ message: "Classroom not found" });

    classroom.students = classroom.students.filter(student => student.toString() !== studentId);
    await classroom.save();
    res.status(200).json({ message: "Student removed from classroom successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error removing student", error: error.message });
  }
};
