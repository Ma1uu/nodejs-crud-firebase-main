// Importa a instância do Realtime Database já inicializada (config/firebase.js)
import { db } from "../config/firebase.js";

// Importa funções do Web SDK do Realtime Database usadas no CRUD
import { ref, get, push, set, child, update, remove } from "firebase/database";

// Cria uma referência "raiz" para o nó/coleção "alunos" no banco
const rootRef = ref(db, "alunos");

// Exporta o controller como módulo ES (usado nas rotas)
export default {
  // [READ] Lista todas os alunos
  async list(req, res) {
    res.render("alunos/show", {
      title: "Lista de Alunos",
    });
  },

  // [CREATE - FORM] Mostra o formulário de criação (sem acessar o DB)
  createForm(req, res) {
    // Apenas renderiza a página de criação
    res.render("base", { 
      title: "Novo Aluno",
      view: "alunos/add" 
    });
  },

  // [CREATE - ACTION] Cria um aluno novo
  async create(req, res) {
    try {
    const { nome, descricao } = req.body;
    const novo = push(rootRef); // Cria um novo registro com ID único
    await set(novo, { nome, descricao }); // Salva os dados no DB 
      res.redirect("/alunos");  
    } catch (e) {
      console.error("Erro ao realizar cadastro de aluno", e);
      res.status(500).send("Erro ao cadastrar aluno");
    }
   
  },

  // [UPDATE - FORM] Carrega dados para edição de uma categoria específica

  // [UPDATE - ACTION] Salva a edição de uma categoria

  // [DELETE] Remove uma categoria pelo id
};
