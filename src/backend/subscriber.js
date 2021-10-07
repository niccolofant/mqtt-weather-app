const startSubscriber = (qos, topic, cleansession, id) => {
  const mqtt = require("mqtt");

  const client = mqtt.connect("mqtt://localhost", {
    port: 1883,
    clean: cleansession,
    clientId: "mqttjs_" + id,
  });

  client.on("connect", () => {
    client.subscribe(topic, { qos: qos });
  });

  client.on("message", (topic, message) => {
    context = message.toString();
    console.log(context);
  });
};

startSubscriber(1, "Belluno", false, "1");

exports.startSubscriber = startSubscriber;
