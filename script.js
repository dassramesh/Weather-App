
const searchInput = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

function checkWeather() {
    alert("Weather service is temporarily unavailable.");
}

searchBtn.addEventListener("click", checkWeather);

searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        checkWeather();
    }
});
