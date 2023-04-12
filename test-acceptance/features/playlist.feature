Feature:  playlist
As a user
I want to acess the playlist section
So that I can create and manage my playlists

    Scenario: create private playlist with music
        Given I am logged in with "lgar@cin.ufpe.br" and "123"
        And I am at the "criar_playlist" page
        When I insert the playlist name "pop" with the music "Yellow"
        And I create the playlist
        Then I can see a confirmation message "Playlist criada com sucesso"
        And I am redirected to the "minhas_playlists" page
        And I can see the "pop" playlist

    Scenario: create public playlist with music
        Given I am at the "criar_playlist" page
        When I insert the playlist name "rock" with the music "Yellow"
        And I select the "publicar" option
        And I create the playlist
        Then I can see a confirmation message "Playlist criada com sucesso"
        And I am redirected to the "minhas_playlists" page
        And I can see the "rock" playlist

    Scenario: create private playlist without music
        Given I am at the "criar_playlist" page
        When I insert the playlist name "melhores"
        And I create the playlist
        Then I can see a confirmation message "Playlist criada com sucesso"
        And I am redirected to the "minhas_playlists" page
        And I can see the "melhores" playlist

    Scenario: create existent playlist with music
        Given I am at the "criar_playlist" page
        When I insert the playlist name "pop" with the music "Yellow"
        And I create the playlist
        Then I can see an error message "Já existe uma playlist com esse nome"
        And I still am at the "criar_playlist" page 

    Scenario: create playlist with bigger name than allowed
        Given I am at the "criar_playlist" page
        When I insert the playlist name "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
        And I create the playlist
        Then I can see an error message "Nome da playlist não pode ser maior que 35 caracteres."
        And I still am at the "criar_playlist" page 

    Scenario: update playlist musics
        Given I am on the "minhas_playlists" page
        And I see a playlist registered as "pop"
        When I go to the "pop" playlist page
        And I go to the add music option
        And I add the music "Thunder"
        Then The "pop" playlist page is refreshed
        And I can see the music "Thunder" in the playlist page
    
    
