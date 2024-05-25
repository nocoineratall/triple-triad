# triple-triad
Final Fantasy VIII card minigame

This game mimics the Final Fantasy saga card minigames. Not all rules all implemented, but will look forward to make it as close as possible to the original game.
This is an exercise for testing my coding skill.

RULES:
- Turns based game where the 2 players challenge each other to get the opponent's cards.
- There is a 3x3 gameboard initially empty. Each player owns 5 cards and during its turn can position one card on the board.
- Each card has 4 values, one for each side. When two or more cards are adjacent they battle based on their respective stats.
- The 'Attacker' (player in turn) can battle more 'Defensive' card, based on the number of adjacent cards present.
- If the attacking card stat is greater than the defensive card stat, the latter is owned by the Attacker.
- If the Attacking card stat is lower than or equal to the 'Defensive' card stat, nothing happens.
- The one which owns more card when the board is full, wins. A draw is possible. 
- Multiple reward systems at the end of the game are possible: this is using the 'Winner can get 1 card from the Loser hand'
