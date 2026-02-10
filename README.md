# 🎓 60maisPlay - Plataforma de Cursos

Plataforma de ensino online para idosos 60+. Tecnologia descomplicada.

## 🚀 Tecnologias

- **Backend:** Node.js + Express
- **Banco de Dados:** SQLite (testes) / MySQL (produção)
- **Frontend:** HTML, CSS, JavaScript
- **API:** RESTful

## 📁 Estrutura do Projeto

```
60maisplay-plataforma/
├── config/              # Configurações
│   ├── database.js      # Config do banco
│   └── schema.sql       # Estrutura do banco
├── src/
│   ├── app.js           # Servidor principal
│   └── routes/          # Rotas da API
│       ├── cursos.js
│       ├── alunos.js
│       ├── matriculas.js
│       └── progresso.js
├── public/              # Arquivos estáticos
├── database/            # Banco SQLite
├── .env.example         # Exemplo de variáveis
└── package.json
```

## 🛠️ Instalação Local (Testes)

### 1. Clone o repositório
```bash
git clone https://github.com/benfranklinassistente-code/60maisplay-plataforma.git
cd 60maisplay-plataforma
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure o ambiente
```bash
cp .env.example .env
# Edite o arquivo .env se necessário
```

### 4. Crie a pasta do banco
```bash
mkdir -p database
```

### 5. Inicie o servidor
```bash
npm start
# ou para desenvolvimento:
npm run dev
```

### 6. Acesse
- API: http://localhost:3000
- Documentação: http://localhost:3000

## 📚 Endpoints da API

### Cursos
- `GET /api/cursos` - Listar todos os cursos
- `GET /api/cursos/:id` - Buscar curso específico
- `POST /api/cursos` - Criar novo curso
- `GET /api/cursos/categorias/lista` - Listar categorias

### Alunos
- `GET /api/alunos` - Listar alunos
- `GET /api/alunos/:id` - Buscar aluno
- `POST /api/alunos` - Cadastrar aluno
- `GET /api/alunos/:id/cursos` - Cursos do aluno

### Matrículas
- `POST /api/matriculas` - Matricular aluno
- `GET /api/matriculas/curso/:curso_id` - Alunos no curso
- `GET /api/matriculas/aluno/:aluno_id` - Matrículas do aluno

### Progresso
- `POST /api/progresso` - Registrar progresso
- `GET /api/progresso/aluno/:aluno_id` - Progresso do aluno

## 🌐 Deploy na Hostgator

### 1. Preparação
```bash
# Instale o MySQL2 para produção
npm install mysql2

# Mude para produção no .env
NODE_ENV=production
```

### 2. Configuração MySQL na Hostgator
```bash
# No arquivo .env, descomente e preencha:
DB_HOST=localhost
DB_USER=seu_usuario_hostgator
DB_PASSWORD=sua_senha
DB_NAME=60maisplay_db
DB_PORT=3306
```

### 3. Criar banco na Hostgator
- Acesse o cPanel → MySQL Database Wizard
- Crie banco: `60maisplay_db`
- Crie usuário e dê permissões
- Execute o script `config/schema.sql` (adaptado para MySQL)

### 4. Upload dos arquivos
```bash
# Compacte o projeto (sem node_modules)
zip -r 60maisplay.zip . -x "node_modules/*" ".git/*"

# Envie via FTP para: public_html/60maisplay/
# Ou use o Gerenciador de Arquivos do cPanel
```

### 5. Instalar na Hostgator
```bash
# Acesse via SSH (se disponível) ou use o Terminal do cPanel
cd public_html/60maisplay
npm install --production
npm start
```

### 6. Configurar Node.js no cPanel
- Acesse: cPanel → Setup Node.js App
- Application root: `public_html/60maisplay`
- Application URL: `seudominio.com/60maisplay`
- Startup file: `src/app.js`

## 🗄️ Migração SQLite → MySQL

Se precisar migrar dados de teste para produção:

```bash
# Exporte do SQLite
sqlite3 database/60maisplay.db .dump > backup.sql

# Importe no MySQL (adaptar comandos SQL primeiro)
mysql -u usuario -p 60maisplay_db < backup.sql
```

## 📱 Testes

```bash
# Testar API
 curl http://localhost:3000/api/cursos

# Testar criação de aluno
curl -X POST http://localhost:3000/api/alunos \
  -H "Content-Type: application/json" \
  -d '{"nome":"Teste","email":"teste@teste.com"}'
```

## 🔒 Segurança

- Sempre use HTTPS em produção
- Mude o JWT_SECRET em produção
- Nunca commit o arquivo .env
- Use senhas fortes no banco de dados

## 📞 Suporte

Plataforma criada por 60maisPlay
- Email: benjamin@60maiscursos.com.br
- WhatsApp: (11) 95354-5939

---

**Versão:** 1.0.0  
**Data:** 10/02/2026
