-- Banco de dados SQLite para 60maisPlay
-- Para testes locais. Na Hostgator, migrar para MySQL

-- Tabela de Cursos
CREATE TABLE IF NOT EXISTS cursos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    categoria VARCHAR(100),
    duracao_horas INTEGER DEFAULT 0,
    preco DECIMAL(10,2) DEFAULT 0.00,
    imagem_capa VARCHAR(500),
    nivel VARCHAR(50) DEFAULT 'iniciante', -- iniciante, intermediario, avancado
    status VARCHAR(20) DEFAULT 'ativo', -- ativo, inativo, rascunho
    instrutor_nome VARCHAR(255),
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Alunos
CREATE TABLE IF NOT EXISTS alunos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    telefone VARCHAR(20),
    data_nascimento DATE,
    cidade VARCHAR(100),
    estado VARCHAR(50),
    foto_perfil VARCHAR(500),
    bio TEXT,
    nivel_conhecimento VARCHAR(50) DEFAULT 'iniciante',
    ativo BOOLEAN DEFAULT 1,
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
    ultimo_acesso DATETIME
);

-- Tabela de Matrículas (relaciona alunos e cursos)
CREATE TABLE IF NOT EXISTS matriculas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    aluno_id INTEGER NOT NULL,
    curso_id INTEGER NOT NULL,
    status VARCHAR(50) DEFAULT 'ativo', -- ativo, concluido, cancelado
    progresso_percentual INTEGER DEFAULT 0,
    data_matricula DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_conclusao DATETIME,
    valor_pago DECIMAL(10,2),
    FOREIGN KEY (aluno_id) REFERENCES alunos(id) ON DELETE CASCADE,
    FOREIGN KEY (curso_id) REFERENCES cursos(id) ON DELETE CASCADE
);

-- Tabela de Módulos (seções dos cursos)
CREATE TABLE IF NOT EXISTS modulos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    curso_id INTEGER NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    ordem INTEGER DEFAULT 0,
    FOREIGN KEY (curso_id) REFERENCES cursos(id) ON DELETE CASCADE
);

-- Tabela de Aulas
CREATE TABLE IF NOT EXISTS aulas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    modulo_id INTEGER NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    video_url VARCHAR(500),
    duracao_minutos INTEGER DEFAULT 0,
    ordem INTEGER DEFAULT 0,
    tipo VARCHAR(50) DEFAULT 'video', -- video, pdf, quiz
    status VARCHAR(20) DEFAULT 'ativo',
    FOREIGN KEY (modulo_id) REFERENCES modulos(id) ON DELETE CASCADE
);

-- Tabela de Progresso (aulas assistidas)
CREATE TABLE IF NOT EXISTS progresso (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    aluno_id INTEGER NOT NULL,
    aula_id INTEGER NOT NULL,
    concluida BOOLEAN DEFAULT 0,
    data_conclusao DATETIME,
    tempo_assistido_segundos INTEGER DEFAULT 0,
    FOREIGN KEY (aluno_id) REFERENCES alunos(id) ON DELETE CASCADE,
    FOREIGN KEY (aula_id) REFERENCES aulas(id) ON DELETE CASCADE,
    UNIQUE(aluno_id, aula_id)
);

-- Tabela de Categorias
CREATE TABLE IF NOT EXISTS categorias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(100) NOT NULL UNIQUE,
    descricao TEXT,
    icone VARCHAR(100),
    cor VARCHAR(7) DEFAULT '#667eea'
);

-- Inserir categorias padrão
INSERT OR IGNORE INTO categorias (nome, descricao, icone, cor) VALUES 
('WhatsApp', 'Aprenda a usar o WhatsApp com segurança', '💬', '#25D366'),
('Internet', 'Navegue na internet sem medo', '🌐', '#4285F4'),
('Segurança Digital', 'Proteja-se de golpes e vírus', '🛡️', '#FF6B6B'),
('Banco Digital', 'Use apps bancários com confiança', '💰', '#00C853'),
('Fotos e Vídeos', 'Guarde e compartilhe memórias', '📸', '#9C27B0'),
('Redes Sociais', 'Conecte-se com familiares', '👥', '#E91E63');

-- Inserir cursos de exemplo
INSERT OR IGNORE INTO cursos (titulo, descricao, categoria, duracao_horas, preco, nivel, instrutor_nome) VALUES 
('WhatsApp Seguro para Idosos 60+', 'Aprenda a usar o WhatsApp com segurança, identificar golpes e proteger suas conversas.', 'WhatsApp', 2, 47.00, 'iniciante', 'Luis Canabarra'),
('Banco Digital Sem Medo', 'Use PIX, apps bancários e proteja seu dinheiro de golpistas.', 'Banco Digital', 3, 47.00, 'iniciante', 'Luis Canabarra'),
('Escudo Anti-Golpes 60+', 'Proteção completa contra os 5 golpes mais comuns no Brasil.', 'Segurança Digital', 1, 47.00, 'iniciante', 'Luis Canabarra');

-- Inserir módulos para o curso WhatsApp
INSERT OR IGNORE INTO modulos (curso_id, titulo, ordem) 
SELECT id, 'Módulo 1: Primeiros Passos', 1 FROM cursos WHERE titulo = 'WhatsApp Seguro para Idosos 60+';

INSERT OR IGNORE INTO modulos (curso_id, titulo, ordem) 
SELECT id, 'Módulo 2: Segurança Total', 2 FROM cursos WHERE titulo = 'WhatsApp Seguro para Idosos 60+';

-- Inserir aulas
INSERT OR IGNORE INTO aulas (modulo_id, titulo, descricao, duracao_minutos, ordem) 
SELECT m.id, 'Aula 1: Baixando o WhatsApp', 'Como instalar o app no celular', 10, 1 
FROM modulos m 
JOIN cursos c ON m.curso_id = c.id 
WHERE c.titulo = 'WhatsApp Seguro para Idosos 60+' AND m.ordem = 1;

INSERT OR IGNORE INTO aulas (modulo_id, titulo, descricao, duracao_minutos, ordem) 
SELECT m.id, 'Aula 2: Seu Primeiro Contato', 'Adicionando familiares', 15, 2 
FROM modulos m 
JOIN cursos c ON m.curso_id = c.id 
WHERE c.titulo = 'WhatsApp Seguro para Idosos 60+' AND m.ordem = 1;

-- Criar view para relatório de alunos
CREATE VIEW IF NOT EXISTS view_alunos_cursos AS
SELECT 
    a.id as aluno_id,
    a.nome as aluno_nome,
    a.email,
    c.id as curso_id,
    c.titulo as curso_titulo,
    m.status as matricula_status,
    m.progresso_percentual,
    m.data_matricula
FROM alunos a
JOIN matriculas m ON a.id = m.aluno_id
JOIN cursos c ON m.curso_id = c.id;
