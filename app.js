/* =========================================================
   SECRET — Focus • Learn • Improve
   ========================================================= */

const STORAGE_KEY = "secretAppData";

const defaultData = {
    xp: 0,
    streak: 0,
    sessions: 0,
    focusMinutes: 0,
    quizCorrect: 0,
    quizAnswered: 0,
    gamesCompleted: 0,
    challengeCompleted: false,
    challengeDate: "",
    lastActiveDate: ""
};

let data = loadData();

let timerSeconds = 25 * 60;
let timerInterval = null;
let timerRunning = false;


/* =========================================================
   STORAGE
   ========================================================= */

function loadData() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (saved) {
            return {
                ...defaultData,
                ...JSON.parse(saved)
            };
        }
    } catch (error) {
        console.log("Could not load saved data.");
    }

    return { ...defaultData };
}


function saveData() {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
    );
}


/* =========================================================
   INITIALIZATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    updateStats();
    updateDailyStreak();

});


function updateStats() {

    const streakElement =
        document.getElementById("streak");

    const xpElement =
        document.getElementById("xp");

    const sessionsElement =
        document.getElementById("sessions");

    if (streakElement) {
        streakElement.textContent = data.streak;
    }

    if (xpElement) {
        xpElement.textContent = data.xp;
    }

    if (sessionsElement) {
        sessionsElement.textContent = data.sessions;
    }
}


/* =========================================================
   XP
   ========================================================= */

function addXP(amount) {

    data.xp += amount;

    saveData();
    updateStats();
}


/* =========================================================
   DAILY STREAK
   ========================================================= */

function getToday() {
    return new Date().toISOString().split("T")[0];
}


function updateDailyStreak() {

    const today = getToday();

    if (!data.lastActiveDate) {

        data.streak = 1;
        data.lastActiveDate = today;

        saveData();
        updateStats();

        return;
    }

    if (data.lastActiveDate === today) {
        return;
    }

    const previous =
        new Date(data.lastActiveDate);

    const current =
        new Date(today);

    const difference =
        Math.floor(
            (current - previous) /
            (1000 * 60 * 60 * 24)
        );

    if (difference === 1) {
        data.streak++;
    } else {
        data.streak = 1;
    }

    data.lastActiveDate = today;

    saveData();
    updateStats();
}


/* =========================================================
   HOME
   ========================================================= */

function goHome() {

    document.getElementById("content").innerHTML = `

        <h2>🚀 Start improving</h2>

        <p>
            Choose an activity above and start your session.
        </p>

    `;
}


/* =========================================================
   FOCUS TIMER
   ========================================================= */

function openFocus() {

    stopTimer();

    timerSeconds = 25 * 60;

    document.getElementById("content").innerHTML = `

        <div class="timer">

            <h2>🎯 Focus Session</h2>

            <p>
                Stay focused for 25 minutes.
            </p>

            <div
                id="timer"
                class="timer-display">
                25:00
            </div>

            <div class="progress-bar">
                <div
                    id="timerProgress"
                    class="progress-fill">
                </div>
            </div>

            <button onclick="startTimer()">
                ▶ Start
            </button>

            <button onclick="pauseTimer()">
                ⏸ Pause
            </button>

            <button onclick="resetTimer()">
                🔄 Reset
            </button>

            <br>

            <button onclick="goHome()">
                ← Home
            </button>

        </div>

    `;

    updateTimerDisplay();
}


function startTimer() {

    if (timerRunning) {
        return;
    }

    timerRunning = true;

    timerInterval = setInterval(() => {

        if (timerSeconds <= 0) {

            finishFocus();

            return;
        }

        timerSeconds--;

        updateTimerDisplay();

    }, 1000);
}


function pauseTimer() {

    timerRunning = false;

    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}


function stopTimer() {

    timerRunning = false;

    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}


function resetTimer() {

    stopTimer();

    timerSeconds = 25 * 60;

    updateTimerDisplay();
}


function updateTimerDisplay() {

    const timer =
        document.getElementById("timer");

    if (!timer) {
        return;
    }

    const minutes =
        Math.floor(timerSeconds / 60);

    const seconds =
        timerSeconds % 60;

    timer.textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    const progress =
        document.getElementById("timerProgress");

    if (progress) {

        const total = 25 * 60;

        const completed =
            ((total - timerSeconds) / total) * 100;

        progress.style.width =
            `${completed}%`;
    }
}


