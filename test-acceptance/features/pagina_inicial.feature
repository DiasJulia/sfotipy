Feature: Pagina Inicial
    As a usuário qualquer do serviço
    I want to acessar a página Inicial
    So that eu possa ter informaçoes e conteúdos relevantes organizados e expostos para mim

    Scenario: Voltar à página inicial
        Given que eu esteja logado com o usuário usuário “vgc3” e a senha “abc1234”
        And eu esteja na página "Busca"
        When eu clico no botão “Home” uma vez
        Then eu vou diretamente para a página principal do serviço

    Scenario: Visualizar informações públicas e do usuário
        Given que eu esteja na página inicial "Sfotipy"
        And logado com o usuário “vgc3” e a senha “abc1234”
        When eu percorro a página
        Then eu consigo ver “recomendações”, "Playlists Públicas", “musicas em alta” e as “minhas playlists”

    Scenario: Sair do serviço
        Given que eu esteja na página inicial "Sfotipy"
        And logado com o usuário “vgc3” e a senha “abc1234”
        When eu clico no ícone de “sair”
        Then eu sou direcionado novamente para a seção de "Login"
        And minhas credenciais serão pedidas novamente

    Scenario: Visualizar informações para usuário não logado
        Given que eu esteja na página inicial
        And tenha optado por não fazer login (entrado como guest)
        When eu percorro a página
        Then eu consigo ver apenas as “musicas em alta” e as “playlists públicas”

    Scenario: Minhas Playlists de usuário não logado
        Given que eu esteja na pagina inicial "Sfotipy"
        And eu não tenha feito login (seja um guest)
        When eu clico no botão "Playlists"
        Then eu sou levado para a pagina de "Login"
        And aparece a mensagem "Você precisa estar logado para acessar playlists próprias"

    Scenario: Criar playlists como usuário não logado
        Given que eu esteja na pagina inicial
        And eu não tenha feito login (seja um guest)
        When eu clico no simbolo de "Playlists"
        Then eu sou levado para a pagina de "Login"
        And aparece o botão de "Registrar"
        And aparece o botão de "Continuar como convidado"

    Scenario: Acessar perfil do usuário
        Given que eu esteja na página inicial
        And logado com o usuário “vgc3” e a senha “abc1234”
        When eu clico no ícone "Perfil" 
        Then eu posso ver meu dados ("Victor", "Seguidores: 0")

    Scenario: Minhas Playlists de usuário logado
        Given que eu esteja na pagina inicial
        And logado com o usuário “vgc3” e a senha “abc1234”
        When eu clico no botão "Playlists"
        Then eu sou levado para a pagina de "Minhas Playlists"
        And eu posso ver uma lista com as mihas playlists "Pop Mix", "Electric Vibe" e "Study lofi"
        And eu posso ver ao final a opção "Criar Playlist"
