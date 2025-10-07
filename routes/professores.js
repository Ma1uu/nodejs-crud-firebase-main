import express from "express";
import * as professoresController from "../controllers/ProfessoresController.js";

const router = express.Router();

//listar professor
router.get("/", professoresController.list);

//edit professor
router.get("/edit", async (req, res)=> {  // router - rota | "/edit" - rota atual | render - montar/construir
    res.render("base", {
        title: "Editar Professores",
        view: "professores/edit",
    })
});

//add professor
router.get("/add", professoresController.createForm);

router.post("/add", professoresController.create);

export default router;