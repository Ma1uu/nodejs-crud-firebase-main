import { db } from "../config/firebase.js";
import { ref, get } from "firebase/database";

export async function list(req, res) {
  try {
    const alunosRef = ref(db, "alunos");
    const snapshot = await get(alunosRef);
    const data = snapshot.val();
    const alunos = data ? Object.values(data) : [];
    res.render("base", {
      title: "Lista de Alunos",
      view: "alunos/show",
      alunos
    });
  } catch (error) {
    console.error("Erro ao listar alunos:", error);
    res.status(500).send("Erro ao carregar alunos");
  }
}

export function createForm(req, res) {
  res.render("base", {
    title: "Adicionar Alunos",
    view: "alunos/add"
  });
}

export async function create(req, res) {
  try {
    const { nome, descricao } = req.body;
    const alunosRef = ref(db, "alunos");
    const novo = push(alunosRef);
    await set(novo, { nome, descricao });
    res.redirect("/alunos");
  } catch (error) {
    console.error("Erro ao cadastrar aluno:", error);
    res.status(500).send("Erro ao cadastrar aluno");
  }
}
  // [UPDATE - FORM] Carrega dados para edição de uma categoria específica

  // [UPDATE - ACTION] Salva a edição de uma categoria

  // [DELETE] Remove uma categoria pelo id

