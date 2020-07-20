# Rick and Morty Battle Royale
Front End Javascript Card Game utilziing data from the<a href='https://rickandmortyapi.com/'> Rick and Morty API</a> and <a href='https://developers.giphy.com/docs/api/'>Giphy API</a>. User plays with a deck of Ricks and tries to defeat the Mortys in a card game similar to <a href='https://en.wikipedia.org/wiki/War_(card_game)'>War</a>


## Live Demo

https://rm-battle-royale.adambotma.com/


## Functionality Overview

1. War is a game in which each player flips the card on the top of their respective deck, each card has a given strength value, and the card with the highest value wins that battle.  
2. When a player wins a battle, they are given a point. 
3. The player with the most points at the end of 10 rounds is declared the winner in this version.
4. Ties currently give no point to either side, and the game goes to a new round.
5. Games currently can end in a tie. 
6. Player starts the game by clicking/tapping the "Play Card" button on the bottom right of the screen. 
7. After Clicking, the Ricks' top card is flipped displaying the card's character image, name, and card strength. 
8. After the Ricks' card is flipped, the Morty/opponent's card is flipped displaying the same data.
9. The higher strengthed card is determined the winner, and the following actions occur to allow the User to know who won the battle:
  * A small alert displays on the right of the screen telling the player whether "Rick Won", "Morty Won", or there was a "Tie."
  * A Giphy gif associated with the given winner is displayed in the Picture Frame in the upper right corner.
  * Audio associated with the winner is played (currently desktop only). 
10. After all the winner's alerts are displayed/played, the cards are automatically discarded/flipped and the next round is able to begin by clicking the "Play Card Button."
11. User continues with this until 10 rounds are played.  
12. At the end of 10 rounds, the player with the most points is determined the winner, and a winner's modal is displayed to alert the user.
13. Player is then given the option to play again, where the gameboard, card decks, and score are reset to begin the next game. 


