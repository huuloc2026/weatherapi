const result = async (location) => {
  api = `https://api.weatherstack.com/current?access_key=a6200b91e2e0eb885841353f45f4bdbe&query=${location}`;
  try {
    const res = await fetch(api);
    const data = await res.json();
    if (!res.success) {
      const weather = {
        region: data.location.region,
        country: data.location.country,
        temperature: data.current.temperature,
        observation_time: data.current.weather_code,
        wind_speed: data.current.wind_speed,
        pressure: data.current.pressure,
      };
      console.log(weather);
    }
  } catch (error) {
    console.error(error);
  }
};

// result("Japan");

const express = require("express");
const app = express();
const port = 3000;

app.get("/", () => {
  console.log("Hello World");
});

app.listen(port, () => {
  console.log(`Listining on port ${port}`);
});
