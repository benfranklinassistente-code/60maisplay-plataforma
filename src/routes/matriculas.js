const express = require('express');
const router = express.Router();

// Mock de matrículas
let matriculas = [
    {
        id: 1,
        aluno_id: 1,
        curso_id: 1,
        status: 'ativo',
        progresso_percentual: 45,
        data_matricula: '2026-02-10T10:00:00Z',
        valor_pago: 47.00
    },
    {
        id: 2,
        aluno_id: 1,
        curso_id: 2,
        status: 'ativo',
        progresso_percentual: 0,
        data_matricula: '2026-02-10T10:05:00Z',
        valor_pago: 47.00
    }
];

// POST /api/matriculas - Criar nova matrícula
router.post('/', (req, res) => {
    const { aluno_id, curso_id, valor_pago } = req.body;
    
    if (!aluno_id || !curso_id) {
        return res.status(400).json({
            success: false,
            message: 'aluno_id e curso_id são obrigatórios'
        });
    }
    
    // Verificar se já existe matrícula
    const existente = matriculas.find(m => 
        m.aluno_id === aluno_id && m.curso_id === curso_id
    );
    
    if (existente) {
        return res.status(400).json({
            success: false,
            message: 'Aluno já matriculado neste curso'
        });
    }
    
    const novaMatricula = {
        id: matriculas.length + 1,
        aluno_id,
        curso_id,
        status: 'ativo',
        progresso_percentual: 0,
        data_matricula: new Date().toISOString(),
        valor_pago: valor_pago || 0
    };
    
    matriculas.push(novaMatricula);
    
    res.status(201).json({
        success: true,
        message: 'Matrícula realizada com sucesso',
        data: novaMatricula
    });
});

// GET /api/matriculas/curso/:curso_id - Alunos matriculados em um curso
router.get('/curso/:curso_id', (req, res) => {
    const cursoId = parseInt(req.params.curso_id);
    const matriculasCurso = matriculas.filter(m => m.curso_id === cursoId);
    
    res.json({
        success: true,
        curso_id: cursoId,
        total_matriculados: matriculasCurso.length,
        data: matriculasCurso
    });
});

// GET /api/matriculas/aluno/:aluno_id - Matrículas de um aluno
router.get('/aluno/:aluno_id', (req, res) => {
    const alunoId = parseInt(req.params.aluno_id);
    const matriculasAluno = matriculas.filter(m => m.aluno_id === alunoId);
    
    res.json({
        success: true,
        aluno_id: alunoId,
        total_cursos: matriculasAluno.length,
        data: matriculasAluno
    });
});

module.exports = router;
