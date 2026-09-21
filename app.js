/* =====================================================
   SECRET ✦
   Focus • Learn • Improve
   ===================================================== */

const STORAGE_KEY = "secretBigApp";

const defaultData = {
    xp: 0,
    streak: 1,
    sessions: 0,
    games: 0,
    focusMinutes: 0,
    quizCorrect: 0,
    quizAnswered: 0,
    dailyCompleted: 0,
    lastDate: ""
};

let data = loadData();

let timer = 25 * 60;
let timerInterval = null;
let timerRunning = false;


/* =====================================================
   STORAGE
   ===================================================== */

function loadData() {

    try {

        const saved =
            localStorage.getItem(STORAGE_KEY);

        if (saved) {
            return {
                ...defaultData,
                ...JSON.parse(saved)
            };
        }

    } catch (error) {
        console.log("Storage error");
    }

    return { ...defaultData };
}


function saveData() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
    );
}


/* =====================================================
   START
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    updateStats();
    updateLevel();
    updateDailyGoal();
});


/* =====================================================
   HOME
   ===================================================== */

function goHome() {

    stopTimer();

    document.getElementById("content").innerHTML = `

        <h2>🚀 Welcome back!</h2>

        <p>
            Choose an activity and keep improving.
        </p>

    `;

    updateStats();
    updateLevel();
    updateDailyGoal();
}


/* =====================================================
   STATS
   ===================================================== */

function updateStats() {

    const xp =
        document.getElementById("xp");

    const streak =
        document.getElementById("streak");

    const sessions =
        document.getElementById("sessions");

    const games =
        document.getElementById("games");

    if (xp) xp.textContent = data.xp;
    if (streak) streak.textContent = data.streak;
    if (sessions) sessions.textContent = data.sessions;
    if (games) games.textContent = data.games;
}


/* =====================================================
   XP + LEVEL
   ===================================================== */

function addXP(amount) {

    data.xp += amount;

    saveData();

    updateStats();
    updateLevel();
}


function updateLevel() {

    const level =
        Math.floor(data.xp / 100) + 1;

    const currentXP =
        data.xp % 100;

    const levelElement =
        document.getElementById("level");

    const progress =
        document.getElementById("xpProgress");

    const needed =
        document.getElementById("xpNeeded");

    if (levelElement) {
        levelElement.textContent = level;
    }

    if (progress) {
        progress.style.width =
            currentXP + "%";
    }

    if (needed) {
        needed.textContent =
            100 - currentXP;
    }
}


/* =====================================================
   DAILY GOAL
   ===================================================== */

function completeDailyActivity
