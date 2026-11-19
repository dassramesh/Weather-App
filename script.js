const apiKey = "0c042d55908d00ab08d28dedaacafe52";
const searchInput = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".icon");
const weatherDiv = document.querySelector(".weather");

async function checkWeather(city) {
    if (!city) return;

    // Show loading state in the UI
    document.querySelector(".city").innerText = "Loading...";

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`
        );

        const data = await response.json();

        if (!response.ok) {
            // Handle the specific 401 error from your screenshot
            if (data.cod === "401") {
                throw new Error("Key pending activation. Try again in 30 mins!");
            }
            throw new Error(data.message);
        }

        // --- Update UI with fetched data ---
        document.querySelector(".city").innerText = "Weather in " + data.name;
        document.querySelector(".temp").innerText = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerText = data.main.humidity + "%";
        document.querySelector(".wind").innerText = data.wind.speed + " km/h";
        document.querySelector(".description").innerText = data.weather[0].description;

        // Use the high-resolution 4x icon
        const iconCode = data.weather[0].icon;
        weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        // Reset and trigger fade-in animation
        weatherDiv.classList.remove("fade-in");
        void weatherDiv.offsetWidth; 
        weatherDiv.classList.add("fade-in");

        // Change background theme
        updateBackground(data.weather[0].main);
        
        // Clear input for the next search
        searchInput.value = "";

    } catch (error) {
        document.querySelector(".city").innerText = "Error";
        alert(error.message);
    }
}

function updateBackground(condition) {
    const body = document.body;
    const gradients = {
        Clear: "linear-gradient(135deg, #fceabb, #f8b500)",
        Clouds: "linear-gradient(135deg, #bdc3c7, #2c3e50)",
        Rain: "linear-gradient(135deg, #4b6cb7, #182848)",
        Snow: "linear-gradient(135deg, #e6dada, #274046)",
        Mist: "linear-gradient(135deg, #606c88, #3f4c6b)",
        Haze: "linear-gradient(135deg, #8e9eab, #eef2f3)"
    };
    body.style.background = gradients[condition] || "linear-gradient(135deg, #1e3c72, #2a5298)";
}

searchBtn.addEventListener("click", () => checkWeather(searchInput.value));

searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") checkWeather(searchInput.value);
});