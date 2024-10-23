# API TWITTER

    Essa é uma aplicação que permite buscar perfis de usuários no Twitter e salvar ou remover esses perfis como favoritos.

    Utilizamos de 2 APIs nessa aplicação, a RoboHash para a geração de avatares com base nas string fornecidas, e a X API para buscar o perfil no X(Twitter).

    Como funciona o código JS: 
- gerarAvatar(): Gera uma URL para um avatar baseado no username utilizando o serviço "RoboHash", que gera imagens únicas para strings (nesse caso, o nome de usuário).
- Busca de usuário: Quando o botão "Buscar" é clicado, ele coleta o nome do usuário e faz uma requisição fetch() para buscar o perfil desse usuário no servidor.
- Renderização do resultado: O resultado é exibido em um elemento div. Mostra o avatar gerado e as informações do usuário (nome, username e ID).
- Favoritos: O botão "Salvar como Favorito" permite que o usuário seja salvo no localStorage (um banco de dados local no navegador), e a função exibirFavoritos() é chamada para atualizar a lista de favoritos.
- Exibir favoritos: Esta função coleta os favoritos do localStorage, gera o HTML correspondente e exibe o avatar, nome e username de cada favorito. Também adiciona botões para remover os favoritos.
- Remover favorito: Ao clicar no botão "Remover", o usuário é removido do localStorage e a lista de favoritos é atualizada.

    Para executar, utilize essa URL: [https://twitterapi-6dv4.onrender.com/](https://twitter-api-ldqv.onrender.com/)
