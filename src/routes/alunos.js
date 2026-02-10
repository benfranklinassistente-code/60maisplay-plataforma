const express = require('express');
const router = express.Router();

// Mock de dados de alunos
let alunos = [
    {
        id: 1,
        nome: 'Dona Maria',
        email: 'maria@email.com',
        telefone: '(11) 99999-9999',
        cidade: 'São Paulo',
        estado: 'SP',
        nivel_conhecimento: 'iniciante',
        ativo: true,
        data_cadastro: '2026-02-10T10:00:00Z',
        cursos_matriculados: 2
    },
    {
        id: 2,
        nome: 'Seu Joaquim',
        email: 'joaquim@email.com',
        telefone: '(11) 98888-8888',
        cidade: 'São Paulo',
        estado: 'SP',
        nivel_conhecimento: 'iniciante',
        ativo: true,
        data_cadastro: '2026-02-10T11:00:00Z',
        cursos_matriculados: 1
    }
];

// GET /api/alunos - Listar alunos
router.get('/', (req, res) => {
    const { ativo, cidade } = req.query;
    
    let resultado = alunos;
    
    if (ativo !== undefined) {
        resultado = resultado.filter(a => a.ativo === (ativo === 'true'));
    }
    if (cidade) {
        resultado = resultado.filter(a => a.cidade.toLowerCase().includes(cidade.toLowerCase()));
    }
    
    res.json({
        success: true,
        count: resultado.length,
        data: resultado
    });
});

// GET /api/alunos/:id - Buscar aluno específico
router.get('/:id', (req, res) => {
    const aluno = alunos.find(a => a.id === parseInt(req.params.id));
    
    if (!aluno) {
        return res.status(404).json({
            success: false,
            message: 'Aluno não encontrado'
        });
    }
    
    res.json({
        success: true,
        data: aluno
    });
});

// POST /api/alunos - Criar novo aluno (cadastro)
router.post('/', (req, res) => {
    const { nome, email, telefone, cidade, estado } = req.body;
    
    if (!nome || !email) {
        return res.status(400).json({
            success: false,
            message: 'Nome e email são obrigatórios'
        });
    }
    
    // Verificar se email já existe
    if (alunos.find(a => a.email === email)) {
        return res.status(400).json({
            success: false,
            message: 'Email já cadastrado'
        });
    }
    
    const novoAluno = {
        id: alunos.length + 1,
        nome,
        email,
        telefone: telefone || '',
        cidade: cidade || '',
        estado: estado || '',
        nivel_conhecimento: 'iniciante',
        ativo: true,
        data_cadastro: new Date().toISOString(),
        cursos_matriculados: 0
    };
    
    alunos.push(novoAluno);
    
    res.status(201).json({
        success: true,
        message: 'Aluno cadastrado com sucesso',
        data: novoAluno
    });
});

// GET /api/alunos/:id/cursos - Cursos do aluno
router.get('/:id/cursos', (req, res) => {
    const aluno = alunos.find(a => a.id === parseInt(req.params.id));
    
    if (!aluno) {
        return res.status(404).json({
            success: false,
            message: 'Aluno não encontrado'
        });
    }
    
    // Mock de matrículas
    const cursosMatriculados = [
        {
            curso_id: 1,
            titulo: 'WhatsApp Seguro para Idosos 60+',
            progresso: 45,
            status: 'em_andamento',
            ultimo_acesso: '2026-02-10T14:30:00Z'
        }
    ];
    
    res.json({
        success: true,
        aluno_id: aluno.id,
        aluno_nome: aluno.nome,
        data: cursosMatriculados
    });
});

module.exports = router;
