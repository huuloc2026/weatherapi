require("dotenv").config();
const API_KEY = process.env.API_KEY;
const result = async (location) => {
  api = `https://api.weatherstack.com/current?access_key=${API_KEY}&query=${location}`;
  try {
    const res = await fetch(api);
    const data = await res.json();
    const weather = {
      region: data.location.region,
      country: data.location.country,
      temperature: data.current.temperature,
      observation_time: data.current.weather_code,
      wind_speed: data.current.wind_speed,
      pressure: data.current.pressure,
    };
    return weather;
  } catch (error) {
    console.error(error);
  }
};

// result("Japan");

const express = require("express");
const path = require("path");
const pathPublic = path.join(__dirname, "/public");
const app = express();
const port = 3001;

app.set("view engine", "hbs");

app.use(express.static(pathPublic));

app.get("/", async (req, res) => {
  const city = req.query.city;
  const data = await result(city);
  console.log(data);
  res.render("weather.hbs", { WeatherData: data });
});

app.listen(port, () => {
  console.log(`Listining on port ${port}`);
});
