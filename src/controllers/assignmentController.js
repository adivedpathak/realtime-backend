
const Assignment = require("../models/Assignment");
const Classroom = require("../models/Classroom");

// Teacher uploads an assignment
exports.uploadAssignment = async (req, res) => {
  try {
    const { title, description, classroomId, dueDate, type, topic } = req.body;
    const classroom = await Classroom.findById(classroomId);
    if (!classroom) return res.status(404).json({ message: "Classroom not found" });

    const assignment = new Assignment({
      title,
      description,
      classroom: classroomId,
      dueDate,
      type,
      topic: type === "quiz" ? topic : null,
    });

    await assignment.save();
    classroom.assignments.push(assignment._id);
    await classroom.save();

    res.status(201).json({ message: "Assignment uploaded successfully", assignment });
  } catch (error) {
    res.status(500).json({ message: "Error uploading assignment", error: error.message });
  }
};

// Get all assignments for a classroom
exports.getClassroomAssignments = async (req, res) => {
  try {
    const { classroomId } = req.params;
    const classroom = await Classroom.findById(classroomId).populate("assignments");
    if (!classroom) return res.status(404).json({ message: "Classroom not found" });

    res.status(200).json({ assignments: classroom.assignments });
  } catch (error) {
    res.status(500).json({ message: "Error fetching assignments", error: error.message });
  }
};
