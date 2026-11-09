// server.js - Servidor Express Completo (Programação Back-End I - Exercício 08)
require('dotenv').config();
const express = require('express');
const supabase = require('./src/config/supabaseClient');

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3008;

// 1. Rota GET Global: Buscar TODOS os medicamentos
app.get('/medicamentos', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('medicamentos_receita')
      .select('*');

    if (error) {
      return res.status(500).json({ erro: 'Erro no banco de dados', detalhe: error.message });
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ erro: 'Falha interna no servidor' });
  }
});

// 2. Rota GET Específica: Filtrar apenas medicamentos controlados (tarja_preta = true)
app.get('/medicamentos/controlados', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('medicamentos_receita')
      .select('*')
      .eq('tarja_preta', true);

    if (error) {
      return res.status(500).json({ erro: 'Erro no banco de dados', detalhe: error.message });
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ erro: 'Falha interna no servidor' });
  }
});

// 3. Rota GET por ID: Buscar um medicamento específico com tratamento de erro 404
app.get('/medicamentos/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('medicamentos_receita')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return res.status(404).json({ erro: 'Medicamento não foi encontrado' });
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ erro: 'Falha na busca do recurso' });
  }
});

// Inicialização da escuta do servidor HTTP
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando com sucesso na porta ${PORT}`);
  console.log(`📡 Endpoints disponíveis: http://localhost:${PORT}/medicamentos`);
});