import express from "express";
import * as alunosController from "../controllers/alunosController.js";

const router = express.Router();

//listar aluno
router.get("/", alunosController.list);

// edit aluno - carrega formulário com dados (id via query: ?id=...)
router.get("/edit", alunosController.editForm);
// atualiza aluno (form POST)
router.post("/edit", alunosController.update);
// remove aluno (form POST)
router.post("/delete", alunosController.removeById);

//add aluno
router.get("/add", alunosController.createForm);

router.post("/add", alunosController.create);

export default router;