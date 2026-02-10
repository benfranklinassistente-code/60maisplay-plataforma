// Banco de dados em JSON para testes rápidos
// Na produção, substituir por MySQL

const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, '../database/database.json');

// Garantir que a pasta database existe
if (!fs.existsSync(path.dirname(DB_FILE))) {
    fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });
}

// Dados iniciais
const initialData = {
    cursos: [
        {
            id: 1,
            titulo: 'WhatsApp Seguro para Idosos 60+',
            descricao: 'Aprenda a usar o WhatsApp com segurança, identificar golpes e proteger suas conversas.',
            categoria: 'WhatsApp',
            duracao_horas: 2,
            preco: 47.00,
            imagem_capa: '/images/whatsapp.jpg',
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
            imagem_capa: '/images/banco.jpg',
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
            imagem_capa: '/images/escudo.jpg',
            nivel: 'iniciante',
            status: 'ativo',
            instrutor_nome: 'Luis Canabarra',
            modulos: 1,
            aulas: 3
        },
        {
            id: 4,
            titulo: 'Instagram para Iniciantes',
            descricao: 'Aprenda a postar fotos, stories e se conectar com seus netos.',
            categoria: 'Redes Sociais',
            duracao_horas: 2,
            preco: 47.00,
            imagem_capa: '/images/instagram.jpg',
            nivel: 'iniciante',
            status: 'ativo',
            instrutor_nome: 'Luis Canabarra',
            modulos: 2,
            aulas: 6
        },
        {
            id: 5,
            titulo: 'YouTube: Assista e Compartilhe',
            descricao: 'Use o YouTube para assistir vídeos e compartilhar com a família.',
            categoria: 'Internet',
            duracao_horas: 1.5,
            preco: 47.00,
            imagem_capa: '/images/youtube.jpg',
            nivel: 'iniciante',
            status: 'ativo',
            instrutor_nome: 'Luis Canabarra',
            modulos: 1,
            aulas: 4
        }
    ],
    alunos: [
        {
            id: 1,
            nome: 'Dona Maria Silva',
            email: 'maria@email.com',
            senha: 'senha123',
            telefone: '(11) 99999-1111',
            cidade: 'São Paulo',
            estado: 'SP',
            nivel_conhecimento: 'iniciante',
            ativo: true,
            data_cadastro: new Date().toISOString()
        },
        {
            id: 2,
            nome: 'Seu Joaquim Santos',
            email: 'joaquim@email.com',
            senha: 'senha123',
            telefone: '(11) 98888-2222',
            cidade: 'São Paulo',
            estado: 'SP',
            nivel_conhecimento: 'iniciante',
            ativo: true,
            data_cadastro: new Date().toISOString()
        },
        {
            id: 3,
            nome: 'Dona Ana Pereira',
            email: 'ana@email.com',
            senha: 'senha123',
            telefone: '(11) 97777-3333',
            cidade: 'Rio de Janeiro',
            estado: 'RJ',
            nivel_conhecimento: 'iniciante',
            ativo: true,
            data_cadastro: new Date().toISOString()
        }
    ],
    matriculas: [
        { id: 1, aluno_id: 1, curso_id: 1, status: 'ativo', progresso_percentual: 30, valor_pago: 47.00, data_matricula: new Date().toISOString() },
        { id: 2, aluno_id: 1, curso_id: 2, status: 'ativo', progresso_percentual: 0, valor_pago: 47.00, data_matricula: new Date().toISOString() },
        { id: 3, aluno_id: 2, curso_id: 1, status: 'ativo', progresso_percentual: 75, valor_pago: 47.00, data_matricula: new Date().toISOString() },
        { id: 4, aluno_id: 3, curso_id: 3, status: 'ativo', progresso_percentual: 10, valor_pago: 47.00, data_matricula: new Date().toISOString() }
    ],
    modulos: [
        { id: 1, curso_id: 1, titulo: 'Módulo 1: Primeiros Passos', ordem: 1 },
        { id: 2, curso_id: 1, titulo: 'Módulo 2: Segurança Total', ordem: 2 },
        { id: 3, curso_id: 2, titulo: 'Módulo 1: Conhecendo o App', ordem: 1 },
        { id: 4, curso_id: 2, titulo: 'Módulo 2: PIX sem Medo', ordem: 2 }
    ],
    aulas: [
        { id: 1, modulo_id: 1, titulo: 'Aula 1: Baixando o WhatsApp', descricao: 'Como instalar', duracao_minutos: 10, ordem: 1 },
        { id: 2, modulo_id: 1, titulo: 'Aula 2: Criando Conta', descricao: 'Passo a passo', duracao_minutos: 15, ordem: 2 },
        { id: 3, modulo_id: 1, titulo: 'Aula 3: Adicionar Contatos', descricao: 'Salvar números', duracao_minutos: 12, ordem: 3 },
        { id: 4, modulo_id: 2, titulo: 'Aula 4: Privacidade', descricao: 'Configurações', duracao_minutos: 20, ordem: 1 }
    ],
    progresso: []
};

