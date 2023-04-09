Feature: Gerar link de compartilhamento
    As a usuário com login e senha
    I want to compartilhar o link de uma playlist pública
    So that o link é gerado e pode ser compartilhado

    Scenario: geração de link de compartilhamento 
        Given eu sou um usuário com login "jsa2" e senha "123"
        And estou na playlist "Melhores Pop" que é "public" com id "1"
        When seleciono a opção de compartilhar
        Then o link "localhost:4200/playlist/1" é gerado
        And uma opção "COPIAR" é mostrada.
        And posso copiar o link "localhost:4200/playlist/1"

    Scenario: não é possível gerar link de playlist privada
        Given sou um usuário com login "2asj" e senha "321"
        When entro na página da playlist "Para Você" com id "3"
        And a playlist "Para Você" é "private"
        Then a opção de compartilhar playlist não aparece na tela