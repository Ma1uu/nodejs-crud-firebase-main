// Importa a instância do Realtime Database já inicializada (config/firebase.js)
import { db } from "../config/firebase.js";

// Importa funções do Web SDK do Realtime Database usadas no CRUD
import { ref, push, set, onValue } from "firebase/database";

// Cria uma referência "raiz" para o nó/coleção "alunos" no banco
const rootRef = ref(db, "alunos");

// Exporta o controller como módulo ES (usado nas rotas)

  // [READ] Lista todas os alunos  
  export function list(req, res) {
    const alunosRef = ref(db, "alunos");
    onValue(alunosRef, (snapshot) => {
      const data = snapshot.val();
      const alunos = data ? Object.values(data) : [];
      res.render("base", {
        title: "Lista de Alunos",
        view: "alunos/show", 
        alunos 
      });
    }, {onlyOnce: true})
  }

  // Mostra o formulário de criação
  export function createForm(req, res) {
    // Apenas renderiza a página de criação
    res.render("base", {
      title: " Adicionar Alunos",
      view: "alunos/add",
    });
  }

  // [CREATE - ACTION] Cria um aluno novo
  export async function create(req, res) {
    try {
      const { nome, matricula } = req.body;
      const alunosRef = ref(db, "alunos");
      const novo = push(alunosRef); // Cria um novo registro com ID único
        await set(novo, { nome, matricula }); // Salva os dados no DB 
          res.redirect("/alunos");  
    } catch (e) {
      console.error("Erro ao realizar cadastro de aluno", e);
      res.status(500).send("Erro ao cadastrar aluno");
    }
   
  }

  // [UPDATE - FORM] Carrega dados para edição de um aluno específico
  export function editForm(req, res) {
    const { id } = req.query;
    if (!id) return res.status(400).send("ID do aluno não fornecido");
    const itemRef = ref(db, `alunos/${id}`);
    onValue(itemRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return res.status(404).send("Aluno não encontrado");
      res.render("base", {
        title: "Editar Aluno",
        view: "alunos/edit",
        aluno: { id, ...data }
      });
    }, { onlyOnce: true });
}

// [UPDATE - ACTION] Salva a edição de um aluno
export async function update(req, res) {
  try {
    const { id, nome, matricula } = req.body;
    if (!id) return res.status(400).send("ID do aluno não fornecido");
    const itemRef = ref(db, `alunos/${id}`);
    await set(itemRef, { nome, matricula });
    res.redirect("/alunos");
  } catch (e) {
    console.error("Erro ao atualizar aluno", e);
    res.status(500).send("Erro ao atualizar aluno");
  }
}

// [DELETE] Remove um aluno pelo id
export async function removeById(req, res) {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).send("ID do aluno não fornecido");
    const itemRef = ref(db, `alunos/${id}`);
    await remove(itemRef);
    res.redirect("/alunos");
  } catch (e) {
    console.error("Erro ao remover aluno", e);
    res.status(500).send("Erro ao remover aluno");
  }
}