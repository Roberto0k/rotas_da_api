// index.js
const express = require('express');
const app = express();
const port = 3000;

// Middleware para interpretar o corpo das requisições como JSON
app.use(express.json());

// Rota de teste
app.get('/', (req, res) => {
  res.send('API funcionando!');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

// Simulando um banco de dados com um array
let tarefas = [
    { id: 1, descricao: 'Estudar Node.js' },
    { id: 2, descricao: 'Fazer exercícios' }
  ];
  
  // Rota GET para obter todas as tarefas
  app.get('/tarefas', (req, res) => {
    res.json(tarefas);
  });
  
  // Rota GET para obter uma tarefa específica
  app.get('/tarefas/:id', (req, res) => {
    const tarefa = tarefas.find(t => t.id === parseInt(req.params.id));
    
    if (!tarefa) {
      return res.status(404).send('Tarefa não encontrada!');
    }
    
    res.json(tarefa);
  });
  
  // Rota POST para criar uma nova tarefa
  app.post('/tarefas', (req, res) => {
    const { descricao } = req.body;
    
    if (!descricao) {
      return res.status(400).send('Descrição é obrigatória!');
    }
    
    const tarefa = {
      id: tarefas.length + 1,
      descricao
    };
    
    tarefas.push(tarefa);
    res.status(201).json(tarefa);
  });
  
  // Rota PUT para atualizar uma tarefa
  app.put('/tarefas/:id', (req, res) => {
    const tarefa = tarefas.find(t => t.id === parseInt(req.params.id));
    
    if (!tarefa) {
      return res.status(404).send('Tarefa não encontrada!');
    }
    
    const { descricao } = req.body;
    
    if (descricao) {
      tarefa.descricao = descricao;
      return res.json(tarefa);
    } else {
      return res.status(400).send('Descrição é obrigatória!');
    }
  });
  
  // Rota DELETE para remover uma tarefa
  app.delete('/tarefas/:id', (req, res) => {
    const index = tarefas.findIndex(t => t.id === parseInt(req.params.id));
    
    if (index === -1) {
      return res.status(404).send('Tarefa não encontrada!');
    }
    
    tarefas.splice(index, 1);
    res.status(204).send();
  });

//   Explicação das rotas
//   a) GET /tarefas
//   Retorna todas as tarefas. O método GET é utilizado para ler dados.
  
//   b) GET /tarefas/:id
//   Retorna uma tarefa específica, onde :id é um parâmetro de rota. O GET também serve para leitura, mas nesse caso, buscamos um item específico.
  
//   c) POST /tarefas
//   Cria uma nova tarefa. O método POST é utilizado para criar novos recursos. O corpo da requisição (req.body) deve conter a descrição da tarefa.
  
//   d) PUT /tarefas/:id
//   Atualiza uma tarefa existente. O método PUT é utilizado para substituir ou modificar dados existentes. Aqui, buscamos a tarefa com o ID informado e atualizamos sua descrição.
  
//   e) DELETE /tarefas/:id
//   Deleta uma tarefa específica. O método DELETE remove um recurso com base no ID passado na URL.