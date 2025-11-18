import express from "express";
import path from "path";
import morgan from "morgan";
import { fileURLToPath } from "url";
import { dirname } from "path";
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, "public"))); //arquivos estaticos (css, js, imagens)

//configuração do EJS como view
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));// arquivos estáticos

//Rota principal
import indexRouter from "./routes/index.js";
app.use("/", indexRouter);

//Rota de categoria
import categoriaRouter from "./routes/categorias.js";
app.use("/categorias", categoriaRouter); //todas as rotas que comecarem com /categoria vao ser direcionadas para o categoriaRouter

//Rota de alunos
import alunosRouter from "./routes/alunos.js";
app.use("/alunos", alunosRouter);

//Rota de cursos
import cursosRouter from "./routes/cursos.js";
app.use("/cursos", cursosRouter);

import equipeRouter from "./routes/equipe.js";
app.use("/equipe", equipeRouter);

import professoresRouter from "./routes/professores.js";
app.use("/professores", professoresRouter);

//rodar o server
app.listen(3000, () => {
    console.log("Servidor em execução - porta 3000");
});

app.use((req, res) => {
  res.status(404).render("notfound", { title: "Página não encontrada" });
});