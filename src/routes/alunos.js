const express = require('express');
const router = express.Router();
const Database = require('../database');

const db = new Database();

// GET /api/alunos - Listar alunos
router.get('/', (req, res) => {
    try {
        const { ativo, cidade } = req.query;
        let alunos = db.getAlunos();
        
        if (ativo !== undefined) {
            alunos = alunos.filter(a => a.ativo === (ativo === 'true'));
        }
        if (cidade) {
            alunos = alunos.filter(a => a.cidade.toLowerCase().includes(cidade.toLowerCase()));
        }
        
        // Não retornar senha
        alunos = alunos.map(a => {
            const { senha, ...alunoSemSenha } = a;
            return alunoSemSenha;
        });
        
        res.json({
            success: true,
            count: alunos.length,
            data: alunos
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET /api/alunos/:id - Buscar aluno
router.get('/:id', (req, res) => {
    try {
        const aluno = db.getAlunoById(parseInt(req.params.id));
        
        if (!aluno) {
            return res.status(404).json({
                success: false,
                message: 'Aluno não encontrado'
            });
        }
        
        // Não retornar senha
        const { senha, ...alunoSemSenha } = aluno;
        
        res.json({
            success: true,
            data: alunoSemSenha
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// POST /api/alunos - Criar novo aluno (cadastro)
router.post('/', (req, res) => {
    try {
        const { nome, email, senha, telefone, cidade, estado } = req.body;
        
        if (!nome || !email || !senha) {
            return res.status(400).json({
                success: false,
                message: 'Nome, email e senha são obrigatórios'
            });
        }
        
        const novoAluno = db.addAluno({
            nome,
            email,
            senha,
            telefone: telefone || '',
            cidade: cidade || '',
            estado: estado || '',
            nivel_conhecimento: 'iniciante'
        });
        
        // Não retornar senha
        const { senha: _, ...alunoSemSenha } = novoAluno;
        
        res.status(201).json({
            success: true,
            message: 'Aluno cadastrado com sucesso',
            data: alunoSemSenha
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// GET /api/alunos/:id/cursos - Cursos do aluno
router.get('/:id/cursos', (req, res) => {
    try {
        const alunoId = parseInt(req.params.id);
        const aluno = db.getAlunoById(alunoId);
        
        if (!aluno) {
            return res.status(404).json({
                success: false,
                message: 'Aluno não encontrado'
            });
        }
        
        const matriculas = db.getMatriculasByAluno(alunoId);
        const cursosCompletos = matriculas.map(m => {
            const curso = db.getCursoById(m.curso_id);
            return {
                ...m,
                curso: curso || { titulo: 'Curso não encontrado' }
            };
        });
        
        res.json({
            success: true,
            aluno_id: aluno.id,
            aluno_nome: aluno.nome,
            total_cursos: cursosCompletos.length,
            data: cursosCompletos
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
