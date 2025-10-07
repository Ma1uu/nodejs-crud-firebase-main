import express from "express";
import * as cursosController from "../controllers/CursosController.js";

const router = express.Router();

//listar curso
router.get("/", cursosController.list);

//edit curso
router.get("/edit", async (req, res)=> {  // router - rota | "/edit" - rota atual | render - montar/construir
    res.render("base", {
        title: "Editar Cursos",
        view: "cursos/edit",
    })
});

//add curso
router.get("/add", cursosController.createForm);

router.post("/add", cursosController.create);

export default router;