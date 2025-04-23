document.addEventListener('DOMContentLoaded', function() {
    const flashcard = document.getElementById('flashcard');
    const questionText = document.getElementById('questionText');
    const answerText = document.getElementById('answerText');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const currentCardElement = document.getElementById('currentCard');
    const totalCardsElement = document.getElementById('totalCards');
    const progressBar = document.getElementById('progress');
    const shuffleBtn = document.getElementById('shuffleBtn');
    const restartBtn = document.getElementById('restartBtn');
    const studyMode = document.getElementById('study-mode');
    const testMode = document.getElementById('test-mode');
    const startTestBtn = document.getElementById('startTest');
    const submitAnswerBtn = document.getElementById('submitAnswer');
    const testQuestionText = document.getElementById('testQuestionText');
    const testOptions = document.getElementById('testOptions');
    const testProgress = document.getElementById('testProgress');
    const currentQuestionElement = document.getElementById('currentQuestion');
    const totalQuestionsElement = document.getElementById('totalQuestions');
    const testResults = document.getElementById('testResults');
    const scoreText = document.getElementById('scoreText');
    const scoreProgress = document.getElementById('scoreProgress');
    const resultsDetails = document.getElementById('resultsDetails');
    const restartTestBtn = document.getElementById('restartTest');
    const backToCardsBtn = document.getElementById('backToCards');
    const cards = [
        {
            question: "Алгоритм сортировки пузырьком (Bubble Sort)",
            answer: "Принцип: последовательное сравнение и обмен соседних элементов. Сложность: O(n²) в среднем и худшем случае. Преимущество: простая реализация. Недостаток: низкая эффективность на больших наборах данных."
        },
        {
            question: "Алгоритм быстрой сортировки (Quick Sort)",
            answer: "Принцип: разделяй и властвуй, выбор опорного элемента и разделение массива. Сложность: O(n log n) в среднем, O(n²) в худшем случае. Преимущество: высокая эффективность на практике. Один из самых быстрых алгоритмов сортировки."
        },
        {
            question: "Алгоритм сортировки слиянием (Merge Sort)",
            answer: "Принцип: разделяй и властвуй, деление массива пополам до единичных элементов, затем слияние. Сложность: O(n log n) в среднем и худшем случае. Преимущество: стабильность, предсказуемая производительность. Недостаток: требует дополнительную память O(n)."
        },
        {
            question: "Бинарный поиск (Binary Search)",
            answer: "Принцип: поиск в отсортированном массиве путем деления области поиска пополам. Сложность: O(log n). Требует предварительной сортировки данных. Основа многих эффективных алгоритмов поиска."
        },
        {
            question: "Обход дерева в глубину (DFS)",
            answer: "Принцип: исследование пути до конца перед возвратом. Реализация: рекурсия или стек. Применение: поиск путей, топологическая сортировка, выявление циклов. Сложность: O(V + E), где V - вершины, E - рёбра."
        },
        {
            question: "Обход дерева в ширину (BFS)",
            answer: "Принцип: исследование всех соседних узлов перед переходом на следующий уровень. Реализация: очередь. Применение: поиск кратчайшего пути, уровневый обход графа. Сложность: O(V + E), где V - вершины, E - рёбра."
        },
        {
            question: "Алгоритм Дейкстры",
            answer: "Принцип: поиск кратчайшего пути от одной вершины графа до всех остальных. Использует приоритетную очередь для выбора ближайшей непосещенной вершины. Сложность: O(V² + E) или O((V + E) log V) с бинарной кучей. Работает только для графов с неотрицательными весами рёбер."
        },
        {
            question: "Алгоритм Беллмана-Форда",
            answer: "Принцип: поиск кратчайшего пути от одной вершины до всех остальных. Сложность: O(V*E). Преимущество перед Дейкстрой: работает для графов с отрицательными весами рёбер. Может определять отрицательные циклы."
        },
        {
            question: "Хеш-таблица (Hash Table)",
            answer: "Структура данных, использующая хеш-функцию для преобразования ключа в индекс массива. Обеспечивает доступ за O(1) в среднем случае. Методы разрешения коллизий: цепочки, открытая адресация. Широко используется в реализации словарей и множеств."
        },
        {
            question: "Красно-чёрное дерево",
            answer: "Самобалансирующееся бинарное дерево поиска. Свойства: каждый узел красный или чёрный; корень чёрный; листья (NIL) чёрные; у красного узла оба потомка чёрные; любой путь от узла до любого потомка-листа содержит одинаковое число чёрных узлов. Операции: поиск, вставка, удаление - O(log n)."
        }
    ];
    let currentIndex = 0;
    let isFlipped = false;
    let currentTestQuestion = 0;
    let testQuestions = [];
    let selectedAnswer = null;
    let testAnswers = [];
    function initializeCards() {
        totalCardsElement.textContent = cards.length;
        updateCardDisplay();
    }
    function updateCardDisplay() {
        currentCardElement.textContent = currentIndex + 1;
        questionText.textContent = cards[currentIndex].question;
        answerText.textContent = cards[currentIndex].answer;
        updateProgressBar();
    }
    function updateProgressBar() {
        const progress = ((currentIndex + 1) / cards.length) * 100;
        progressBar.style.width = `${progress}%`;
    }
    function flipCard() {
        isFlipped = !isFlipped;
        if (isFlipped) {
            flashcard.classList.add('flipped');
        } else {
            flashcard.classList.remove('flipped');
        }
    }
    function prevCard() {
        if (currentIndex > 0) {
            currentIndex--;
            isFlipped = false;
            flashcard.classList.remove('flipped');
            updateCardDisplay();
        }
    }
    function nextCard() {
        if (currentIndex < cards.length - 1) {
            currentIndex++;
            isFlipped = false;
            flashcard.classList.remove('flipped');
            updateCardDisplay();
        }
    }
    function shuffleCards() {
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }
        currentIndex = 0;
        isFlipped = false;
        flashcard.classList.remove('flipped');
        updateCardDisplay();
    }
    function restart() {
        currentIndex = 0;
        isFlipped = false;
        flashcard.classList.remove('flipped');
        updateCardDisplay();
    }
    function generateTestQuestions() {
        testQuestions = cards.map(card => {
            const correctAnswer = card.answer;
            const otherAnswers = cards
                .filter(c => c !== card)
                .map(c => c.answer)
                .sort(() => Math.random() - 0.5)
                .slice(0, 3);
            
            const answers = [...otherAnswers, correctAnswer]
                .sort(() => Math.random() - 0.5);
            
            return {
                question: card.question,
                answers: answers,
                correctAnswer: correctAnswer
            };
        }).sort(() => Math.random() - 0.5).slice(0, 10);
        
        totalQuestionsElement.textContent = testQuestions.length;
        testAnswers = new Array(testQuestions.length).fill(null);
    }
    function showCurrentTestQuestion() {
        const question = testQuestions[currentTestQuestion];
        testQuestionText.textContent = question.question;
        
        testOptions.innerHTML = '';
        question.answers.forEach((answer, index) => {
            const option = document.createElement('div');
            option.className = 'test-option';
            option.textContent = answer;
            option.addEventListener('click', () => selectAnswer(index));
            if (selectedAnswer === index) {
                option.classList.add('selected');
            }
            testOptions.appendChild(option);
        });
        
        currentQuestionElement.textContent = currentTestQuestion + 1;
        updateTestProgress();
    }
    function selectAnswer(index) {
        selectedAnswer = index;
        document.querySelectorAll('.test-option').forEach((option, i) => {
            option.classList.toggle('selected', i === index);
        });
    }
    function updateTestProgress() {
        const progress = ((currentTestQuestion + 1) / testQuestions.length) * 100;
        testProgress.style.width = `${progress}%`;
    }
    function showTestResults() {
        const correctAnswers = testAnswers.filter((answer, index) => 
            testQuestions[index].answers[answer] === testQuestions[index].correctAnswer
        ).length;
        
        const score = Math.round((correctAnswers / testQuestions.length) * 100);
        scoreText.textContent = `${correctAnswers} из ${testQuestions.length} (${score}%)`;
        scoreProgress.style.width = `${score}%`;
        
        resultsDetails.innerHTML = testQuestions.map((question, index) => {
            const userAnswer = testQuestions[index].answers[testAnswers[index]];
            const isCorrect = userAnswer === question.correctAnswer;
            
            return `
                <div class="result-item ${isCorrect ? 'correct' : 'incorrect'}">
                    <p><strong>Вопрос ${index + 1}:</strong> ${question.question}</p>
                    <p>Ваш ответ: ${userAnswer}</p>
                    ${!isCorrect ? `<p>Правильный ответ: ${question.correctAnswer}</p>` : ''}
                </div>
            `;
        }).join('');
        
        testResults.style.display = 'block';
        submitAnswerBtn.style.display = 'none';
    }
    function startTest() {
        studyMode.classList.remove('active');
        testMode.classList.add('active');
        generateTestQuestions();
        currentTestQuestion = 0;
        selectedAnswer = null;
        testResults.style.display = 'none';
        submitAnswerBtn.style.display = 'block';
        showCurrentTestQuestion();
    }
    function submitAnswer() {
        if (selectedAnswer === null) return;
        
        testAnswers[currentTestQuestion] = selectedAnswer;
        
        if (currentTestQuestion < testQuestions.length - 1) {
            currentTestQuestion++;
            selectedAnswer = null;
            showCurrentTestQuestion();
        } else {
            showTestResults();
        }
    }
    function backToCards() {
        testMode.classList.remove('active');
        studyMode.classList.add('active');
    }
    flashcard.addEventListener('click', flipCard);
    prevBtn.addEventListener('click', prevCard);
    nextBtn.addEventListener('click', nextCard);
    shuffleBtn.addEventListener('click', shuffleCards);
    restartBtn.addEventListener('click', restart);
    startTestBtn.addEventListener('click', startTest);
    submitAnswerBtn.addEventListener('click', submitAnswer);
    restartTestBtn.addEventListener('click', startTest);
    backToCardsBtn.addEventListener('click', backToCards);
    document.addEventListener('keydown', function(e) {
        if (studyMode.classList.contains('active')) {
            if (e.key === 'ArrowLeft') {
                prevCard();
            } else if (e.key === 'ArrowRight') {
                nextCard();
            } else if (e.key === ' ' || e.key === 'Spacebar') {
                flipCard();
                e.preventDefault();
            }
        }
    });
    initializeCards();
});
