import express from "express";
import tarefas from "./dados.js";

const app = express();
const PORTA = 3000;

app.use(express.json());

app.listen(PORTA, () => {
  console.log(`Servidor rodando na porta ${PORTA}`);
});

app.get ("/", (req, res) => {
  res.send("Bem-vindo à API de Tarefas!" );
});

app.get("/tarefas", (req, res) => {
  res.status(200).json(tarefas);
});

app.post("/tarefas", (req, res) => {
  const { titulo } = req.body;

  // validação
  if (!titulo || titulo.trim() === "") {
    return res.status(400).json({ erro: "Título é obrigatório." });
  }

  const novaTarefa = {
    id: tarefas.length + 1,
    titulo,
    concluida: false
  };

  tarefas.push(novaTarefa);

  res.status(201).json(novaTarefa);
});

app.put("/tarefas/:id", (req, res) => {
  const { id } = req.params;
  const { titulo, concluida } = req.body;

  const tarefa = tarefas.find(t => t.id == id);

  if (!tarefa) {
    return res.status(404).json({ erro: "Tarefa não encontrada" });
  }

  // Atualiza apenas se vier no body
  if (titulo !== undefined) tarefa.titulo = titulo;
  if (concluida !== undefined) tarefa.concluida = concluida;

  res.status(200).json(tarefa);
});

app.delete("/tarefas/:id", (req, res) => {
  const { id } = req.params;

  const index = tarefas.findIndex(t => t.id == id);

  if (index === -1) {
    return res.status(404).json({ erro: "Tarefa não encontrada" });
  }

  tarefas.splice(index, 1);

  res.status(200).json({ mensagem: "Tarefa removida com sucesso" });
});