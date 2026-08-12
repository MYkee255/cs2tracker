// -----------------------------
// CS2 MATCH TRACKER
// -----------------------------

// HTML elemek
const resultInput = document.getElementById("result");
const killsInput = document.getElementById("kills");
const deathsInput = document.getElementById("deaths");
const assistsInput = document.getElementById("assists");
const timeInput = document.getElementById("match-time");
const saveMatchBtn = document.getElementById("save-match");
const matchList = document.getElementById("match-list");

// Betöltés localStorage-ből
let matches = JSON.parse(localStorage.getItem("cs2matches")) || [];

// Meccsek kirajzolása
function renderMatches() {
  matchList.innerHTML = "";

  matches.forEach((match, index) => {
    const li = document.createElement("li");

    // KD számítás
    const kd = match.kills / (match.deaths || 1);

    // Színezés
    let qualityClass = "";
    if (match.result === "win") {
      qualityClass = "match-good";
    } else if (match.result === "draw") {
      qualityClass = "match-medium";
    } else {
      qualityClass = "match-bad"; // lose mindig piros
    }

    li.classList.add(qualityClass);

    // Meccs szöveg
    li.textContent = `${match.time} | ${match.result.toUpperCase()} | K:${match.kills} D:${match.deaths} A:${match.assists} | K/D: ${kd.toFixed(2)}`;

    // Törlés gomb
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Törlés";
    deleteBtn.style.marginLeft = "10px";
    deleteBtn.style.padding = "3px 6px";
    deleteBtn.style.cursor = "pointer";

    deleteBtn.addEventListener("click", () => {
      matches.splice(index, 1); // törlés
      localStorage.setItem("cs2matches", JSON.stringify(matches));
      renderMatches(); // újrarajzolás
    });

    li.appendChild(deleteBtn);
    matchList.appendChild(li);
  });
}

// Meccs mentése
saveMatchBtn.addEventListener("click", () => {
  const match = {
    result: resultInput.value,
    kills: Number(killsInput.value),
    deaths: Number(deathsInput.value),
    assists: Number(assistsInput.value),
    time: timeInput.value
  };

  matches.push(match);
  localStorage.setItem("cs2matches", JSON.stringify(matches));
  renderMatches();

  killsInput.value = "";
  deathsInput.value = "";
  assistsInput.value = "";
  timeInput.value = "";
});

// Első kirajzolás
renderMatches();