// Criar arquivo se não existir
if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2));
    console.log('✅ Banco de dados criado com dados iniciais!');
}

// Classe para manipular o banco
class Database {
    constructor() {
        this.data = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    }

    save() {
        fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2));
    }

    // Cursos
    getCursos() {
        return this.data.cursos;
    }

    getCursoById(id) {
        return this.data.cursos.find(c => c.id === id);
    }

    addCurso(curso) {
        const newId = Math.max(...this.data.cursos.map(c => c.id), 0) + 1;
        const novoCurso = { ...curso, id: newId, data_criacao: new Date().toISOString() };
        this.data.cursos.push(novoCurso);
        this.save();
        return novoCurso;
    }

    // Alunos
    getAlunos() {
        return this.data.alunos;
    }

    getAlunoById(id) {
        return this.data.alunos.find(a => a.id === id);
    }

    getAlunoByEmail(email) {
        return this.data.alunos.find(a => a.email === email);
    }

    addAluno(aluno) {
        // Verificar se email já existe
        if (this.getAlunoByEmail(aluno.email)) {
            throw new Error('Email já cadastrado');
        }
        
        const newId = Math.max(...this.data.alunos.map(a => a.id), 0) + 1;
        const novoAluno = { 
            ...aluno, 
            id: newId, 
            data_cadastro: new Date().toISOString(),
            ativo: true 
        };
        this.data.alunos.push(novoAluno);
        this.save();
        return novoAluno;
    }

    // Matrículas
    getMatriculas() {
        return this.data.matriculas;
    }

    getMatriculasByAluno(alunoId) {
        return this.data.matriculas.filter(m => m.aluno_id === alunoId);
    }

    addMatricula(matricula) {
        // Verificar se já existe
        const existente = this.data.matriculas.find(
            m => m.aluno_id === matricula.aluno_id && m.curso_id === matricula.curso_id
        );
        if (existente) {
            throw new Error('Aluno já matriculado neste curso');
        }

        const newId = Math.max(...this.data.matriculas.map(m => m.id), 0) + 1;
        const novaMatricula = {
            ...matricula,
            id: newId,
            status: 'ativo',
            progresso_percentual: 0,
            data_matricula: new Date().toISOString()
        };
        this.data.matriculas.push(novaMatricula);
        this.save();
        return novaMatricula;
    }

    // Módulos
    getModulosByCurso(cursoId) {
        return this.data.modulos.filter(m => m.curso_id === cursoId);
    }

    addModulo(modulo) {
        const newId = Math.max(...this.data.modulos.map(m => m.id), 0) + 1;
        const novoModulo = { ...modulo, id: newId };
        this.data.modulos.push(novoModulo);
        this.save();
        return novoModulo;
    }

    // Aulas
    getAulasByModulo(moduloId) {
        return this.data.aulas.filter(a => a.modulo_id === moduloId);
    }

    addAula(aula) {
        const newId = Math.max(...this.data.aulas.map(a => a.id), 0) + 1;
        const novaAula = { ...aula, id: newId };
        this.data.aulas.push(novaAula);
        this.save();
        return novaAula;
    }
}

module.exports = Database;
