import express from "express";
import tarefas from "./dados.js";

const app = express();
const PORTA = 3000;

app.use(express.json());

app.listen(PORTA, () => {
  console.log(`Servidor rodando na porta ${PORTA}`);
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