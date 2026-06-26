// ============================== VARIÁVEIS ==============================
const questions = [
    { image: "assets/flags/brazil.png", answer: "Brasil" },
    { image: "assets/flags/france.png", answer: "França" },
    { image: "assets/flags/italy.png", answer: "Itália" },
    { image: "assets/flags/spain.png", answer: "Espanha" },
    { image: "assets/flags/argentina.png", answer: "Argentina" },
    { image: "assets/flags/russia.png", answer: "Rússia" },
    { image: "assets/flags/chile.png", answer: "Chile" },
    { image: "assets/flags/uk.png", answer: "Reino Unido" },
    { image: "assets/flags/south-africa.png", answer: "África do Sul" },  
    { image: "assets/flags/saudi-arabia.png", answer: "Arábia Saudita" },
    { image: "assets/flags/uruguay.png", answer: "Uruguai" },
    { image: "assets/flags/cape-verde.png", answer: "Cabo verde" },
    { image: "assets/flags/iraq.png", answer: "Iraque" },
    { image: "assets/flags/norway.png", answer: "Noruega" },
    { image: "assets/flags/senegal.png", answer: "Senegal" }
];
const logo = document.querySelector(".logo");
const menu = document.querySelector(".menu");
const soundCorrect = new Audio("sounds/default-corr.mp3");
const soundWrong = new Audio("sounds/wrong.mp3");
const soundWin = new Audio("sounds/win.mp3");
const maxskips = 3;
let skips = 1;
let current = 0;
let score = 0;
let locked = false;
// ============================== FUNÇÕES ==============================
function coisa() { 
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa eu to cansado disso");
}
if (score === 999) {
    coisa();
}
function levenshtein(a, b) { // ============================== IDENTIFICA TYPOS ==============================
    a = normalize(a);
    b = normalize(b);

    const matrix = [];

    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }

    const distance = matrix[b.length][a.length];
    const maxLen = Math.max(a.length, b.length);

    return 1 - distance / maxLen;
}
//============================== 🧭SPA ==============================
const screens = {
    start: document.querySelector(".startScreen"),
    menu: document.querySelector(".menu-screen"),
    gameMenu: document.querySelector(".game-menu"),
    game: document.querySelector(".game-screen"),
    credits: document.querySelector(".credits"),
    settings: document.querySelector(".settings"),
    changelog: document.querySelector(".changelog"),
    results: document.querySelector(".results")
};

function showScreen(screen) {
    Object.values(screens).forEach(s => { // esconde todas as outras telas
        if (s) s.style.display = "none";
    });
    if (screens[screen]) {
        screens[screen].style.display = "flex"; // mostra só a tela pedida
    }

    if (screen === "menu") {
        document.querySelector(".logo").style.display = "block";
    } else {
        document.querySelector(".logo").style.display = "none";
    }
}
// ⚙️ configs
document.getElementById("settingsBtn").addEventListener("click", () => showScreen("settings"));
document.getElementById("backSettings").addEventListener("click", () => showScreen("menu"));

// 📜 changelog
document.getElementById("changelogBtn").addEventListener("click", () => showScreen("changelog"));
document.getElementById("backChangelog").addEventListener("click", () => showScreen("menu"));

// 📜créditos
document.getElementById("creditsBtn").addEventListener("click", () => showScreen("credits"));
document.getElementById("backCredits").addEventListener("click", () => showScreen("menu"));

document.getElementById("exitBtn").addEventListener("click", () => {
    const confirmExit = confirm("Tem certeza que deseja sair do GeoFlex?");

    if (confirmExit) {
        alert("Se a aba não fechar automaticamente, você pode fechá-la manualmente 🙂");
        window.close();
    }
});

// ▶ jogar
document.getElementById("playBtn").addEventListener("click", () => showScreen("gameMenu"));
document.getElementById("backMenuBtn").addEventListener("click", () => showScreen("menu"));

function normalize(text) {
    return text.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}
