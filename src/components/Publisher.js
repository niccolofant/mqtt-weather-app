import { Button, Box, TextField, Typography, Grid } from "@mui/material";
import { useState } from "react";

const mqtt = require("mqtt");
const getWeather = require("../backend/api-clients/openWeatherMap/openWeatherMapClient");

function Publisher() {
  const [publishers, addPublisher] = useState([]);
  const [topic, setTopic] = useState("");

  function startPublisher(event) {
    event.preventDefault();

    const client = mqtt.connect("mqtt://localhost", {
      port: 8888,
      clean: false,
      clientId: "mqttjs_" + Math.random().toString(16).substr(2, 8),
    });

    client.on("connect", () => {
      console.log("Publisher connected");
      console.log(publishers);
      addPublisher([...publishers, { topic: topic, client: client }]);

      setInterval(() => {
        var weatherPromise = Promise.resolve(getWeather(topic));
        weatherPromise.then((data) => {
          client.publish(topic, JSON.stringify(data), {
            qos: 1,
          });
        });
      }, 2500);
    });
  }

  function disconnectPublisher(item) {
    const copyPubs = [...publishers];
    const index = copyPubs.indexOf(item);

    if (index > -1) {
      copyPubs.splice(index, 1);
      addPublisher(copyPubs);
    }
    item.client.end();
  }

  return (
    <Box>
      <Box
        sx={{
          boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
          padding: "1vw",
          textAlign: "center",
          margin: "1vw",
          fontFamily: "Nunito Sans",
        }}
      >
        <form onSubmit={startPublisher}>
          <Grid container sx={{ display: "flex", alignItems: "center" }}>
            <Grid item xs={6}>
              <Box>
                Topic (città)
                <TextField
                  value={topic}
                  required
                  onInput={(e) => setTopic(e.target.value)}
                  sx={{ padding: "1vw" }}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Button type="submit" variant="contained" color="info">
                add publisher
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
      {publishers.map((item) => {
        return (
          <div key={JSON.stringify(item.client.options.clientId)}>
            <Box
              sx={{
                boxShadow:
                  "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
                padding: "1vw",
                textAlign: "center",
                margin: "1vw",
              }}
            >
              <Typography>
                <span style={{ fontWeight: "700" }}>
                  {JSON.stringify(item.client.options.clientId)}{" "}
                </span>
                started publishing with
                <span style={{ fontWeight: "700" }}> QoS 1 </span> and topic{" "}
                <span style={{ fontWeight: "700" }}>{item.topic} </span>
              </Typography>
              <Button
                variant="contained"
                color="info"
                onClick={() => disconnectPublisher(item)}
              >
                Disconnect
              </Button>
            </Box>
          </div>
        );
      })}
    </Box>
  );
}

export default Publisher;
