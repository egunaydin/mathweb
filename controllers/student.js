import pool from "../database/keys";
import cloudinary from "../lib/cloudinary";

const student = {};

student.getCourses = async (req, res) => {
  try {
    const courses = await (
      await pool.query("SELECT * FROM professor_course;")
    ).rows;
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({
      message: "An error has occured",
      error,
    });
  }
};

student.joinCourse = async (req, res) => {
  const id = req.body.id;
  const id_c = req.params.id_c;
  try {
    await pool.query("INSERT INTO student_courses VALUES ($1,$2)", [id, id_c]);
    res.status(200).json({
      message: "Joined the course",
      course: { id_c },
    });
  } catch (error) {
    res.status(500).json({
      message: "An error has occured",
      error,
    });
  }
};

student.getMyCourses = async (req, res) => {
  const id = req.body.id;
  try {
    const courses = await (
      await pool.query(
        "SELECT * FROM professor_course JOIN (SELECT * FROM student_courses WHERE s_id=$1) AS s ON id_c=c_id",
        [id]
      )
    ).rows;
    res.send(courses);
  } catch (error) {
    res.status(500).json({
      message: "An error has occured",
      error,
    });
  }
};

student.getAssignments = async (req, res) => {
  const id_c = req.params.id_c;
  try {
    const course = await (
      await pool.query("SELECT * FROM professor_course WHERE id_c=$1", [id_c])
    ).rows;
    const assignments = await (
      await pool.query("SELECT * FROM assignment WHERE c_id=$1", [id_c])
    ).rows;
    res.status(200).json({
      assignments,
      course,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error has occured",
      error,
    });
  }
};

student.addDelivery = async (req, res) => {
  const { id, id_a } = req.body;
  const d_filename = req.files.d_file.name;
  const d_file = await cloudinary(req.files.d_file.tempFilePath);
  try {
    await pool.query(
      "INSERT INTO delivery(a_id , s_id , d_file , d_filename) VALUES($1,$2,$3,$4)",
      [id_a, id, d_file, d_filename]
    );
    res.status(200).json({
      message: "Succesfully added delivery",
      d_file,
      d_filename,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error has occured",
      error,
    });
  }
};
module.exports = student;
