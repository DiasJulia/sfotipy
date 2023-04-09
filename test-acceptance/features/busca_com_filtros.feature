Feature: Busca com filtros
    As a user of the sfotipy
    I want to be able to search for songs, playlists and authors with filters
    so that I can find exactly what I am looking for

Scenario: Busca com Filtro por categoria
Given eu estou na página "Busca"
When eu selecionar a categoria “POP” no filtro de busca por categorias
Then só serão mostradas músicas da categoria “POP”
And só serão mostradas playlists da categoria “POP”

Scenario: Busca com Filtro por trecho do nome sem correspondências em playlists e com correspondências em músicas
Given eu estou na página "Busca"
And todas as músicas estão visíveis
And há 1 músicas que contém "Yellow" em seu nome na lista de músicas 
And há 0 playlists que contém "Yellow" em seu nome na lista de playlists
When eu preencher o campo de busca por texto com "Yellow"
Then eu posso ver 1 mensagem de erro informando que não foram encontradas correspondências
And eu posso ver uma mensagem de erro informando que não foram encontradas correspondências na sessão de conteúdo "playlists"

Scenario: Busca com Filtro por trecho do nome sem correspondências em músicas e com correspondências em playlists
Given eu estou na página "Busca"
And todas as músicas estão visíveis
And há 0 músicas que contém "Coldplay" em seu nome na lista de músicas 
And há 1 playlists que contém "Coldplay" em seu nome na lista de playlists
When eu preencher o campo de busca por texto com "Coldplay"
Then eu posso ver 1 mensagem de erro informando que não foram encontradas correspondências
And eu posso ver uma mensagem de erro informando que não foram encontradas correspondências na sessão de conteúdo "musicas"

Scenario: Busca com Filtro por trecho do nome sem correspondências
Given eu estou na página "Busca"
And todas as músicas estão visíveis
And todas as opções de conteúdo a ser mostrado estão selecionadas
And há 0 músicas que contém "Batata" em seu nome na lista de músicas
When eu preencher o campo de busca por texto com "Batata"
Then eu posso ver uma mensagem de erro informando que não foram encontradas correspondências na sessão de conteúdo "musicas"
And eu posso ver uma mensagem de erro informando que não foram encontradas correspondências na sessão de conteúdo "playlists"

Scenario: Busca com Filtro por tipo de conteúdo e trecho do nome
Given eu estou na página "Busca"
And todas as músicas estão visíveis
And todas as opções de conteúdo a ser mostrado estão selecionadas
When eu selecionar apenas "musicas" no tipo de conteúdo a ser mostrado
And eu preencher o campo de busca por texto com "Paradise"
Then eu só posso ver 1 sessões de conteúdo
And eu posso ver a sessão de conteúdo "musicas"
And eu posso ver as músicas "Paradise" e "Another Day in Paradise" na lista de músicas
And todas as músicas da lista de músicas contém "Paradise" em seu nome

Scenario: Busca com Filtro por tipo de conteúdo
Given eu estou na página "Busca"
And todas as opções de conteúdo a ser mostrado estão selecionadas
When eu selecionar apenas "musicas" no tipo de conteúdo a ser mostrado
Then eu só posso ver 1 sessões de conteúdo
And eu posso ver a sessão de conteúdo "musicas"

Scenario: Busca com Filtro por trecho do nome
Given eu estou na página "Busca"
And todas as músicas estão visíveis
And as músicas "Paradise", "Another Day in Paradise", "Yellow" e "Viva la Vida" aparecem na lista de músicas
When eu preencher o campo de busca por texto com "Paradise"
Then eu posso ver as músicas "Paradise" e "Another Day in Paradise" na lista de músicas
And todas as músicas da lista de músicas contém "Paradise" em seu nome
