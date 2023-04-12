Feature: Artistas Em Alta

    As a user of the sfotipy
    I want to find the top artists of sfotipy
    so that I can see find the top artists of sfotipy

    Scenario: Find the top artists when the user is in the page "Sfotipy"
        Given I'm on the page "Pagina Inicial"
        And I see the "NavBar"
        When I click in the name Em alta
        Then I see the "5" top artists of sfotipy
    Scenario: Find the top artists when the user is in the page "Explorar"
        Given I'm on the page "Explorar"
        And I see the "NavBar"
        When I click in the name Em alta
        Then I see the top artists of sfotipy
    Scenario: Find the "5" top artists when the user is in the page "Busca"
        Given I'm on the page "Busca"
        And I see the "NavBar"
        When I click in the name Em alta
        Then I see the "5" top artists of sfotipy
    Scenario: Find the top artists when the user is in the page "Playlist"
        Given I'm on the page "Playlist"
        And I see the "NavBar"
        When I click in the name Em alta
        Then I see the "5" top artists of sfotipy