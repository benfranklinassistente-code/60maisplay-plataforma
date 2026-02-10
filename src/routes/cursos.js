const express = require('express');
const router = express.Router();
const Database = require('../database');

const db = new Database();

// GET /api/cursos - Listar todos os cursos
router.get('/', (req, res) => {
    try {
        const { categoria, nivel, status } = req.query;
        let cursos = db.getCursos();
        
        // Filtros
        if (categoria) {
            cursos = cursos.filter(c => c.categoria.toLowerCase() === categoria.toLowerCase());
        }
        if (nivel) {
            cursos = cursos.filter(c => c.nivel === nivel);
        }
        if (status) {
            cursos = cursos.filter(c => c.status === status);
        }
        
        res.json({
            success: true,
            count: cursos.length,
            data: cursos
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET /api/cursos/:id - Buscar curso específico
router.get('/:id', (req, res) => {
    try {
        const curso = db.getCursoById(parseInt(req.params.id));
        
        if (!curso) {
            return res.status(404).json({
                success: false,
                message: 'Curso não encontrado'
            });
        }
        
        // Buscar módulos e aulas
        const modulos = db.getModulosByCurso(curso.id);
        const modulosComAulas = modulos.map(m => ({
            ...m,
            aulas: db.getAulasByModulo(m.id)
        }));
        
        res.json({
            success: true,
            data: {
                ...curso,
                modulos: modulosComAulas
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// POST /api/cursos - Criar novo curso
router.post('/', (req, res) => {
    try {
        const { titulo, descricao, categoria, preco, duracao_horas, instrutor_nome, modulos, aulas } = req.body;
        
        if (!titulo || !descricao) {
            return res.status(400).json({
                success: false,
                message: 'Título e descrição são obrigatórios'
            });
        }
        
        const novoCurso = db.addCurso({
            titulo,
            descricao,
            categoria: categoria || 'Geral',
            preco: parseFloat(preco) || 0,
            duracao_horas: parseInt(duracao_horas) || 0,
            instrutor_nome: instrutor_nome || 'Luis Canabarra',
            imagem_capa: '/images/curso-default.jpg',
            nivel: 'iniciante',
            status: 'ativo',
            modulos: parseInt(modulos) || 0,
            aulas: parseInt(aulas) || 0
        });
        
        res.status(201).json({
            success: true,
            message: 'Curso criado com sucesso',
            data: novoCurso
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// POST /api/cursos/:id/modulos - Adicionar módulo ao curso
router.post('/:id/modulos', (req, res) => {
    try {
        const cursoId = parseInt(req.params.id);
        const { titulo } = req.body;
        
        if (!titulo) {
            return res.status(400).json({
                success: false,
                message: 'Título do módulo é obrigatório'
            });
        }
        
        const modulo = db.addModulo({
            curso_id: cursoId,
            titulo,
            ordem: db.getModulosByCurso(cursoId).length + 1
        });
        
        res.status(201).json({
            success: true,
            message: 'Módulo adicionado com sucesso',
            data: modulo
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET /api/cursos/categorias/lista - Listar categorias
router.get('/categorias/lista', (req, res) => {
    const categorias = [
        { nome: 'WhatsApp', icone: '💬', cor: '#25D366', descricao: 'Aprenda a usar o WhatsApp com segurança' },
        { nome: 'Internet', icone: '🌐', cor: '#4285F4', descricao: 'Navegue na internet sem medo' },
        { nome: 'Segurança Digital', icone: '🛡️', cor: '#FF6B6B', descricao: 'Proteja-se de golpes e vírus' },
        { nome: 'Banco Digital', icone: '💰', cor: '#00C853', descricao: 'Use apps bancários com confiança' },
        { nome: 'Fotos e Vídeos', icone: '📸', cor: '#9C27B0', descricao: 'Guarde e compartilhe memórias' },
        { nome: 'Redes Sociais', icone: '👥', cor: '#E91E63', descricao: 'Conecte-se com familiares' }
    ];
    
    res.json({
        success: true,
        data: categorias
    });
});

module.exports = router;
