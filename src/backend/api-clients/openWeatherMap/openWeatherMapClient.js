const axios = require("axios");
const config = require("./config.js");

const getWeather = async (city) => {
  const response = await axios.get(
    `${config.URL}${city}&appid=${config.API_KEY}`
  );
  return response.data;
};

module.exports = getWeather;
