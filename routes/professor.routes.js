import express from "express";
import professor from "../controllers/professor";

const router = express.Router();

router.post("/course", professor.createCourse);

router.get("/course/:id_c", professor.readCourse);

router.put("/course/:id_c", professor.updateCourse);

module.exports = router;
