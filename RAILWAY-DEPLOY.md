# 🚀 Deploy no Railway

## Passo a Passo

### 1. Criar conta no Railway
1. Acesse: https://railway.app
2. Clique em "Login" e escolha "Continue with GitHub"
3. Autorize o Railway a acessar sua conta

### 2. Criar novo projeto
1. No Dashboard do Railway, clique em "New Project"
2. Escolha "Deploy from GitHub repo"
3. Selecione o repositório: `benfranklinassistente-code/60maisplay-plataforma`

### 3. Deploy automático
O Railway vai detectar automaticamente:
- ✅ Node.js
- ✅ Procfile
- ✅ railway.json

Clique em "Deploy" e aguarde!

### 4. Configurar variáveis (se necessário)
Se precisar de variáveis de ambiente:
1. Vá em "Variables"
2. Adicione:
   - `NODE_ENV=production`
   - `JWT_SECRET=sua_chave_secreta_aqui`

### 5. Acessar a aplicação
Após deploy, o Railway gera uma URL tipo:
```
https://60maisplay-production.up.railway.app
```

Pronto! A plataforma está online! 🎉

---

## 🔧 Comandos úteis

### Ver logs
No Dashboard do Railway, vá em "Logs"

### Restart
Clique em "Restart" no dashboard

### Custom Domain (opcional)
1. Vá em "Settings"
2. "Custom Domain"
3. Adicione seu domínio

---

## 📞 Suporte Railway
- Docs: https://docs.railway.app
- Discord: https://discord.gg/railway
