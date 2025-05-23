document.addEventListener('DOMContentLoaded', () => {
    const denunciaForm = document.getElementById('denunciaForm');
    const listaDenunciasDiv = document.getElementById('listaDenuncias');

    // Função para carregar as denúncias do localStorage
    function carregarDenuncias() {
        const denuncias = JSON.parse(localStorage.getItem('denuncias')) || [];
        listaDenunciasDiv.innerHTML = ''; // Limpa a lista antes de recarregar

        if (denuncias.length === 0) {
            listaDenunciasDiv.innerHTML = '<p>Nenhuma contribuição ainda. Seja o primeiro a relatar!</p>';
            return;
        }

        denuncias.forEach(denuncia => {
            const denunciaItem = document.createElement('div');
            denunciaItem.classList.add('denuncia-item');

            const nomeExibicao = denuncia.anonimo ? 'Anônimo' : 'Cidadão'; // Pode expandir para nome do usuário no futuro

            denunciaItem.innerHTML = `
                <h3>${denuncia.localNome}</h3>
                <p><strong>Endereço:</strong> ${denuncia.localEndereco}</p>
                <p><strong>Tipo:</strong> ${denuncia.tipoProblemaTexto}</p>
                <p>${denuncia.descricao}</p>
                <p class="data-denuncia">Reportado por ${nomeExibicao} em ${denuncia.data}</p>
            `;
            listaDenunciasDiv.appendChild(denunciaItem);
        });
    }

    // Função para adicionar uma nova denúncia
    denunciaForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o envio padrão do formulário

        const localNome = document.getElementById('localNome').value;
        const localEndereco = document.getElementById('localEndereco').value;
        const tipoProblemaSelect = document.getElementById('tipoProblema');
        const tipoProblema = tipoProblemaSelect.value;
        const tipoProblemaTexto = tipoProblemaSelect.options[tipoProblemaSelect.selectedIndex].text; // Pega o texto da opção selecionada
        const descricao = document.getElementById('descricao').value;
        const anonimo = document.getElementById('anonimo').checked;
        const data = new Date().toLocaleDateString('pt-BR'); // Formato de data amigável

        const novaDenuncia = {
            id: Date.now(), // ID único baseado no timestamp
            localNome,
            localEndereco,
            tipoProblema,
            tipoProblemaTexto,
            descricao,
            anonimo,
            data
        };

        // Carrega as denúncias existentes, adiciona a nova e salva no localStorage
        const denuncias = JSON.parse(localStorage.getItem('denuncias')) || [];
        denuncias.unshift(novaDenuncia); // Adiciona no início para as mais recentes aparecerem primeiro
        localStorage.setItem('denuncias', JSON.stringify(denuncias));

        // Limpa o formulário
        denunciaForm.reset();

        // Recarrega a lista de denúncias na página
        carregarDenuncias();

        alert('Sua contribuição foi enviada com sucesso! Agradecemos por ajudar a tornar nossas cidades mais acessíveis.');
    });

    // Carrega as denúncias quando a página é carregada
    carregarDenuncias();
});