// Function to fetch word data
async function searchWord() {
  const word = document.getElementById("wordInput").value.trim();
  const resultDiv = document.getElementById("result");

  if (!word) {
    resultDiv.innerHTML = "<p>Please enter a word!</p>";
    return;
  }

  resultDiv.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (!response.ok) throw new Error("Word not found");
    const data = await response.json();

    // Extract information safely
    const meaningData = data[0].meanings[0];
    const definition = meaningData.definitions[0].definition;
    const partOfSpeech = meaningData.partOfSpeech;
    const example = meaningData.definitions[0].example || "No example available.";
    const audioObj = data[0].phonetics.find(p => p.audio);
    const audio = audioObj ? audioObj.audio : null;

    // Display results
    resultDiv.innerHTML = `
      <div class="word">
        <h2>${word}</h2>
        ${audio ? `<audio controls src="${audio}"></audio>` : ""}
      </div>
      <p class="details">${partOfSpeech}</p>
      <p class="meaning"><strong>Definition:</strong> ${definition}</p>
      <p class="example"><strong>Example:</strong> ${example}</p>
    `;
  } catch (error) {
    resultDiv.innerHTML = "<p>❌ Sorry, no results found.</p>";
  }
}

// Trigger search on button click
document.getElementById("searchBtn").addEventListener("click", searchWord);

// Trigger search when pressing Enter
document.getElementById("wordInput").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    searchWord();
  }
});