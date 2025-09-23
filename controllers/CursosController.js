
import { db } from "../config/firebase.js";

import { ref, get, push, set, child, update, remove } from "firebase/database";

const rootRef = ref(db, "cursos");

export default {
  async list(req, res) {
    res.render("base", {
      title: "Adicionar Cursos",
      view: "cursos/add"
    });
  },

  createForm(req, res) {
    res.render("base", { 
      title: "Novo Curso",
      view: "cursos/add" 
    });
  },

  async create(req, res) {
    try {
    const { nome, descricao } = req.body;
    const novo = push(rootRef); 
    await set(novo, { nome }); 
      res.redirect("/cursos");  
    } catch (e) {
      console.error("Erro ao realizar cadastro de curso", e);
      res.status(500).send("Erro ao cadastrar curso");
      res.status(500).send("Erro ao cadastrar curso");
    }
   
  },
};