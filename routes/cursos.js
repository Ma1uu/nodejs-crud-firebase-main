import express from "express";
import * as cursosController from "../controllers/cursosController.js";

const router = express.Router();

//listar curso
router.get("/", cursosController.list);

// edit curso - carrega formulário com dados (id via query: ?id=...)
router.get("/edit", cursosController.editForm);
// atualiza curso (form POST)
router.post("/edit", cursosController.update);
// remove curso (form POST)
router.post("/delete", cursosController.removeById);

//add curso
router.get("/add", cursosController.createForm);

router.post("/add", cursosController.create);

export default router;