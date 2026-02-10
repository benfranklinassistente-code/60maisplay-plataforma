const express = require('express');
const router = express.Router();

// Mock de progresso
let progresso = [];

// POST /api/progresso - Registrar progresso de aula
router.post('/', (req, res) => {
    const { aluno_id, aula_id, concluida, tempo_assistido } = req.body;
    
    if (!aluno_id || !aula_id) {
        return res.status(400).json({
            success: false,
            message: 'aluno_id e aula_id são obrigatórios'
        });
    }
    
    const registroExistente = progresso.find(p => 
        p.aluno_id === aluno_id && p.aula_id === aula_id
    );
    
    if (registroExistente) {
        // Atualizar progresso existente
        registroExistente.concluida = concluida || registroExistente.concluida;
        registroExistente.tempo_assistido = tempo_assistido || registroExistente.tempo_assistido;
        if (concluida) {
            registroExistente.data_conclusao = new Date().toISOString();
        }
        
        return res.json({
            success: true,
            message: 'Progresso atualizado',
            data: registroExistente
        });
    }
    
    // Criar novo registro
    const novoProgresso = {
        id: progresso.length + 1,
        aluno_id,
        aula_id,
        concluida: concluida || false,
        data_conclusao: concluida ? new Date().toISOString() : null,
        tempo_assistido: tempo_assistido || 0
    };
    
    progresso.push(novoProgresso);
    
    res.status(201).json({
        success: true,
        message: 'Progresso registrado',
        data: novoProgresso
    });
});

// GET /api/progresso/aluno/:aluno_id - Progresso geral do aluno
router.get('/aluno/:aluno_id', (req, res) => {
    const alunoId = parseInt(req.params.aluno_id);
    const progressoAluno = progresso.filter(p => p.aluno_id === alunoId);
    
    const aulasConcluidas = progressoAluno.filter(p => p.concluida).length;
    const aulasTotal = progressoAluno.length;
    const percentual = aulasTotal > 0 ? Math.round((aulasConcluidas / aulasTotal) * 100) : 0;
    
    res.json({
        success: true,
        aluno_id: alunoId,
        estatisticas: {
            aulas_total: aulasTotal,
            aulas_concluidas: aulasConcluidas,
            percentual_conclusao: percentual
        },
        data: progressoAluno
    });
});

module.exports = router;
