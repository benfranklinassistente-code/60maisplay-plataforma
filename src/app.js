require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Configurações
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Rotas
app.get('/', (req, res) => {
    res.json({
        message: 'Bem-vindo à Plataforma 60maisPlay',
        version: '1.0.0',
        endpoints: {
            cursos: '/api/cursos',
            alunos: '/api/alunos',
            matriculas: '/api/matriculas',
            progresso: '/api/progresso'
        }
    });
});

// Rotas da API
const cursosRoutes = require('./src/routes/cursos');
const alunosRoutes = require('./src/routes/alunos');
const matriculasRoutes = require('./src/routes/matriculas');
const progressoRoutes = require('./src/routes/progresso');

app.use('/api/cursos', cursosRoutes);
app.use('/api/alunos', alunosRoutes);
app.use('/api/matriculas', matriculasRoutes);
app.use('/api/progresso', progressoRoutes);

// Rota de health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 60maisPlay rodando na porta ${PORT}`);
    console.log(`📚 API: http://localhost:${PORT}/api`);
});

module.exports = app;
