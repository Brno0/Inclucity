// Função para carregar as denúncias do localStorage e exibi-las
function carregarDenuncias() {
    const listaDenunciasContainer = document.getElementById('listaDenunciasContainer');

    if (!listaDenunciasContainer) {
        return; // Sai se o container não existir na página atual
    }

    const denuncias = JSON.parse(localStorage.getItem('denuncias')) || [];
    listaDenunciasContainer.innerHTML = ''; // Limpa o conteúdo

    if (denuncias.length === 0) {
        listaDenunciasContainer.innerHTML = '<p class="col text-muted">Nenhuma contribuição ainda. Seja o primeiro a relatar!</p>';
        return;
    }

    denuncias.forEach(denuncia => {
        // Usando classes Bootstrap para o card de denúncia
        const denunciaItem = document.createElement('div');
        denunciaItem.classList.add('col'); // Para o layout de grid do Bootstrap
        denunciaItem.innerHTML = `
            <div class="card shadow-sm h-100">
                <div class="card-body">
                    <h3 class="card-title text-success">${denuncia.localNome}</h3>
                    <p class="card-text"><strong>Endereço:</strong> ${denuncia.localEndereco}</p>
                    <p class="card-text"><strong>Tipo:</strong> ${denuncia.tipoProblemaTexto}</p>
                    <p class="card-text">${denuncia.descricao}</p>
                </div>
                <div class="card-footer bg-light border-top text-end">
                    <small class="text-muted data-denuncia">Reportado por ${denuncia.anonimo ? 'Anônimo' : 'Cidadão'} em ${denuncia.data}</small>
                </div>
            </div>
        `;
        listaDenunciasContainer.appendChild(denunciaItem);
    });
}

// Lógica para o formulário de denúncia e carregamento ao DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    const denunciaForm = document.getElementById('denunciaForm');

    if (denunciaForm) {
        denunciaForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const localNome = document.getElementById('localNome').value;
            const localEndereco = document.getElementById('localEndereco').value;
            const tipoProblemaSelect = document.getElementById('tipoProblema');
            const tipoProblema = tipoProblemaSelect.value;
            const tipoProblemaTexto = tipoProblemaSelect.options[tipoProblemaSelect.selectedIndex].text;
            const descricao = document.getElementById('descricao').value;
            const anonimo = document.getElementById('anonimo').checked;
            const data = new Date().toLocaleDateString('pt-BR');

            const novaDenuncia = {
                id: Date.now(),
                localNome,
                localEndereco,
                tipoProblema,
                tipoProblemaTexto,
                descricao,
                anonimo,
                data
            };

            const denuncias = JSON.parse(localStorage.getItem('denuncias')) || [];
            denuncias.unshift(novaDenuncia);
            localStorage.setItem('denuncias', JSON.stringify(denuncias));

            denunciaForm.reset();

            alert('Sua contribuição foi enviada com sucesso! Redirecionando para as contribuições recentes.');
            window.location.href = 'lista-contribuicoes.html';
        });
    }

    // Chama carregarDenuncias se estiver na página de lista de contribuições
    // ou em qualquer outra página que precise exibir as denúncias (ex: Home para as últimas)
    // A chamada está sendo feita diretamente na tag <script> em lista-contribuicoes.html agora.
    // Pode remover esta linha se não precisar carregar em outras páginas além de lista-contribuicoes.html
    // e caso index.html não precise de uma prévia das contribuições
    // const currentPage = window.location.pathname.split('/').pop();
    // if (currentPage === 'lista-contribuicoes.html') {
    //     carregarDenuncias();
    // }
});