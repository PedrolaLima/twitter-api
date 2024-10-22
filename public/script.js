// Função para gerar uma imagem de avatar baseado no username
function gerarAvatar(username) {
    return `https://robohash.org/${encodeURIComponent(username)}.png?size=150x150`; 
}


document.getElementById('search-btn').addEventListener('click', function () {
    const username = document.getElementById('search-input').value;
    if (username === '') {
        alert('Digite o nome de usuário para buscar!');
        return;
    }
    fetch(`/user/${encodeURIComponent(username)}`)
        .then(response => {
            if (!response.ok) {
               throw new Error('Erro na busca do usuário.');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); 
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = ''; // Limpa os resultados anteriores

            if (data && data.data) {                    
                const userElement = document.createElement('div');
                userElement.classList.add('user-info');
                userElement.innerHTML = `
                    <div class="user-info-content">
                        <img class="user-avatar" src="${gerarAvatar(data.data.username)}" alt="Avatar do usuário">
                        <div>
                            Nome: ${data.data.name}<br>
                            Username: @${data.data.username}<br>
                            ID: ${data.data.id}<br>
                        </div>
                    </div>
                    <button id="save-btn">Salvar como Favorito</button>
                `;
                resultsDiv.appendChild(userElement);

                // Função para salvar usuário no localStorage
                document.getElementById('save-btn').addEventListener('click', () => {
                    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

                    if (!favorites.some(user => user.id === data.data.id)) {
                        const userData = { ...data.data, avatar: gerarAvatar(data.data.username) };
                        favorites.push(userData);
                        localStorage.setItem('favorites', JSON.stringify(favorites));
                        alert(`${data.data.name} foi salvo como favorito!`);
                    } else {
                        alert('Usuário já está salvo como favorito.');
                    }
                    
                    exibirFavoritos(); // Atualiza a lista de favoritos
                });
            } else {
                resultsDiv.innerHTML = 'Nenhum usuário encontrado.';
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            document.getElementById('results').innerText = 'Ocorreu um erro ao buscar o usuário.';
        });
});



// Função para exibir favoritos e incluir a imagem de avatar
function exibirFavoritos() {
    const favoritesDiv = document.getElementById('favorites');
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    favoritesDiv.innerHTML = '<h3>Usuários Favoritos</h3>';
    
    if (favorites.length === 0) {
        favoritesDiv.innerHTML += '<p>Sem favoritos salvos.</p>';
    } else {
        favorites.forEach(user => {
            const userElement = document.createElement('div');
            userElement.classList.add('favorite-user');
            userElement.innerHTML = `
                <div class="user-info-content">
                    <img class="user-avatar" src="${user.avatar}" alt="Avatar do usuário">
                    <div>
                        Nome: ${user.name} (@${user.username})<br>
                    </div>
                </div>
                <button class="remove-btn" data-id="${user.id}">Remover</button>
            `;
            favoritesDiv.appendChild(userElement);
        });
    
        // Adiciona evento de clique para cada botão de remoção
        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', function() {
                removerFavorito(this.getAttribute('data-id'));
            });
        });
    }
}


// Função para remover usuário dos favoritos com confirmação
function removerFavorito(userId) {
    if (confirm('Tem certeza que deseja remover este usuário dos favoritos?')) {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        
        // Filtra a lista de favoritos removendo o usuário com o ID correspondente
        favorites = favorites.filter(user => user.id !== userId);
        
        // Atualiza o localStorage com a nova lista
        localStorage.setItem('favorites', JSON.stringify(favorites));
        
        alert('Usuário removido dos favoritos.');
        
        exibirFavoritos(); // Atualiza a lista de favoritos na tela
    }
}

exibirFavoritos();
