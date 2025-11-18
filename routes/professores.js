import express from "express";
import * as professoresController from "../controllers/professoresController.js";

const router = express.Router();

//listar professor
router.get("/", professoresController.list);

// edit professor - carrega formulário com dados (id via query: ?id=...)
router.get("/edit", professoresController.editForm);
// atualiza professor (form POST)
router.post("/edit", professoresController.update);
// remove professor (form POST)
router.post("/delete", professoresController.removeById);

//add professor
router.get("/add", professoresController.createForm);

router.post("/add", professoresController.create);

export default router;