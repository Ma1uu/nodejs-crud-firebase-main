import express from "express";
import * as alunosController from "../controllers/AlunosController.js";

const router = express.Router();

router.get("/", alunosController.list);
router.get("/add", alunosController.createForm);
router.post("/add", alunosController.create);

export default router;