let rogobux = 500;
let sessionScore = 0;

const games = [
    { title: "Neo-Tokyo Parkour 2026", author: "CyberDev_26", genre: "Cyber-Obby", players: "4.8k", likes: "97%", icon: "⚡", color: "linear-gradient(135deg, #00f5d4, #00bbf9)" },
    { title: "Fábrica de Androides Tycoon", author: "FutureLabs", genre: "Tycoon 2026", players: "3.1k", likes: "93%", icon: "🤖", color: "linear-gradient(135deg, #7b2cbf, #3a0ca3)" },
    { title: "Sobrevive a la Tormenta Solar", author: "OrbitHost", genre: "Supervivencia", players: "6.4k", likes: "98%", icon: "☀️", color: "linear-gradient(135deg, #f72585, #7209b7)" },
    { title: "Simulador de Minería Lunar", author: "Artemis_X", genre: "Simulador IA", players: "2.2k", likes: "90%", icon: "🛸", color: "linear-gradient(135deg, #4361ee, #4cc9f0)" },
    { title: "Arena Láser Zero-G", author: "QuantumByte", genre: "Arena PvP", players: "3.9k", likes: "95%", icon: "🔫", color: "linear-gradient(135deg, #ff006e, #8338ec)" },
    { title: "Metrópolis Hovercar Rol", author: "Skyline2026", genre: "Mundo Abierto", players: "8.1k", likes: "96%", icon: "🏎️", color: "linear-gradient(135deg, #06d6a0, #118ab2)" }
];

const colors = ["#00f5d4", "#00bbf9", "#7b2cbf", "#f72585", "#fee440", "#ff5400", "#8ac926", "#ffffff", "#2b2d42", "#141722"];

function renderGames(list = games) {
    const grid = document.getElementById("gamesGrid");
    if (!grid) return;
    grid.innerHTML = "";
    list.forEach(game => {
        const card = document.createElement("div");
        card.className = "game-card";
        card.onclick = () => openGame(game);
        card.innerHTML = `
            <div class="game-thumb" style="background: ${game.color}">
                <span class="genre-tag">${game.genre}</span>
                <span>${game.icon}</span>
            </div>
            <div class="game-info">
                <div>
                    <div class="game-title">${game.title}</div>
                    <div class="game-author">Por @${game.author}</div>
                </div>
                <div class="game-meta">
                    <span>🟢 ${game.players} en línea</span>
                    <span>⚡ ${game.likes}</span>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function filterGames() {
    const term = document.getElementById("searchInput").value.toLowerCase();
    const filtered = games.filter(g => 
        g.title.toLowerCase().includes(term) || 
        g.genre.toLowerCase().includes(term) ||
        g.author.toLowerCase().includes(term)
    );
    renderGames(filtered);
}

function switchTab(tabId, btnElement) {
    document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
    document.getElementById(tabId).classList.add("active");

    if (btnElement) {
        document.querySelectorAll("nav button").forEach(btn => btn.classList.remove("active"));
        btnElement.classList.add("active");
    }
}

function initAvatarSwatches() {
    const createSwatches = (containerId, applyFn) => {
        const container = document.getElementById(containerId);
        if (!container) return;
        colors.forEach(c => {
            const sw = document.createElement("div");
            sw.className = "swatch";
            sw.style.backgroundColor = c;
            sw.onclick = () => applyFn(c);
            container.appendChild(sw);
        });
    };

    createSwatches("skin-swatches", c => {
        document.getElementById("part-head").style.backgroundColor = c;
        document.getElementById("part-larm").style.backgroundColor = c;
        document.getElementById("part-rarm").style.backgroundColor = c;
    });

    createSwatches("torso-swatches", c => {
        document.getElementById("part-torso").style.backgroundColor = c;
        document.getElementById("header-avatar").style.backgroundColor = c;
    });

    createSwatches("legs-swatches", c => {
        document.getElementById("part-lleg").style.backgroundColor = c;
        document.getElementById("part-rleg").style.backgroundColor = c;
    });
}

function publishGame() {
    const title = document.getElementById("newGameTitle").value.trim();
    const genre = document.getElementById("newGameGenre").value;
    const icon = document.getElementById("newGameIcon").value;

    if (!title) {
        alert("Escribe un nombre para tu servidor 2026.");
        return;
    }

    games.unshift({
        title: title,
        author: "CyberPlayer_26",
        genre: genre,
        players: "1",
        likes: "100%",
        icon: icon,
        color: "linear-gradient(135deg, #00f5d4, #7b2cbf)"
    });

    document.getElementById("newGameTitle").value = "";
    renderGames();
    switchTab("discover", document.getElementById("nav-discover"));
}

function openGame(game) {
    sessionScore = 0;
    document.getElementById("sessionScore").innerText = sessionScore;
    document.getElementById("modalTitle").innerText = `${game.icon} ${game.title}`;
    document.getElementById("modalDesc").innerText = `Host: @${game.author} • Modo: ${game.genre} • Ping: 12ms`;
    document.getElementById("startGameBtn").style.display = "inline-block";
    document.getElementById("target-block").style.display = "none";
    document.getElementById("gameModal").classList.add("open");
}

function closeModal() {
    document.getElementById("gameModal").classList.remove("open");
}

function startMiniGame() {
    document.getElementById("startGameBtn").style.display = "none";
    const block = document.getElementById("target-block");
    block.style.display = "flex";
    moveBlock();
}

function moveBlock() {
    const arena = document.getElementById("play-arena");
    const block = document.getElementById("target-block");
    const maxX = Math.max(20, arena.clientWidth - 65);
    const maxY = Math.max(20, arena.clientHeight - 65);
    block.style.left = Math.floor(Math.random() * maxX) + "px";
    block.style.top = Math.floor(Math.random() * maxY) + "px";
}

function hitTarget() {
    sessionScore += 25;
    rogobux += 25;
    document.getElementById("sessionScore").innerText = sessionScore;
    document.getElementById("rogobux-display").innerText = `R$ ${rogobux}`;
    moveBlock();
}

document.addEventListener("DOMContentLoaded", () => {
    renderGames();
    initAvatarSwatches();
});
