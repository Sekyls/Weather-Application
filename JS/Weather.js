document.addEventListener("DOMContentLoaded", function () {
  // Wait for the DOM to load
  // Initialize variables
  const apiKey = "b73d43f0ed85554cbcabe9337991c501"; // OpenWeatherMap API key
  const searchButton = document.querySelector(".btn-light"); // Search button
  const searchInput = document.getElementById("location"); // Search input field

  function getWeather(city) {
    // Fetch weather data for the specified city
    validateCity(city).then((validCity) => {
      // Validate the city name
      // Check if the city name is valid
      if (validCity) {
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${validCity}&appid=${apiKey}&units=metric`
        )
          .then((response) => response.json()) // Parse the response as JSON
          .then((data) => updateWeatherUI(data)) // Update the UI with the weather data
          .catch((error) => {
            console.error("Error fetching weather data:", error);
            alert("An error occurred! Reverting to Accra."); // Show an error message
            // If the city is not found, revert to Accra
            getWeather("Accra"); // Fetch weather data for Accra
          });
      } else {
        // If the city name is invalid
        // Show an error message and revert to Accra
        alert(
          "Invalid location! Please enter a valid city name. Reverting to Accra."
        );
        getWeather("Accra"); // Fetch weather data for Accra
      }
    });
  }

  async function validateCity(city) {
    // Fetch city data from OpenWeatherMap API
    try {
      // fetch the city data from OpenWeatherMap API
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
      );
      const data = await response.json(); // Parse the response as JSON

      if (
        data.length > 0 && // Check if the data array is not empty
        data[0].name.toLowerCase() === city.toLowerCase() // Check if the city name matches the input (case-insensitive)
      ) {
        return data[0].name; // Return the valid city name
      } else {
        // If the city name is invalid
        return null; // Return null to indicate invalid city name
      }
    } catch (error) {
      // Handle any errors that occur during the fetch
      // Log the error to the console
      console.error("Error validating city:", error);
      return null;
    }
  }

  function updateWeatherUI(data) {
    // Update the UI elements with the weather data
    document.getElementById("city").innerText = data.name; // Set the city name
    document.getElementById("temperature").innerText =
      Math.round(data.main.temp) + "°C"; // Set the temperature
    document.getElementById("weather-condition").innerText =
      data.weather[0].description; // Set the weather condition
    document.getElementById("precipitation").innerText =
      data.clouds.all + "% \nPrecipitation"; // Set the precipitation
    document.getElementById("humidity").innerText =
      data.main.humidity + "% \nHumidity"; // Set the humidity
    document.getElementById("wind-speed").innerText =
      data.wind.speed + " km/h \nWind Speed"; // Set the wind speed

    let now = new Date(); // Get the current date and time
    document.getElementById("date").innerText = now.toDateString(); // Set the date
  }

  searchButton.addEventListener("click", () => {
    // Handle search button click
    // Get the value from the search input field
    let city = searchInput.value.trim(); // Trim any whitespace from the input
    // Check if the input is not empty
    if (city)
      getWeather(city); // If not empty, fetch the weather data for the city
    // If the input is empty, show an alert message
    else alert("Please enter a city name!"); // Show an alert message
  });

  searchInput.addEventListener("keypress", (event) => {
    // Handle keypress event
    // Check if the pressed key is "Enter"
    if (event.key === "Enter") {
      // If "Enter" key is pressed
      // Get the value from the search input field
      let city = searchInput.value.trim(); // Trim any whitespace from the input
      // Check if the input is not empty
      if (city)
        getWeather(city); // If not empty, fetch the weather data for the city
      // If the input is empty, show an alert message
      else alert("Please enter a city name!"); // Show an alert message
    }
  });

  getWeather("Accra");
  // Fetch weather data for Accra by default
});
