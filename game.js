document.addEventListener('DOMContentLoaded', function() {
    const gameContainer = document.getElementById('game-container');
    const leftColumn = document.getElementById('left-column');
    const rightColumn = document.getElementById('right-column');
    const timerElement = document.getElementById('timer');
    const descriptionElement = document.getElementById('description');
    const gameSelect = document.getElementById('game-select');

    let wordPairs = [];
    let remainingPairs = [];
    let leftWords = [];
    let rightWords = [];
    let startTime;
    let matchedPairs = 0;
    let totalPairs = 0;
    let timerInterval;

    function loadDropdown() {
        for (let i = 1; i <= 99; i++) {
            fetch(`0${i}.json`)
                .then(response => {
                    if (response.ok) return response.json();
                    throw new Error('File not found');
                })
                .then(data => {
                    const option = document.createElement('option');
                    option.value = `0${i}.json`;
                    option.text = data.description;
                    gameSelect.appendChild(option);
                })
                .catch(error => {
                    console.log(`0${i}.json not found`);
                });
        }
    }

    gameSelect.addEventListener('change', function() {
        const selectedFile = gameSelect.value;
        if (selectedFile) {
            fetch(selectedFile)
                .then(response => response.json())
                .then(data => {
                    descriptionElement.innerText = data.description;
                    wordPairs = Object.entries(data.pairs);
                    totalPairs = wordPairs.length; // Set totalPairs to the length of wordPairs
                    remainingPairs = [...wordPairs]; // Initialize remaining pairs with all word pairs
                    startGame();
                });
        }
    });

    function startGame() {
        shuffleArray(remainingPairs);
        matchedPairs = 0; // Reset matched pairs count
        loadNextSet();
        startTimer();
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function loadNextSet() {
        leftColumn.innerHTML = '';
        rightColumn.innerHTML = '';

        const currentPairs = remainingPairs.slice(0, 5);
        leftWords = currentPairs.map(pair => pair[0]);
        rightWords = currentPairs.map(pair => pair[1]);

        shuffleArray(leftWords);
        shuffleArray(rightWords);

        leftWords.forEach(word => {
            const div = document.createElement('div');
            div.className = 'word left animate__animated';
            div.innerText = word;
            div.addEventListener('click', () => selectWord(div, 'left'));
            leftColumn.appendChild(div);
        });

        rightWords.forEach(word => {
            const div = document.createElement('div');
            div.className = 'word right animate__animated';
            div.innerText = word;
            div.addEventListener('click', () => selectWord(div, 'right'));
            rightColumn.appendChild(div);
        });
    }

    function selectWord(element, column) {
        if (element.classList.contains('selected')) {
            element.classList.remove('selected');
        } else {
            const selected = document.querySelector(`.word.selected.${column}`);
            if (selected) selected.classList.remove('selected');
            element.classList.add('selected');
        }

        const leftSelected = document.querySelector('.word.selected.left');
        const rightSelected = document.querySelector('.word.selected.right');

        if (leftSelected && rightSelected) {
            const leftWord = leftSelected.innerText;
            const rightWord = rightSelected.innerText;

            if (remainingPairs.find(pair => pair[0] === leftWord && pair[1] === rightWord)) {
                leftSelected.classList.add('matched', 'animate__bounceOut');
                rightSelected.classList.add('matched', 'animate__bounceOut');
                setTimeout(() => {
                    leftSelected.classList.add('hidden');
                    rightSelected.classList.add('hidden');
                    remainingPairs = remainingPairs.filter(pair => pair[0] !== leftWord && pair[1] !== rightWord); // Remove matched pair
                    matchedPairs++;
                    checkGameState();
                }, 1000);
            } else {
                leftSelected.classList.add('non-matched', 'animate__shakeX');
                rightSelected.classList.add('non-matched', 'animate__shakeX');
                setTimeout(() => {
                    leftSelected.classList.remove('selected', 'non-matched', 'animate__shakeX');
                    rightSelected.classList.remove('selected', 'non-matched', 'animate__shakeX');
                }, 1000);
            }
        }
    }

    function checkGameState() {
        if (matchedPairs >= totalPairs) {
            stopTimer();
        } else if (remainingPairs.length > 0) {
            loadNextSet();
        }
    }

    function startTimer() {
        startTime = Date.now();
        clearInterval(timerInterval); // Clear any existing timer interval
        timerInterval = setInterval(() => {
            const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
            timerElement.innerText = `Time: ${elapsedTime}s`;
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        alert(`Game over! You matched all pairs in ${elapsedTime} seconds.`);
    }

    loadDropdown();
});