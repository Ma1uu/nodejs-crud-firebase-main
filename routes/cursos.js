import express from "express";
import cursosController from "../controllers/CursosController.js";

const router = express.Router();

//listar categoria
router.get("/", async (req, res)=> {  // router - rota | "/" - rota raiz | render - montar/construir
    res.render("base", {
        title: "Listar Cursos",
        view: "cursos/show",
    })
});

//edit categoria
router.get("/edit", async (req, res)=> {  // router - rota | "/edit" - rota atual | render - montar/construir
    res.render("base", {
        title: "Editar Cursos",
        view: "cursos/edit",
    })
});

//add categoria
router.get("/add", cursosController.createForm);

router.post("/add", cursosController.create);

export default router;