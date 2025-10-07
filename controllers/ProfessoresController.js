// Importa a instância do Realtime Database já inicializada (config/firebase.js)
import { db } from "../config/firebase.js";

// Importa funções do Web SDK do Realtime Database usadas no CRUD
import { ref, push, set, onValue } from "firebase/database";

// Cria uma referência "raiz" para o nó/coleção "alunos" no banco
const rootRef = ref(db, "professores");

// Exporta o controller como módulo ES (usado nas rotas)

  // [READ] Lista todas os alunos
  export function list(req, res) {
  const professoresRef = ref(db, "professores");
  onValue(professoresRef, (snapshot) => {
    const data = snapshot.val();
    const professores = data ? Object.values(data) : [];
    res.render("base", {
      title: "Lista de Professores",
      view: "professores/show",
      professores
    });
  }, { onlyOnce: true });
}

  // Mostra o formulário de criação
  export function createForm(req, res) {
    // Apenas renderiza a página de criação
    res.render("base", {
      title: " Adicionar Professores",
      view: "professores/add",
    });
  }

  // [CREATE - ACTION] Cria um aluno novo
  export async function create(req, res) {
    try {
      const { nome, descricao } = req.body;
      const professoresRef = ref(db, "professores");
      const novo = push(professoresRef); // Cria um novo registro com ID único
        await set(novo, { nome, descricao }); // Salva os dados no DB 
          res.redirect("/professores");  
    } catch (e) {
      console.error("Erro ao realizar cadastro de professor", e);
      res.status(500).send("Erro ao cadastrar professor");
    }
   
  }
