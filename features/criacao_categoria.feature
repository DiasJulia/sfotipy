Feature: Criação de Categorias
    As a dono de uma playlist
    I want to criar e gerenciar categorias de uma playlist 
    So that as categorias de uma playlist serão definidas

Scenario adicionando nova categoria a uma playlist
Given sou o “dono” da playlist “minhas favoritas”
And possuo login “jsa2” e senha “123”
When clico no botão gerenciar categorias
And seleciono “MPB” como uma nova categoria
Then “MPB” é uma nova categoria da playlist “minhas favoritas”

Scenario mudança de categoria de playlist
Given sou o dono da playlist “músicas antigas”
And possuo o login “jsa2” e senha “123”
When clico em gerenciar categorias
And seleciono “MPB” como a categoria que vai ser mudada
And seleciono “R&B” como a categoria que vai substituir “MPB”
Then “R&B” é uma categoria de “músicas antigas” e “MPB” não.

Scenario mais de duas categorias para playlist
Given sou o dono da playlist “minhas favoritas”
And possuo o login “jsa2” e senha “123”
And “minhas favoritas” possui as categorias “MPB” e “ROCK”
When tento adicionar uma nova categoria “R&B”
Then uma mensagem de erro aparece
And a nova categoria não é registrada

Scenario adicionando categoria na playlist não sendo dono dela
Given sou um usuário com login "jsa2" e senha "123"
When tento adicionar a categoria "MPB" na playlist "clássicos"
Then recebo uma mensagem de erro indicando que não tenho permissão para a ação
And ainda estou na página da playlist

Scenario adicionando categoria já existente na playlist
Given sou o dono da playlist “minhas favoritas”
And possuo o login “jsa2” e senha “123”
And "minhas favoritas" possui a categoria "POP"
When tento adicionar a categoria "POP"
Then recebo uma mensagem de erro indicando que "POP" já é uma categoria de "minhas favoritas"

Scenario remover uma categoria de uma playlist
Given sou o dono da playlist "minhas favoritas"
And estou logado com login "jsa2" e senha "123"
And "minhas favoritas" possui a categoria "POP"
When clico no botão de gerenciar categorias
And seleciono a categoria "POP"
Then "minhas favoritas" não possui mais "POP" como uma categoria da playlist
And ainda estou na página da playlist