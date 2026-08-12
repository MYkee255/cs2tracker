// --- MAP LISTA ---
const maps = [
    "Ancient",
    "Anubis",
    "Cache",
    "Dust II",
    "Inferno",
    "Mirage",
    "Nuke"
];

// --- MAP SELECT FELTÖLTÉSE ---
const mapSelect = document.getElementById("mapSelect");
maps.forEach(map => {
    const option = document.createElement("option");
    option.value = map;
    option.textContent = map;
    mapSelect.appendChild(option);
});

// --- MECCS MENTÉSE ---
document.getElementById("saveBtn").addEventListener("click", () => {
    const result = document.getElementById("resultSelect").value;
    const kills = parseInt(document.getElementById("killsInput").value) || 0;
    const deaths = parseInt(document.getElementById("deathsInput").value) || 0;
    const assists = parseInt(document.getElementById("assistsInput").value) || 0;
    const selectedMap = document.getElementById("mapSelect").value;

    const matchData = {
        result,
        kills,
        deaths,
        assists,
        map: selectedMap,
        date: new Date().toISOString()
    };

    let matches = JSON.parse(localStorage.getItem("matches")) || [];
    matches.push(matchData);
    localStorage.setItem("matches", JSON.stringify(matches));

    loadMatches();
});

// --- MECCSEK LISTÁZÁSA ---
function loadMatches() {
    const list = document.getElementById("matchList");
    list.innerHTML = "";

    let matches = JSON.parse(localStorage.getItem("matches")) || [];

    matches.forEach(match => {
        const li = document.createElement("li");

        // Színkódolás
        if (match.result === "win") li.classList.add("match-good");
        if (match.result === "draw") li.classList.add("match-medium");
        if (match.result === "lose") li.classList.add("match-bad");

        li.innerHTML = `
            <strong>${match.result.toUpperCase()}</strong>
            | Map: ${match.map}
            | K/D/A: ${match.kills}/${match.deaths}/${match.assists}
            <br>
            <small>${new Date(match.date).toLocaleString()}</small>
        `;

        list.appendChild(li);
    });
}

// --- OLDAL BETÖLTÉSE ---
loadMatches();
