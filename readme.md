# Word Match Game

## Overview

The Word Match Game is a simple HTML-based game where players match words from a given list with their corresponding synonyms or more descriptive terms. The game presents a pair of lists, and the player must correctly match words from the left column to words in the right column. As matches are made, the words fade away and new words appear, continuing until all pairs have been matched.

## Gameplay Mechanics

1. **Game Selection**: 
    - When the game loads, a dropdown box is displayed. This box contains descriptions of various word pairs that the player can choose from.
    - The player selects a game description from the dropdown to start the game.

2. **Starting the Game**:
    - Once a selection is made, the game fetches the corresponding word pair JSON file, displays the description, and starts the timer.
    - The game shows up to 5 word pairs at a time.

3. **Matching Words**:
    - Words are displayed in two columns. The player clicks on a word in the left column and then clicks on a word in the right column to make a match.
    - If the selected words form a correct pair, they are marked as matched, turn green, and then fade away.
    - If the selected words do not match, they turn red and shake to indicate an incorrect match.

4. **Continuing the Game**:
    - New word pairs fade in to replace matched pairs until all pairs from the selected game are matched.
    - The game continues until all pairs are correctly matched.

5. **Ending the Game**:
    - The timer stops when all pairs are matched, and a message displays the total time taken to complete the game.

## JSON File Format

Each word pair JSON file should follow a specific format to be compatible with the game. Here is the structure for creating future word pair files (e.g., `03.json`, `04.json`, etc.):

### JSON File Structure

```json
{
    "description": "Description of the word pairs",
    "pairs": {
        "word1": "match1",
        "word2": "match2",
        // additional word pairs
    }
}
```

### Example: `03.json`

```json
{
    "description": "Instead of using basic color names, try using these more vivid alternatives",
    "pairs": {
        "red": "crimson",
        "blue": "azure",
        "green": "emerald",
        "yellow": "goldenrod",
        "purple": "violet",
        "orange": "tangerine",
        "pink": "fuchsia",
        "brown": "chocolate",
        "black": "onyx",
        "white": "ivory",
        "gray": "charcoal",
        "light blue": "sky blue",
        "dark green": "forest green",
        "light green": "mint",
        "dark blue": "navy",
        "light red": "rose",
        "dark red": "burgundy",
        "light yellow": "lemon",
        "dark yellow": "amber",
        "light purple": "lavender",
        "dark purple": "plum",
        "light orange": "peach",
        "dark orange": "copper",
        "light brown": "beige",
        "dark brown": "mahogany",
        "light pink": "blush",
        "dark pink": "magenta",
        "light gray": "silver",
        "dark gray": "slate",
        "light black": "ebony",
        "dark white": "cream"
    }
}
```

### Creating New Word Pair Files

To create new word pair files, follow these steps:

1. **Create a new JSON file**: Name the file using a two-digit number, e.g., `04.json`, `05.json`.
2. **Add a description**: Provide a brief description that will be shown in the game dropdown.
3. **Define word pairs**: List the word pairs in the format `"word": "match"`.

### Example: `04.json`

```json
{
    "description": "Instead of using common phrases, try these more expressive alternatives",
    "pairs": {
        "very happy": "ecstatic",
        "very sad": "miserable",
        "very tired": "exhausted",
        "very fast": "speedy",
        "very slow": "sluggish",
        "very big": "gigantic",
        "very small": "tiny",
        "very good": "excellent",
        "very bad": "terrible",
        "very smart": "brilliant"
    }
}
```

## Running the Game

To run the game, simply open the `index.html` file in a web browser. The game will load, displaying the dropdown for selecting a game description. Select a game to start matching words and have fun!

## Future Enhancements

- Add more word pair JSON files to provide a variety of game options.
- Enhance the UI with additional animations and effects.
- Implement a scoring system to track player performance.

Enjoy playing the Word Match Game!
```
