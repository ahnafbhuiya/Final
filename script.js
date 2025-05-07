function start() {
    const searchItem = document.querySelector("#searchInput").value.trim();
    const url = `https://restcountries.com/v3.1/name/${searchItem}`;

    fetch(url)
        .then(res => res.json())
        .then(data => newprocess(data))
        .catch(err => {
            console.error('Error:', err);
            document.querySelector("#countryContainer").innerHTML = `<p style="color:red;">Country not found.</p>`;
        });
}

function newprocess(data) {
    const old = document.querySelector("#countryContainer");
    old.textContent = "";

    for (let i = 0; i < data.length; i++) {
        const country = data[i];

        const newDiv = document.createElement("div");
        newDiv.classList.add("country-card");

        newDiv.innerHTML = `
            <img src="${country.flags.png}" alt="Flag of ${country.name.common}">
            <h2>${country.name.common}</h2>
            <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <button class="more-btn">More Details</button>
            <div class="more-info" style="display:none; margin-top:1rem;">
                <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                <p><strong>Area:</strong> ${country.area} km²</p>
                <p><strong>Languages:</strong> ${country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>
                <p><strong>Currency:</strong> ${country.currencies ? Object.values(country.currencies).map(c => c.name).join(', ') : 'N/A'}</p>
                <p><strong>Timezone(s):</strong> ${country.timezones.join(', ')}</p>
            </div>
        `;

        const moreBtn = newDiv.querySelector(".more-btn");
        const moreInfo = newDiv.querySelector(".more-info");

        moreBtn.addEventListener("click", () => {
            moreInfo.style.display = moreInfo.style.display === "none" ? "block" : "none";
        });

        old.appendChild(newDiv);
    }
}

// Search button click
document.querySelector("#searchBtn").addEventListener("click", start);

// Search on Enter key press
document.querySelector("#searchInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        start();
    }
});