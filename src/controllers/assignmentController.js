const Assignment = require("../models/Assignment");
const Classroom = require("../models/Classroom");
const nodemailer = require("nodemailer");
const Assignment = require("../models/Assignment");
const Classroom = require("../models/Classroom");
const User = require("../models/User");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "testingacc9322@gmail.com",
    pass: "jdpjsjigkrxcudcm",
  },
});

const sendEmailNotification = async (recipients, assignment) => {
  const mailOptions = {
    from: "testingacc9322@gmail.com",
    to: recipients.join(", "),
    subject: `New Assignment: ${assignment.title}`,
    text: `A new assignment has been posted in your classroom.\n\nTitle: ${assignment.title}\nDescription: ${assignment.description}\nDue Date: ${new Date(assignment.dueDate).toLocaleString()}\n\nPlease check your portal for more details.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email notification sent successfully.");
  } catch (error) {
    console.error("Error sending email notification:", error.message);
  }
};

exports.uploadAssignment = async (req, res) => {
  try {
    const { title, description, classroomId, dueDate, assignmentType, topic } = req.body;

    const classroom = await Classroom.findById(classroomId).populate("students");
    if (!classroom) return res.status(404).json({ message: "Classroom not found" });

    const assignment = new Assignment({
      title,
      description,
      classroomId,
      dueDate,
      assignmentType,
      topic: assignmentType === "quiz" ? topic : null,
    });

    await assignment.save();

    classroom.assignments.push(assignment._id);
    await classroom.save();

    const studentEmails = classroom.students.map((student) => student.email);

    if (studentEmails.length > 0) {
      await sendEmailNotification(studentEmails, assignment);
    }

    res.status(201).json({ message: "Assignment uploaded successfully and emails sent!", assignment });
  } catch (error) {
    console.error("Error uploading assignment:", error);
    res.status(500).json({ message: "Error uploading assignment", error: error.message });
  }
};


// Get all assignments for a classroom
exports.getClassroomAssignments = async (req, res) => {
  try {
    const { classroomId } = req.params;

    // Validate that the classroom exists and populate assignments
    const classroom = await Classroom.findById(classroomId).populate("assignments");
    if (!classroom) return res.status(404).json({ message: "Classroom not found" });

    res.status(200).json({ assignments: classroom.assignments });
  } catch (error) {
    console.error("Error fetching assignments:", error);  // Log error to console
    res.status(500).json({ message: "Error fetching assignments", error: error.message });
  }
};
