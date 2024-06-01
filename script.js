
const wordPairs = {
    "very careful": "cautious",
    "very weak": "frail",
    "very frightening": "terrifying",
    "very annoying": "infuriating",
    "very colorful": "vibrant",
    "very creative": "innovative",
    "very busy": "swamped",
    "very angry": "furious",
    "very big": "massive",
    "very noisy": "deafening",
    "very poor": "destitute",
    "very cheap": "stingy",
    "very tired": "exhausted",
    "very hungry": "starving",
    "very simple": "basic",
    "very important": "crucial",
    "very smart": "intelligent",
    "very sad": "sorrowful",
    "very upset": "distraught",
    "very cold": "freezing",
    "very strong": "forceful",
    "very calm": "serene",
    "very sure": "certain",
    "very old": "ancient",
    "very wet": "soaked",
    "very short": "brief",
    "very dry": "arid",
    "very beautiful": "gorgeous",
    "very boring": "dull",
    "very fast": "rapid",
    "very bad": "awful",
    "very large": "colossal",
    "very worried": "anxious",
    "very high": "lofty",
    "very shy": "timid",
    "very risky": "perilous",
    "very attractive": "charming",
    "very rude": "insolent",
    "very long way": "miles",
    "very confused": "perplexed",
    "very exciting": "exhilarating",
    "very sleepy": "lethargic",
    "very thin": "gaunt",
    "very loved": "adored",
    "very slow": "sluggish",
    "very good": "superb",
    "very easy": "piece of cake",
    "very bright": "dazzling"
};

let selectedWord = null;
let selectedSynonym = null;
let matches = 0;
let startTime;
let timerInterval;

function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    document.getElementById('timer').innerText = `Time: ${elapsedTime}s`;
}

function stopTimer() {
    clearInterval(timerInterval);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function initializeGame() {
    const wordsColumn = document.getElementById('words-column');
    const synonymsColumn = document.getElementById('synonyms-column');

    wordsColumn.innerHTML = '';
    synonymsColumn.innerHTML = '';

    const keys = Object.keys(wordPairs);
    const randomKeys = keys.sort(() => 0.5 - Math.random()).slice(0, 5);

    const words = randomKeys.slice();
    const synonyms = randomKeys.map(key => wordPairs[key]);

    shuffleArray(words);
    shuffleArray(synonyms);

    words.forEach(word => {
        const wordDiv = document.createElement('div');
        wordDiv.className = 'word';
        wordDiv.innerText = word;
        wordDiv.onclick = () => selectWord(wordDiv, word);
        wordsColumn.appendChild(wordDiv);
    });

    synonyms.forEach(synonym => {
        const synonymDiv = document.createElement('div');
        synonymDiv.className = 'synonym';
        synonymDiv.innerText = synonym;
        synonymDiv.onclick = () => selectSynonym(synonymDiv, synonym);
        synonymsColumn.appendChild(synonymDiv);
    });

    if (matches === 0) startTimer();
}

function selectWord(element, word) {
    if (selectedWord) selectedWord.classList.remove('selected');
    selectedWord = element;
    selectedWord.classList.add('selected');
    checkMatch(word, null);
}

function selectSynonym(element, synonym) {
    if (selectedSynonym) selectedSynonym.classList.remove('selected');
    selectedSynonym = element;
    selectedSynonym.classList.add('selected');
    checkMatch(null, synonym);
}

function checkMatch(word, synonym) {
    if (word === null) word = selectedWord.innerText;
    if (synonym === null) synonym = selectedSynonym.innerText;

    if (wordPairs[word] === synonym) {
        matches++;
        selectedWord.classList.add('fade-out');
        selectedSynonym.classList.add('fade-out');
        setTimeout(() => {
            selectedWord.classList.add('hidden');
            selectedSynonym.classList.add('hidden');
            selectedWord = null;
            selectedSynonym = null;
            if (matches === 5) {
                matches = 0;
                initializeGame();
            }
        }, 1000);
    }
}

window.onload = initializeGame;
