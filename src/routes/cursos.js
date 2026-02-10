const express = require('express');
const router = express.Router();

// Mock de dados (substituir por conexão real com banco)
let cursos = [
    {
        id: 1,
        titulo: 'WhatsApp Seguro para Idosos 60+',
        descricao: 'Aprenda a usar o WhatsApp com segurança, identificar golpes e proteger suas conversas.',
        categoria: 'WhatsApp',
        duracao_horas: 2,
        preco: 47.00,
        imagem_capa: '/images/curso-whatsapp.jpg',
        nivel: 'iniciante',
        status: 'ativo',
        instrutor_nome: 'Luis Canabarra',
        modulos: 2,
        aulas: 5
    },
    {
        id: 2,
        titulo: 'Banco Digital Sem Medo',
        descricao: 'Use PIX, apps bancários e proteja seu dinheiro de golpistas.',
        categoria: 'Banco Digital',
        duracao_horas: 3,
        preco: 47.00,
        imagem_capa: '/images/curso-banco.jpg',
        nivel: 'iniciante',
        status: 'ativo',
        instrutor_nome: 'Luis Canabarra',
        modulos: 3,
        aulas: 8
    },
    {
        id: 3,
        titulo: 'Escudo Anti-Golpes 60+',
        descricao: 'Proteção completa contra os 5 golpes mais comuns no Brasil.',
        categoria: 'Segurança Digital',
        duracao_horas: 1,
        preco: 47.00,
        imagem_capa: '/images/curso-escudo.jpg',
        nivel: 'iniciante',
        status: 'ativo',
        instrutor_nome: 'Luis Canabarra',
        modulos: 1,
        aulas: 3
    }
];

// GET /api/cursos - Listar todos os cursos
router.get('/', (req, res) => {
    const { categoria, nivel, status } = req.query;
    
    let resultado = cursos;
    
    // Filtros
    if (categoria) {
        resultado = resultado.filter(c => c.categoria.toLowerCase() === categoria.toLowerCase());
    }
    if (nivel) {
        resultado = resultado.filter(c => c.nivel === nivel);
    }
    if (status) {
        resultado = resultado.filter(c => c.status === status);
    }
    
    res.json({
        success: true,
        count: resultado.length,
        data: resultado
    });
});

// GET /api/cursos/:id - Buscar curso específico
router.get('/:id', (req, res) => {
    const curso = cursos.find(c => c.id === parseInt(req.params.id));
    
    if (!curso) {
        return res.status(404).json({
            success: false,
            message: 'Curso não encontrado'
        });
    }
    
    res.json({
        success: true,
        data: curso
    });
});

// POST /api/cursos - Criar novo curso (admin)
router.post('/', (req, res) => {
    const { titulo, descricao, categoria, preco, duracao_horas, instrutor_nome } = req.body;
    
    if (!titulo || !descricao) {
        return res.status(400).json({
            success: false,
            message: 'Título e descrição são obrigatórios'
        });
    }
    
    const novoCurso = {
        id: cursos.length + 1,
        titulo,
        descricao,
        categoria: categoria || 'Geral',
        preco: preco || 0,
        duracao_horas: duracao_horas || 0,
        instrutor_nome: instrutor_nome || 'Luis Canabarra',
        imagem_capa: '/images/curso-default.jpg',
        nivel: 'iniciante',
        status: 'ativo',
        modulos: 0,
        aulas: 0
    };
    
    cursos.push(novoCurso);
    
    res.status(201).json({
        success: true,
        message: 'Curso criado com sucesso',
        data: novoCurso
    });
});

// GET /api/cursos/categorias/lista - Listar categorias
router.get('/categorias/lista', (req, res) => {
    const categorias = [
        { nome: 'WhatsApp', icone: '💬', cor: '#25D366' },
        { nome: 'Internet', icone: '🌐', cor: '#4285F4' },
        { nome: 'Segurança Digital', icone: '🛡️', cor: '#FF6B6B' },
        { nome: 'Banco Digital', icone: '💰', cor: '#00C853' },
        { nome: 'Fotos e Vídeos', icone: '📸', cor: '#9C27B0' },
        { nome: 'Redes Sociais', icone: '👥', cor: '#E91E63' }
    ];
    
    res.json({
        success: true,
        data: categorias
    });
});

module.exports = router;
