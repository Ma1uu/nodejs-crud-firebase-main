import express from "express";
const router = express.Router();

//página inicial
router.get("/", async (req, res) => {  // router - rota | "/" - rota raiz | render - montar/construir
    res.render("base", {
        title: "Página Inicial",
        view: "index",
    });
});

export default router;