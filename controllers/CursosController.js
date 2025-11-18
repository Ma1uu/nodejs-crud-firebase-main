// Importa a instância do Realtime Database já inicializada (config/firebase.js)
import { db } from "../config/firebase.js";

// Importa funções do Web SDK do Realtime Database usadas no CRUD
import { ref, push, set, onValue, remove } from "firebase/database";

// Cria uma referência "raiz" para o nó/coleção "cursos" no banco
const rootRef = ref(db, "cursos");

// Exporta o controller como módulo ES (usado nas rotas)

  // [READ] Lista todas os alunos
  export function list(req, res) {
    const cursosRef = ref(db, "cursos");
    onValue(cursosRef, (snapshot) => {
      const data = snapshot.val();
      const cursos = data ? Object.entries(data).map(([id, value]) => ({ id, ...value })) : [];
      res.render("base", {
        title: "Lista de Cursos",
        view: "cursos/show", 
        cursos 
      });
    }, {onlyOnce: true})
  }

  // Mostra o formulário de criação
  export function createForm(req, res) {
    // Apenas renderiza a página de criação
    res.render("base", {
      title: " Adicionar Cursos",
      view: "cursos/add",
    });
  }

  // [CREATE - ACTION] Cria um curso novo
  export async function create(req, res) {
    try {
      const { nome, descricao } = req.body;
      const cursosRef = ref(db, "cursos");
      const novo = push(cursosRef); // Cria um novo registro com ID único
        await set(novo, { nome, descricao }); // Salva os dados no DB 
          res.redirect("/cursos");  
    } catch (e) {
      console.error("Erro ao realizar cadastro de curso", e);
      res.status(500).send("Erro ao cadastrar curso");
    }
   
  }
  // [UPDATE - FORM] Carrega dados para edição de um curso específico
  export function editForm(req, res) {
    const { id } = req.query;
    if (!id) return res.status(400).send("ID do curso não fornecido");
    const itemRef = ref(db, `cursos/${id}`);
    onValue(itemRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return res.status(404).send("Curso não encontrado");
      res.render("base", {
        title: "Editar Curso",
        view: "cursos/edit",
        curso: { id, ...data }
      });
    }, { onlyOnce: true });
  }

  // [UPDATE - ACTION] Salva a edição de um curso
  export async function update(req, res) {
    try {
      const { id, nome, descricao } = req.body;
      if (!id) return res.status(400).send("ID do curso não fornecido");
      const itemRef = ref(db, `cursos/${id}`);
      await set(itemRef, { nome, descricao });
      res.redirect("/cursos");
    } catch (e) {
      console.error("Erro ao atualizar curso", e);
      res.status(500).send("Erro ao atualizar curso");
    }
  }

  // [DELETE] Remove um curso pelo id
  export async function removeById(req, res) {
    try {
      const { id } = req.body;
      if (!id) return res.status(400).send("ID do curso não fornecido");
      const itemRef = ref(db, `cursos/${id}`);
      await remove(itemRef);
      res.redirect("/cursos");
    } catch (e) {
      console.error("Erro ao remover curso", e);
      res.status(500).send("Erro ao remover curso");
    }
  }