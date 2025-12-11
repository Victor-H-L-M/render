const express = require('express');   
const cors = require('cors');
require('dotenv').config();
const supabase = require('./db');
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get('/api/recados', async (req, res) => {
  const { data, error } = await supabase
    .from('recados')
    .select(`id, mensagem, usuario_id (nome)`);
  if (error) return res.status(500).json(error);
  res.json(data);
});

app.post('/api/recados', async (req, res) => {
  const { mensagem, usuario_id } = req.body;
  const { data, error } = await supabase
    .from('recados')
    .insert([{ mensagem, usuario_id }])
    .select()
    .single();
  if (error) return res.status(500).json(error);
  res.status(201).json(data);
});

app.post('/api/usuario_id', async (req, res) => {
  const { nome } = req.body;
  const { data, error } = await supabase
    .from('usuarios')
    .insert([{ nome }])
    .select()
    .single();
  if (error) return res.status(500).json(error);
  res.status(201).json(data);
});

app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));
