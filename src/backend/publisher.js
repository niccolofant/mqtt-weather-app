const startPublisher = (qos, venetoCities, cleansession) => {
  const mqtt = require("mqtt");

  const getWeather = require("./api-clients/openWeatherMap/openWeatherMapClient");

  const client = mqtt.connect("mqtt://localhost", {
    port: 1883,
    clean: cleansession,
    clientId: "mqttjs_" + Math.random().toString(16).substr(2, 8),
  });

  client.on("connect", () => {
    console.log("connected");
    let i = 0;
    setInterval(() => {
      venetoCities.map((city) => {
        var weatherPromise = Promise.resolve(getWeather(city));
        weatherPromise.then((data) => {
          var object = data.coord;
          client.publish(city, i + " " + JSON.stringify(object), {
            qos: qos,
          });
        });
      });
      i++;
    }, 2500);
  });
};

const venetoCities = [
  "Belluno",
  "Padova",
  "Rovigo",
  "Venezia",
  "Vicenza",
  "Verona",
  "Treviso",
];

startPublisher(1, venetoCities, false);

exports.startPublisher = startPublisher;
