
// ⚙️ configs

    document.getElementById("settingsBtn").addEventListener("click", () => {
    document.querySelector(".buttons").style.display = "none";
    document.querySelector(".settings").style.display = "block";
});

document.getElementById("backSettings").addEventListener("click", () => {
    document.querySelector(".settings").style.display = "none";
    document.querySelector(".buttons").style.display = "flex";
});

// 📜 changelog

document.getElementById("changelogBtn").addEventListener("click", () => {
    document.querySelector(".buttons").style.display = "none";
    document.querySelector(".changelog").style.display = "block";
});

document.getElementById("backChangelog").addEventListener("click", () => {
    document.querySelector(".changelog").style.display = "flex";
    document.querySelector(".buttons").style.display = "flex";
});

// 📜créditos
document.getElementById("creditsBtn").addEventListener("click", () => {
    document.querySelector(".buttons").style.display = "none";
    document.querySelector(".credits").style.display = "block";
});

document.getElementById("backCredits").addEventListener("click", () => {
    document.querySelector(".credits").style.display = "none";
    document.querySelector(".buttons").style.display = "flex";
});


document.getElementById("exitBtn").addEventListener("click", () => {
    const confirmExit = confirm("Tem certeza que deseja sair do GeoFlex?");

    if (confirmExit) {
        window.open('', '_self', '');
        window.close();

        document.body.innerHTML = "<h1>Você saiu do jogo</h1>";
    }
});

// ▶ jogar
document.getElementById("playBtn").addEventListener("click", () => {
    document.querySelector(".buttons").style.display = "none";
    document.querySelector(".logo").style.display = "none";
    document.querySelector(".game-menu").style.display = "flex";
});

document.getElementById("backMenuBtn").addEventListener("click", () => {
    document.querySelector(".game-menu").style.display = "none";
    document.querySelector(".logo").style.display = "block";
    document.querySelector(".buttons").style.display = "flex";
});
// variaveis
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
    { image: "assets/flags/saudi-arabia.png", answer: "Arábia Saudita" }
];
const soundCorrect = new Audio("sounds/default-corr.mp3");
const soundWrong = new Audio("sounds/wrong.mp3");
let current = 0;
let score = 0;
let locked = false;

function normalize(text) {
    return text.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

function loadQuestion() {
    const q = questions[current];
    document.getElementById("questionCounter").textContent =
    `Pergunta ${current + 1}/${questions.length}`;

    document.getElementById("flagImg").src = q.image;
    document.getElementById("answerInput").value = "";
    document.getElementById("feedback").textContent = "";
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startGame() {
    document.querySelector(".buttons").style.display = "none";
    document.querySelector(".game-menu").style.display = "none";
    document.querySelector(".logo").style.display = "none";
    document.querySelector(".game-screen").style.display = "flex";

    current = 0;
    score = 0;
    shuffle(questions);
    loadQuestion();
}

document.getElementById("playBtn").addEventListener("click", () => {
    document.querySelector(".buttons").style.display = "none";
    document.querySelector(".game-menu").style.display = "flex";
});

document.getElementById("submitBtn").addEventListener("click", () => {
    if (locked) return;
    locked = true;
    const input = document.getElementById("answerInput").value;
    const correct = questions[current].answer;

    if (normalize(input) === normalize(correct)) {
        score++;
        document.getElementById("feedback").textContent = "✔ Certo!";
        soundCorrect.play();
        
    } else {
        document.getElementById("feedback").textContent = "❌ Errado! Era: " + correct;
        soundWrong.play();
    }

    setTimeout(() => {

    flagImg.style.transform = "translateX(-100px)";
    flagImg.style.opacity = "0";

    setTimeout(() => {

        current++;

        if (current >= questions.length) {
            showResults();
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

function showResults() {
    document.querySelector(".game-screen").innerHTML = `
        <h1>🏁 Resultado</h1>
        <p>✔ Acertos: ${score}/${questions.length}</p>

        <button id="restartBtn">Jogar de novo</button>
        <button id="menuBtn">Voltar ao menu</button>
    `;

    document.getElementById("restartBtn").onclick = () => location.reload();

    document.getElementById("menuBtn").onclick = () => {
        location.reload();
    };
}

document.getElementById("answerInput").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("submitBtn").click();
    }
});

document.getElementById("playGameBtn").addEventListener("click", () => {
    document.querySelector(".game-menu").style.display = "none";
    startGame();
});
