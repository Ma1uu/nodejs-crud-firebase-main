
// Importa a instância do Realtime Database já inicializada (config/firebase.js)
import { db } from "../config/firebase.js";

// Importa funções do Web SDK do Realtime Database usadas no CRUD
import { ref, push, set, onValue } from "firebase/database";

// Cria uma referência "raiz" para o nó/coleção "cursos" no banco
const rootRef = ref(db, "cursos");

// Exporta o controller como módulo ES (usado nas rotas)

  // [READ] Lista todas os alunos
  export function list(req, res) {
  const cursosRef = ref(db, "cursos");
  onValue(cursosRef, (snapshot) => {
    const data = snapshot.val();
    const cursos = data ? Object.values(data) : [];
    res.render("base", {
      title: "Lista de Cursos",
      view: "cursos/show",
      cursos 
    });
  }, { onlyOnce: true });
}

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
