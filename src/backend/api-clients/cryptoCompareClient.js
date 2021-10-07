const axios = require("axios");

const getCryptoPrice = async (crypto, currency) => {
  const response = await axios.get(
    `https://min-api.cryptocompare.com/data/price?fsym=${crypto}&tsyms=${currency}}`
  );
  return response.data;
};

module.exports = getCryptoPrice;
