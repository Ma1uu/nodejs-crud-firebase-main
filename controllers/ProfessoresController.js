// Importa a instância do Realtime Database já inicializada (config/firebase.js)
import { db } from "../config/firebase.js";

// Importa funções do Web SDK do Realtime Database usadas no CRUD
import { ref, push, set, onValue, remove } from "firebase/database";

// Cria uma referência "raiz" para o nó/coleção "alunos" no banco
const rootRef = ref(db, "professores");

// Exporta o controller como módulo ES (usado nas rotas)

  // [READ] Lista todas os alunos
  export function list(req, res) {
    const professoresRef = ref(db, "professores");
    onValue(professoresRef, (snapshot) => {
      const data = snapshot.val();
      const professores = data ? Object.entries(data).map(([id, value]) => ({ id, ...value })) : [];
      res.render("base", {
        title: "Lista de Professores",
        view: "professores/show", 
        professores 
      });
    }, {onlyOnce: true})
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
  // [UPDATE - FORM] Carrega dados para edição de um professor específico
  export function editForm(req, res) {
    const { id } = req.query;
    if (!id) return res.status(400).send("ID do professor não fornecido");
    const itemRef = ref(db, `professores/${id}`);
    onValue(itemRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return res.status(404).send("Professor não encontrado");
      res.render("base", {
        title: "Editar Professor",
        view: "professores/edit",
        professor: { id, ...data }
      });
    }, { onlyOnce: true });
  }

  // [UPDATE - ACTION] Salva a edição de um professor
  export async function update(req, res) {
    try {
      const { id, nome, descricao } = req.body;
      if (!id) return res.status(400).send("ID do professor não fornecido");
      const itemRef = ref(db, `professores/${id}`);
      await set(itemRef, { nome, descricao });
      res.redirect("/professores");
    } catch (e) {
      console.error("Erro ao atualizar professor", e);
      res.status(500).send("Erro ao atualizar professor");
    }
  }

  // [DELETE] Remove um professor pelo id
  export async function removeById(req, res) {
    try {
      const { id } = req.body;
      if (!id) return res.status(400).send("ID do professor não fornecido");
      const itemRef = ref(db, `professores/${id}`);
      await remove(itemRef);
      res.redirect("/professores");
    } catch (e) {
      console.error("Erro ao remover professor", e);
      res.status(500).send("Erro ao remover professor");
    }
  }