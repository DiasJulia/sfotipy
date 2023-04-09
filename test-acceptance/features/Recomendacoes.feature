Feature: Recomendações

    As a user of the sfotipy
    I want to get playlist recommendations based on what I have been listening to
    so that I can listen to new songs close to what I like

    Scenario: Access the explorer page
        Given I'm on the page "Explorar"
        Then I see at least "5" recommended playlists
        And I'm still on the page "Explorar"
    
    Scenario: Access the recommended playlist
        Given I'm on the page "Explorar"
        And a playlist "Melhores Pop" appears as recommended
        When I try to enter the playlist page "Melhores Pop"
        Then I'm on the playlist page "Melhores Pop"
    
    Scenario: View recommended playlist options    
        Given I'm on the page "Explorar"
        And a playlist "Melhores Pop" appears as recommended
        When I try to see the options of the playlist "Melhores Pop"
        Then I see next to the playlist "Melhores Pop" the options "Save", "Like", "Share"
        And I'm still on the page "Explorar"

    Scenario: Get link to recommended playlist
        Given I'm on the page "Explorar"
        And a playlist "Melhores Indie" appears as recommended
        When I try to share the playlist "Melhores Indie"
        Then the system shows a confirmation message that the link to the playlist "Melhores Indie" has been copied
        And I'm still on the page "Explorar"

    Scenario: View recommended playlist play
        Given I'm on the page "Explorar"
        And a playlist "Melhores Indie" appears as recommended
        When I try to see the play of the playlist "Melhores Indie"
        Then I see the play of the playlist "Melhores Indie"
        And I'm still on the page "Explorar"

    Scenario: Change play-button from pause to play
        Given I'm on the page "Explorar"
        And a playlist "Melhores Indie" appears as recommended
        And the play-button of playlist "Melhores Indie" is a pause button
        When I click on the play-button of playlist "Melhores Indie"
        Then I see that the play-button of playlist "Melhores Indie" is a play button
        And I'm still on the page "Explorar"

    Scenario: Change play-button from play to pause
        Given I'm on the page "Explorar"
        And a playlist "Melhores Indie" appears as recommended
        And the play-button of playlist "Melhores Indie" is a play button
        When I click on the play-button of playlist "Melhores Indie"
        Then I see that the play-button of playlist "Melhores Indie" is a pause button
        And I'm still on the page "Explorar"

    Scenario: Add a recommended playlist to the user's liked playlists 
        Given I'm on the page "Explorar"
        And a playlist "Melhores Indie" appears as recommended
        When I try to like the playlist "Melhores Indie"
        Then the system shows a confirmation message that the playlist "Melhores Indie" was liked
        And I'm still on the page "Explorar"
        And the system has the playlist "Melhores Indie" saved in my liked playlists
    
    Scenario: Add a recommended playlist not saved to the user's liked playlists 
        Given I'm on the page "Explorar"
        And a playlist "Melhores Pop" appears as recommended
        And I don't have the playlist "Melhores Pop" saved in my liked playlists
        When I try to like the playlist "Melhores Pop"
        Then the system shows a confirmation message that the playlist "Melhores Pop" was liked
        And I'm still on the page "Explorar"
        And the system has the playlist "Melhores Pop" saved in my liked playlists