function loadQuestion() {
    const q = questions[current];
    document.getElementById("questionCounter").textContent =
    `Pergunta ${current + 1}/${questions.length}`;
    document.getElementById("skipCounter").textContent = `Skips: ${skips}/${maxskips}`;
    document.getElementById("flagImg").src = q.image;
    document.getElementById("answerInput").value = "";
    document.getElementById("feedback").textContent = "";
    document.getElementById("answerInput").focus()
}
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];
    }
}
function startGame() {
    showScreen("start");
    skips = 1;
}
document.getElementById("troço").textContent = `Serão ${questions.length} perguntas`;
document.getElementById("startGameBtn").onclick = () => {
    showScreen("game");
    current = 0;
    score = 0;
    shuffle(questions);
    requestAnimationFrame(() => loadQuestion());
    };
console.log("mais coisa");
function showResults() {
    const percent = Math.round((score / questions.length) * 100);
let rank = "";

if (percent >= 90) {
    rank = "👑 Mestre GeoFlex";
}
else if (percent >= 70) {
    rank = "🗺️ Especialista - GG";
}
else if (percent >= 50) {
    rank = "🌎 Explorador - Boaa";
}
else if (percent >= 30) {
    rank = "📍 Aprendiz - Você consegue fazer melhor";
}
else {
    rank = "🧭 Turista Perdido - Tenta de novo!";
}
    showScreen("results");
    document.getElementById("resultText").textContent =
        `✔ Acertos: ${score}/${questions.length} (${percent}%)`;
document.getElementById("rankDisplay").textContent = rank;
    document.getElementById("restartBtn").onclick = () => {
        startGame();
    };
    document.getElementById("statsDisplay").textContent =
`✔ Acertos: ${score} | ❌ Erros: ${questions.length - score}`;

    document.getElementById("menuBtn").onclick = () => {
        showScreen("menu");
    };
}

document.getElementById("playBtn").addEventListener("click", () => showScreen("gameMenu"));

document.getElementById("submitBtn").addEventListener("click", () => {
    if (locked) return;
    locked = true;
    const input = document.getElementById("answerInput").value;
    const correct = questions[current].answer;
    if (
    Array.isArray(correct)
        ? correct.some(answer => levenshtein(input, answer) >= 0.8)
        : levenshtein(input, correct) >= 0.8) {
        score++;

    if (skips < maxskips) {
        skips += 1;
    }

    document.getElementById("feedback").textContent = "✔ Certo!";
    soundCorrect.play();
} else {
        document.getElementById("feedback").textContent = "❌ Errado! Era: " + (Array.isArray(correct) ? correct[0] : correct);
        soundWrong.play();
    }

    setTimeout(() => {
    flagImg.style.transform = "translateX(-100px)";
    flagImg.style.opacity = "0";
    setTimeout(() => {
        current++;
        if (current >= questions.length) {
            showResults();
            soundWin.play();
        } else {
            loadQuestion();
            flagImg.style.transform = "translateX(100px)";
            flagImg.style.opacity = "0";
            setTimeout(() => {
                flagImg.style.transform = "translateX(0)";
                flagImg.style.opacity = "1";
            }, 50);
        }
        locked = false;
    }, 150);
}, 800);
    setTimeout(() => {
    flagImg.classList.remove("flash-correct", "flash-wrong");
}, 150);
});
document.getElementById("qskipBtn").addEventListener("click", () => { // botão de pular pergunta
    if (locked) return;
    if (skips !== 0) {
    if (current < questions.length - 1) {
        current++;
        loadQuestion();
        skips -= 1;
    } else {
        showResults();
    }
} else {
        alert("voce não tem skips restantes☹");
    }
});
document.getElementById("answerInput").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("submitBtn").click();
    }
});
document.getElementById("restartGameBtn").addEventListener("click", () => {
    current = 0;
    score = 0;
    skips = 1;
    locked = false;

    shuffle(questions);
    showScreen("game");
    loadQuestion();
});
document.getElementById("exitGameBtn").addEventListener("click", () => {
    current = 0;
    score = 0;
    skips = 1;
    locked = false;
    showScreen("gameMenu");
});
document.getElementById("playGameBtn").addEventListener("click", () => {
    document.querySelector(".game-menu").style.display = "none";
    startGame();
});
