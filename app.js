import { h, render, Component } from 'preact';
import { useState, useEffect } from 'preact/hooks';

const fetchWordPairs = async () => {
    const response = await fetch('01.json');
    const data = await response.json();
    return data.pairs;
};

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

const Timer = ({ start }) => {
    const [time, setTime] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(Math.floor((Date.now() - start) / 1000));
        }, 1000);
        return () => clearInterval(interval);
    }, [start]);

    return <div className="timer">Time: {time}s</div>;
};

const Game = () => {
    const [wordPairs, setWordPairs] = useState({});
    const [words, setWords] = useState([]);
    const [synonyms, setSynonyms] = useState([]);
    const [selectedWord, setSelectedWord] = useState(null);
    const [selectedSynonym, setSelectedSynonym] = useState(null);
    const [matches, setMatches] = useState(0);
    const [startTime, setStartTime] = useState(Date.now());

    useEffect(() => {
        const loadWordPairs = async () => {
            const pairs = await fetchWordPairs();
            setWordPairs(pairs);
            initializeGame(pairs);
        };
        loadWordPairs();
    }, []);

    const initializeGame = (pairs) => {
        const keys = Object.keys(pairs);
        const randomKeys = keys.sort(() => 0.5 - Math.random()).slice(0, 5);
        const wordsList = [...randomKeys];
        const synonymsList = randomKeys.map(key => pairs[key]);

        shuffleArray(wordsList);
        shuffleArray(synonymsList);

        setWords(wordsList);
        setSynonyms(synonymsList);
        setMatches(0);
        setStartTime(Date.now());
    };

    const handleWordClick = (word) => {
        setSelectedWord(word);
        checkMatch(word, selectedSynonym);
    };

    const handleSynonymClick = (synonym) => {
        setSelectedSynonym(synonym);
        checkMatch(selectedWord, synonym);
    };

    const checkMatch = (word, synonym) => {
        if (!word || !synonym) return;

        if (wordPairs[word] === synonym) {
            setMatches(matches + 1);
            setWords(words.filter(w => w !== word));
            setSynonyms(synonyms.filter(s => s !== synonym));

            if (matches + 1 === 5) {
                initializeGame(wordPairs);
            }
        }
        setSelectedWord(null);
        setSelectedSynonym(null);
    };

    return (
        <div className="game-container">
            <div className="column" id="words-column">
                {words.map(word => (
                    <div
                        className={`word ${selectedWord === word ? 'selected' : ''}`}
                        onClick={() => handleWordClick(word)}
                    >
                        {word}
                    </div>
                ))}
            </div>
            <div className="column" id="synonyms-column">
                {synonyms.map(synonym => (
                    <div
                        className={`synonym ${selectedSynonym === synonym ? 'selected' : ''}`}
                        onClick={() => handleSynonymClick(synonym)}
                    >
                        {synonym}
                    </div>
                ))}
            </div>
            <Timer start={startTime} />
        </div>
    );
};

render(<Game />, document.getElementById('app'));