function finishFocus() {

    stopTimer();

    data.sessions++;
    data.focusMinutes += 25;

    addXP(25);

    saveData();
    updateStats();

    document.getElementById("content").innerHTML = `

        <div class="success">

            <h2>🎉 Focus Complete!</h2>

            <p>
                Excellent work!
            </p>

            <p>
                You earned <strong>+25 XP</strong>.
            </p>

            <button onclick="openFocus()">
                🔁 Another Session
            </button>

            <button onclick="goHome()">
                ← Home
            </button>

        </div>

    `;
}


/* =========================================================
   MIND GAMES
   ========================================================= */

function openGames() {

    document.getElementById("content").innerHTML = `

        <h2>🧠 Mind Games</h2>

        <p>
            Choose a challenge.
        </p>

        <br>

        <button onclick="numberGame()">
            🔢 Number Sequence
        </button>

        <button onclick="oddOneOutGame()">
            🔍 Odd One Out
        </button>

        <br>

        <button onclick="goHome()">
            ← Home
        </button>

    `;
}


/* NUMBER GAME */

function numberGame() {

    document.getElementById("content").innerHTML = `

        <h2>🔢 Number Sequence</h2>

        <p class="question">
            2, 4, 8, 16, ?
        </p>

        <button
            class="answer"
            onclick="gameAnswer(true)">
            32
        </button>

        <button
            class="answer"
            onclick="gameAnswer(false)">
            24
        </button>

        <button
            class="answer"
            onclick="gameAnswer(false)">
            30
        </button>

        <br>

        <button onclick="openGames()">
            ← Games
        </button>

    `;
}


function gameAnswer(correct) {

    if (correct) {

        data.gamesCompleted++;

        addXP(15);

        document.getElementById("content").innerHTML = `

            <div class="success">

                <h2>🎉 Correct!</h2>

                <p>
                    The pattern doubles each time.
                </p>

                <p>
                    <strong>+15 XP</strong>
                </p>

                <button onclick="openGames()">
                    🧠 More Games
                </button>

            </div>

        `;

    } else {

        document.getElementById("content").innerHTML = `

            <div class="success">

                <h2>❌ Not quite</h2>

                <p>
                    Try another challenge!
                </p>

                <button onclick="numberGame()">
                    🔁 Try Again
                </button>

                <button onclick="openGames()">
                    ← Games
                </button>

            </div>

        `;
    }

    saveData();
}


/* ODD ONE OUT */

function oddOneOutGame() {

    document.getElementById("content").innerHTML = `

        <h2>🔍 Odd One Out</h2>

        <p class="question">
            Which number is different?
        </p>

        <button onclick="oddAnswer(false)">
            12
        </button>

        <button onclick="oddAnswer(false)">
            18
        </button>

        <button onclick="oddAnswer(true)">
            17
        </button>

        <button onclick="oddAnswer(false)">
            24
        </button>

        <br>

        <button onclick="openGames()">
            ← Games
        </button>

    `;
}


function oddAnswer(correct) {

    if (correct) {

        data.gamesCompleted++;

        addXP(15);

        document.getElementById("content").innerHTML = `

            <div class="success">

                <h2>🎉 Correct!</h2>

                <p>
                    17 is the only odd number.
                </p>

                <p>
                    <strong>+15 XP</strong>
                </p>

                <button onclick="openGames()">
                    🧠 More Games
                </button>

            </div>

        `;

    } else {

        document.getElementById("content").innerHTML = `

            <h2>❌ Try again</h2>

            <button onclick="oddOneOutGame()">
                🔁 Try Again
            </button>

            <button onclick="openGames()">
                ← Games
            </button>

        `;
    }

    saveData();
}


/* =========================================================
   QUIZ
   ========================================================= */

const questions = [

    {
        question:
            "Which organelle is known as the powerhouse of the cell?",

        options: [
            "Nucleus",
            "Mitochondria",
            "Ribosome",
            "Vacuole"
        ],

        answer: 1
    },

    {
        question:
            "What is 12 × 8?",

        options: [
            "86",
            "96",
            "108",
            "112"
        ],

        answer: 1
    },

    {
        question:
            "Which gas do plants mainly use during photosynthesis?",

        options: [
            "Oxygen",
            "Nitrogen",
            "Carbon dioxide",
            "Hydrogen"
        ],

        answer: 2
    },

    {
        question:
            "What is the capital of India?",

        options: [
            "Mumbai",
            "New Delhi",
            "Kolkata",
            "Chennai"
        ],

        answer: 1
    },

    {
        question:
            "Which planet is known as the Red Planet?",

        options: [
            "Venus",
            "Earth",
            "Mars",
            "Jupiter"
        ],

        answer: 2
    }

];

