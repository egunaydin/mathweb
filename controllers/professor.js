import pool from "../database/keys";
import cloudinary from "../lib/cloudinary";

const professor = {};

// ! Courses

professor.createCourse = async (req, res) => {
  const { id, c_name, c_description } = req.body;
  try {
    await pool.query(
      "INSERT INTO course(p_id , c_name , c_description) VALUES($1,$2,$3)",
      [id, c_name, c_description]
    );
    res.status(200).json({
      message: "Succesfully added course",
      course: { id, c_name, c_description },
    });
  } catch (error) {}
};

professor.readCourse = async (req, res) => {
  const id = req.params.id_c;
  try {
    const course = await (
      await pool.query("SELECT * FROM course WHERE id_c = $1", [id])
    ).rows[0];
    res.status(200).json({
      course,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error has occured",
      error,
    });
  }
};

professor.updateCourse = async (req, res) => {
  const id = req.params.id_c;
  const { c_name, c_description } = req.body;
  try {
    await pool.query(
      "UPDATE course SET c_name = $1 , c_description=$2 WHERE id_c =$3",
      [c_name, c_description, id]
    );
    res.status(200).json({
      message: "Successfully updated course",
      course: { c_name, c_description },
    });
  } catch (error) {
    res.status(500).json({
      message: "An error has occurred",
      error,
    });
  }
};

professor.deleteCourse = async (req, res) => {
  const id = req.params.id_c;
  try {
    await pool.query("DELETE FROM course WHERE id_c = $1", [id]);
    res.status(200).json({
      message: "Successfully deleted course",
    });
  } catch (error) {
    res.status(500).json({
      message: "An error has occurred",
      error,
    });
  }
};

professor.getCourses = async (req, res) => {
  const { id } = req.body;
  try {
    const courses = await (
      await pool.query("SELECT * FROM course WHERE p_id=$1", [id])
    ).rows;
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({
      message: "An error has occurred",
      error,
    });
  }
};

// ! Assignments

professor.createAssignment = async (req, res) => {
  const id_c = req.params.id_c;
  const { a_name, a_description } = req.body;
  const file = await cloudinary(req.files.a_file.tempFilePath);
  console.log(req.files.a_file);
  try {
    await pool.query(
      "INSERT INTO assignment(c_id , a_name , a_description , a_file) VALUES($1,$2,$3,$4)",
      [id_c, a_name, a_description, file]
    );
    res.status(200).json({
      message: "Succesfully added assignment",
      assignment: { a_name, a_description, file },
    });
  } catch (error) {
    res.status(500).json({
      message: "An error has occured",
      error,
    });
  }
};

professor.getAssignments = async (req, res) => {
  const id_c = req.params.id_c;
  try {
    const assignments = await (
      await pool.query("SELECT * FROM assignment WHERE c_id=$1", [id_c])
    ).rows;
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({
      message: "An error has occured",
      error,
    });
  }
};

// ! Deliveries

professor.getDeliveries = async (req, res) => {
  const id_a = req.params.id_a;
  try {
    const deliveries = await (
      await pool.query(
        "SELECT * FROM delivery JOIN(SELECT id_s,s_name FROM student) AS s ON s_id=id_s WHERE a_id=$1",
        [id_a]
      )
    ).rows;
    res.status(200).json(deliveries);
  } catch (error) {
    res.status(500).json({
      message: "An error has occured",
      error,
    });
  }
};
module.exports = professor;
