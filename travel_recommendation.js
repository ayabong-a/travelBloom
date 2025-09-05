async function searchDestinations() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const resultsSection = document.getElementById("results");

  // Fetch JSON data
  const response = await fetch("travel_recommendation_api.json");
  const data = await response.json();

  let results = [];

  if (query.includes("beach") || query.includes("beaches")) {
    results = data.beaches;
  } else if (query.includes("temple") || query.includes("temples")) {
    results = data.temples;
  } else if (query.includes("country")) {
    const randomIndex = Math.floor(Math.random() * data.countries.length);
    const randomCountry = data.countries[randomIndex];

    results = randomCountry.cities.slice(0, 2);
  }

  resultsSection.innerHTML = "";

  if (results.length === 0) {
    resultsSection.innerHTML =
      "<p>No results found. Try a country, city, temple, or beach.</p>";
    return;
  }

  // Add heading above results based on query
  let headingText = "";
  if (query.includes("beach") || query.includes("beaches"))
    headingText = "Recommended Beaches";
  else if (query.includes("temple") || query.includes("temples"))
    headingText = "Recommended Temples";
  else headingText = "Recommended Cities";

  const heading = document.createElement("h2");
  heading.textContent = headingText;
  heading.style.marginBottom = "1rem";
  resultsSection.appendChild(heading);

  results.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card";

    const countryName = item.country || "";

    card.innerHTML = `
        <img src="${item.imageUrl}" alt="${item.name}">
        <div class="card-content">
          <h3>${item.name}</h3>
          ${countryName ? `<h4>${countryName}</h4>` : ""}
          <p>${item.description}</p>
          <button class="visit-btn" onclick="visitDestination('${
            item.name
          }')">Visit</button>
        </div>
      `;
    resultsSection.appendChild(card);
  });
}

// Clear results
function clearResults() {
  document.getElementById("searchInput").value = "";
  const resultsSection = document.getElementById("results");
  resultsSection.innerHTML = "";
}

function visitDestination(name) {
  alert(`Enjoy your virtual visit to ${name}! 🌍✈️`);
}
