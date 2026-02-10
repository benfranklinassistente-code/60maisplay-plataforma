// 60maisPlay API Client
const API_BASE_URL = window.location.origin + '/api';

// Função genérica para fazer requisições
async function apiRequest(endpoint, method = 'GET', data = null) {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    if (data) {
        options.body = JSON.stringify(data);
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Erro na API:', error);
        return { success: false, message: 'Erro de conexão' };
    }
}

// Cursos
const CursosAPI = {
    listar: () => apiRequest('/cursos'),
    buscar: (id) => apiRequest(`/cursos/${id}`),
    categorias: () => apiRequest('/cursos/categorias/lista'),
    criar: (data) => apiRequest('/cursos', 'POST', data)
};

// Alunos
const AlunosAPI = {
    listar: () => apiRequest('/alunos'),
    buscar: (id) => apiRequest(`/alunos/${id}`),
    criar: (data) => apiRequest('/alunos', 'POST', data),
    cursos: (id) => apiRequest(`/alunos/${id}/cursos`)
};

// Matrículas
const MatriculasAPI = {
    criar: (data) => apiRequest('/matriculas', 'POST', data),
    porCurso: (cursoId) => apiRequest(`/matriculas/curso/${cursoId}`),
    porAluno: (alunoId) => apiRequest(`/matriculas/aluno/${alunoId}`)
};

// Progresso
const ProgressoAPI = {
    registrar: (data) => apiRequest('/progresso', 'POST', data),
    porAluno: (alunoId) => apiRequest(`/progresso/aluno/${alunoId}`)
};

// Exportar para uso global
window.CursosAPI = CursosAPI;
window.AlunosAPI = AlunosAPI;
window.MatriculasAPI = MatriculasAPI;
window.ProgressoAPI = ProgressoAPI;
