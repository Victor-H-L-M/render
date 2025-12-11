const formUsuario = document.getElementById('form-usuario');
const formRecado = document.getElementById('form-recado');
const listaRecados = document.getElementById('lista-recados');
const API_URL = '/api';

if (formUsuario) {
  formUsuario.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nome = document.getElementById('nomeUsuario')?.value?.trim();
    if (!nome) { alert('Por favor, preencha o nome do usuário.'); return; }
    await fetch(`${API_URL}/usuario_id`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome })
    });
    alert('Usuário cadastrado!');
    formUsuario.reset();
  });
}

if (formRecado) {
  formRecado.addEventListener('submit', async (e) => {
    e.preventDefault();
    const mensagem = document.getElementById('mensagem')?.value;
    const usuario_id = document.getElementById('usuarioId')?.value;

    await fetch(`${API_URL}/recados`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mensagem, usuario_id })
    });

    formRecado.reset();
    carregarRecados();
  });
}

async function carregarRecados() {
  const res = await fetch(`${API_URL}/recados`);
  const dados = await res.json();
  listaRecados.innerHTML = '';
  dados.forEach(r => {
    const li = document.createElement('li');
    li.textContent = `${r.usuario_id?.nome || 'Usuário'}: ${r.mensagem}`;
    listaRecados.appendChild(li);
  });
}

carregarRecados();
