let xp = Number(localStorage.getItem("secretXP")) || 0;
let streak = Number(localStorage.getItem("secretStreak")) || 0;

document.getElementById("xp").textContent = "⭐ " + xp;
document.getElementById("streak").textContent = "🔥 " + streak;


function addXP(amount) {

    xp += amount;

    localStorage.setItem("secretXP", xp);

    document.getElementById("xp").textContent = "⭐ " + xp;
}


function openFocus() {

    document.getElementById("content").innerHTML = `

        <h2>🎯 Focus</h2>

        <div style="text-align:center;margin-top:20px">

            <h1 id="timer">25:00</h1>

            <button onclick="startTimer()">
                Start Focus
            </button>

        </div>
    `;
}


let time = 25 * 60;
let timerRunning = false;


function startTimer() {

    if (timerRunning) return;

    timerRunning = true;

    const timer = setInterval(() => {

        let minutes = Math.floor(time / 60);
        let seconds = time % 60;

        document.getElementById("timer").textContent =
            `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;

        time--;

        if (time < 0) {

            clearInterval(timer);

            addXP(25);

            document.getElementById("content").innerHTML = `
                <h2>🎉 Focus Complete!</h2>
                <p>You earned +25 XP.</p>
            `;
        }

    }, 1000);
}


function openGames() {

    document.getElementById("content").innerHTML = `

        <h2>🧠 Mind Games</h2>

        <p style="margin-top:10px">
            Choose a game.
        </p>

        <br>

        <button onclick="numberGame()">
            🔢 Number Sequence
        </button>

    `;
}


function numberGame() {

    document.getElementById("content").innerHTML = `

        <h2>🔢 Number Sequence</h2>

        <p style="margin:20px 0">
            2, 4, 8, 16, ?
        </p>

        <button onclick="gameAnswer(true)">32</button>
        <button onclick="gameAnswer(false)">24</button>
        <button onclick="gameAnswer(false)">20</button>

    `;
}


function gameAnswer(correct) {

    if (correct) {

        addXP(15);

        document.getElementById("content").innerHTML = `
            <h2>🎉 Correct!</h2>
            <p>+15 XP</p>
        `;

    } else {

        document.getElementById("content").innerHTML = `
            <h2>Not quite!</h2>
            <p>Try another challenge.</p>
        `;

    }
}


function openQuiz() {

    document.getElementById("content").innerHTML = `

        <h2>📚 Quiz</h2>

        <p style="margin:20px 0">
            Which organelle is known as the powerhouse of the cell?
        </p>

        <button onclick="quizAnswer(true)">
            Mitochondria
        </button>

        <button onclick="quizAnswer(false)">
            Nucleus
        </button>

        <button onclick="quizAnswer(false)">
            Ribosome
        </button>

    `;
}


function quizAnswer(correct) {

    if (correct) {

        addXP(5);

        document.getElementById("content").innerHTML = `
            <h2>✅ Correct!</h2>
            <p>+5 XP</p>
        `;

    } else {

        document.getElementById("content").innerHTML = `
            <h2>❌ Incorrect</h2>
            <p>Keep learning!</p>
        `;

    }
}


function openChallenge() {

    document.getElementById("content").innerHTML = `

        <h2>⚡ Today's Challenge</h2>

        <p style="margin:20px 0">
            Complete a 15-minute distraction-free study session.
        </p>

        <button onclick="completeChallenge()">
            Complete Challenge
        </button>

    `;
}


function completeChallenge() {

    addXP(50);

    document.getElementById("content").innerHTML = `
        <h2>🏆 Challenge Complete!</h2>
        <p>+50 XP</p>
    `;
}
