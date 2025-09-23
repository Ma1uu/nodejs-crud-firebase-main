import express from "express";
import alunosController from "../controllers/AlunosController.js";

const router = express.Router();

//listar categoria
router.get("/", async (req, res)=> {  // router - rota | "/" - rota raiz | render - montar/construir
    res.render("base", {
        title: "Listar Alunos",
        view: "alunos/show",
    })
});

//edit categoria
router.get("/edit", async (req, res)=> {  // router - rota | "/edit" - rota atual | render - montar/construir
    res.render("base", {
        title: "Editar Alunos",
        view: "alunos/edit",
    })
});

//add categoria
router.get("/add", alunosController.createForm);

router.post("/add", alunosController.create);

export default router;