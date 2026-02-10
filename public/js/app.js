// 60maisPlay - Aplicação Principal

document.addEventListener('DOMContentLoaded', function() {
    // Carregar cursos na página inicial
    carregarCursos();
    
    // Configurar filtros
    configurarFiltros();
    
    // Configurar botões de lembrete
    configurarLembretes();
});

// Carregar cursos da API
async function carregarCursos() {
    const container = document.getElementById('lista-cursos');
    if (!container) return;
    
    try {
        const response = await CursosAPI.listar();
        
        if (response.success && response.data) {
            container.innerHTML = response.data.map(curso => criarCardCurso(curso)).join('');
        } else {
            container.innerHTML = '<p>Nenhum curso disponível no momento.</p>';
        }
    } catch (error) {
        console.error('Erro ao carregar cursos:', error);
        container.innerHTML = '<p>Erro ao carregar cursos. Tente novamente.</p>';
    }
}

// Criar HTML do card de curso
function criarCardCurso(curso) {
    const cores = {
        'WhatsApp': 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
        'Banco Digital': 'linear-gradient(135deg, #00C853 0%, #009624 100%)',
        'Segurança Digital': 'linear-gradient(135deg, #FF6B6B 0%, #EE5A5A 100%)',
        'Internet': 'linear-gradient(135deg, #4285F4 0%, #1967D2 100%)',
        'Fotos e Vídeos': 'linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%)',
        'Redes Sociais': 'linear-gradient(135deg, #E91E63 0%, #C2185B 100%)'
    };
    
    const cor = cores[curso.categoria] || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    
    return `
        <div class="curso-card" data-categoria="${curso.categoria.toLowerCase()}">
            <div class="curso-thumbnail" style="background: ${cor}">
                <span class="play-icon">▶</span>
            </div>
            <div class="curso-info">
                <span class="curso-badge" style="background: ${cor}; color: white; padding: 4px 12px; border-radius: 50px; font-size: 11px;">${curso.categoria}</span>
                <h3>${curso.titulo}</h3>
                <p class="curso-instrutor">👤 ${curso.instrutor_nome}</p>
                <p class="curso-duracao">⏱️ ${curso.duracao_horas}h de conteúdo</p>
                <div class="curso-preco">
                    <span style="font-size: 20px; font-weight: 700; color: var(--secondary);">R$ ${curso.preco.toFixed(2)}</span>
                </div>
                <button class="btn btn-primary" style="width: 100%; margin-top: 12px;" onclick="matricularCurso(${curso.id})">
                    🚀 Matricular
                </button>
            </div>
        </div>
    `;
}

// Configurar filtros
function configurarFiltros() {
    const botoes = document.querySelectorAll('.filtro');
    
    botoes.forEach(botao => {
        botao.addEventListener('click', function() {
            // Remover active de todos
            botoes.forEach(b => b.classList.remove('active'));
            // Adicionar active no clicado
            this.classList.add('active');
            
            const filtro = this.dataset.filtro;
            filtrarCursos(filtro);
        });
    });
}

// Filtrar cursos
function filtrarCursos(filtro) {
    const cursos = document.querySelectorAll('.curso-card');
    
    cursos.forEach(curso => {
        if (filtro === 'todos') {
            curso.style.display = 'block';
        } else {
            const categoria = curso.dataset.categoria;
            curso.style.display = categoria === filtro ? 'block' : 'none';
        }
    });
}

// Configurar lembretes
function configurarLembretes() {
    const botoes = document.querySelectorAll('.btn-lembrete');
    
    botoes.forEach(botao => {
        botao.addEventListener('click', function() {
            this.innerHTML = '✅ Lembrete ativo';
            this.style.background = 'rgba(255,255,255,0.4)';
            
            // Mostrar notificação
            mostrarNotificacao('Lembrete ativado! Você receberá uma notificação quando o curso for lançado.');
        });
    });
}

// Matricular em curso
async function matricularCurso(cursoId) {
    // Verificar se usuário está logado
    const usuario = localStorage.getItem('usuario');
    
    if (!usuario) {
        // Redirecionar para login
        window.location.href = '/login.html?redirect=' + encodeURIComponent(window.location.href);
        return;
    }
    
    const usuarioData = JSON.parse(usuario);
    
    try {
        const response = await MatriculasAPI.criar({
            aluno_id: usuarioData.id,
            curso_id: cursoId,
            valor_pago: 0 // Seria o valor real do curso
        });
        
        if (response.success) {
            mostrarNotificacao('🎉 Matrícula realizada com sucesso!');
        } else {
            mostrarNotificacao(response.message || 'Erro ao matricular');
        }
    } catch (error) {
        console.error('Erro:', error);
        mostrarNotificacao('Erro ao realizar matrícula');
    }
}

// Mostrar notificação
function mostrarNotificacao(mensagem) {
    // Criar elemento de notificação
    const notif = document.createElement('div');
    notif.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--secondary);
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        z-index: 9999;
        font-weight: 500;
        animation: slideIn 0.3s ease;
    `;
    notif.textContent = mensagem;
    
    document.body.appendChild(notif);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notif.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}

// CSS para animações
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Exportar funções
window.matricularCurso = matricularCurso;
window.mostrarNotificacao = mostrarNotificacao;
