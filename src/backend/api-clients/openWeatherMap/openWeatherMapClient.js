const axios = require("axios");
const config = require("./config.js");

/**
 * Funzione asincrona per inviare richieste HTTP all'API OpenWeatherMap e ricevere risposte JSON
 * @param city
 * @returns informazioni meteorologiche riguardanti la `city`
 */
const getWeather = async (city) => {
  const response = await axios.get(
    `${config.URL}${city}&units=metric&appid=${config.API_KEY}`
  );
  return response.data;
};

module.exports = getWeather;