let currentQuestion = 0;
let quizScore = 0;


function openQuiz() {

    currentQuestion = 0;
    quizScore = 0;

    showQuestion();
}


function showQuestion() {

    const question =
        questions[currentQuestion];

    document.getElementById("content").innerHTML = `

        <h2>📚 Quiz</h2>

        <p>
            Question ${currentQuestion + 1}
            of ${questions.length}
        </p>

        <div class="progress-bar">

            <div
                class="progress-fill"
                style="width:${(currentQuestion / questions.length) * 100}%">
            </div>

        </div>

        <p class="question">
            ${question.question}
        </p>

        ${question.options.map((option, index) => `

            <button
                class="answer"
                onclick="answerQuiz(${index})">

                ${option}

            </button>

        `).join("")}

        <br>

        <button onclick="goHome()">
            ← Home
        </button>

    `;
}


function answerQuiz(index) {

    const question =
        questions[currentQuestion];

    data.quizAnswered++;

    if (index === question.answer) {

        quizScore++;
        data.quizCorrect++;

        addXP(5);

    }

    currentQuestion++;

    saveData();

    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        finishQuiz();

    }
}


function finishQuiz() {

    const percentage =
        Math.round(
            (quizScore / questions.length) * 100
        );

    document.getElementById("content").innerHTML = `

        <div class="success">

            <h2>🏆 Quiz Complete!</h2>

            <p>
                Score:
                <strong>
                    ${quizScore}/${questions.length}
                </strong>
            </p>

            <p>
                ${percentage}%
            </p>

            <p>
                You earned
                <strong>
                    ${quizScore * 5} XP
                </strong>
            </p>

            <button onclick="openQuiz()">
                🔁 Try Again
            </button>

            <button onclick="goHome()">
                ← Home
            </button>

        </div>

    `;
}


/* =========================================================
   DAILY CHALLENGE
   ========================================================= */

function openChallenge() {

    const today = getToday();

    if (data.challengeDate !== today) {

        data.challengeCompleted = false;
        data.challengeDate = today;

        saveData();
    }


    if (data.challengeCompleted) {

        document.getElementById("content").innerHTML = `

            <div class="success">

                <h2>🏆 Challenge Complete!</h2>

                <p>
                    You already completed today's challenge.
                </p>

                <p>
                    Come back tomorrow for a new challenge.
                </p>

                <button onclick="goHome()">
                    ← Home
                </button>

            </div>

        `;

        return;
    }


    document.getElementById("content").innerHTML = `

        <h2>⚡ Today's Challenge</h2>

        <p class="question">
            Complete a 15-minute distraction-free
            study session.
        </p>

        <button onclick="completeChallenge()">
            🏆 Complete Challenge
        </button>

        <br>

        <button onclick="goHome()">
            ← Home
        </button>

    `;
}


function completeChallenge() {

    data.challengeCompleted = true;

    addXP(50);

    saveData();

    document.getElementById("content").innerHTML = `

        <div class="success">

            <h2>🏆 Amazing!</h2>

            <p>
                Daily challenge completed.
            </p>

            <p>
                <strong>+50 XP</strong>
            </p>

            <button onclick="goHome()">
                ← Home
            </button>

        </div>

    `;
}


/* =========================================================
   PROGRESS
   ========================================================= */

function openProgress() {

    const accuracy =
        data.quizAnswered > 0
            ? Math.round(
                (data.quizCorrect /
                data.quizAnswered) * 100
              )
            : 0;


    document.getElementById("content").innerHTML = `

        <h2>📊 Your Progress</h2>

        <br>

        <p>
            ⭐ Total XP:
            <strong>${data.xp}</strong>
        </p>

        <br>

        <p>
            🔥 Current Streak:
            <strong>${data.streak} days</strong>
        </p>

        <br>

        <p>
            🎯 Focus Sessions:
            <strong>${data.sessions}</strong>
        </p>

        <br>

        <p>
            ⏱️ Focus Minutes:
            <strong>${data.focusMinutes}</strong>
        </p>

        <br>

        <p>
            🧠 Games Completed:
            <strong>${data.gamesCompleted}</strong>
        </p>

        <br>

        <p>
            📚 Quiz Accuracy:
            <strong>${accuracy}%</strong>
        </p>

        <br>

        <button onclick="goHome()">
            ← Home
        </button>

    `;
}
