import { Button, Box, TextField, Typography, Grid } from "@mui/material";
import { useState } from "react";

const mqtt = require("mqtt");

function Subscriber() {
  const [subscribers, addSubscriber] = useState([]);
  const [topic, setTopic] = useState("");
  const [id, setId] = useState("");

  let clientIds = [];
  subscribers.map((client) => clientIds.push(client.options.clientId));

  function startSubscriber(event) {
    event.preventDefault();

    if (clientIds.indexOf("mqttjs_" + id) === -1) {
      const client = mqtt.connect("mqtt://localhost", {
        port: 8888,
        clean: false,
        clientId: "mqttjs_" + id,
      });

      let output = [""];

      client.on("connect", () => {
        client.subscribe(topic, { qos: 1 });
        addSubscriber([...subscribers, client]);
      });

      client.on("message", (topic, message) => {
        output.push(message);

        if (document.getElementById(client.options.clientId))
          document.getElementById(client.options.clientId).value = output;
      });
    } else {
      console.log("Cant connect with same id");
    }
  }

  function disconnectSubscriber(item) {
    const copySubs = [...subscribers];
    const index = copySubs.indexOf(item);

    if (index > -1) {
      copySubs.splice(index, 1);
      addSubscriber(copySubs);
    }
    item.end();
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
        <form onSubmit={startSubscriber}>
          <Grid container sx={{ display: "flex", alignItems: "center" }}>
            <Grid item xs={4}>
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
            <Grid item xs={4}>
              <Box>
                clientId
                <TextField
                  value={id}
                  required
                  onInput={(e) => setId(e.target.value)}
                  sx={{ padding: "1vw" }}
                />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Button type="submit" variant="contained" color="info">
                add subscriber
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
      {subscribers.map((item) => {
        return (
          <div
            key={JSON.stringify(item.options.clientId)}
            style={{
              boxShadow:
                "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
              padding: "1vw",
              textAlign: "center",
              margin: "1vw",
            }}
          >
            <Grid container sx={{ display: "flex", textAlign: "center" }}>
              <Grid item xs={9}>
                <Box>
                  <Typography>
                    <span style={{ fontWeight: "700" }}>
                      {JSON.stringify(item.options.clientId)}{" "}
                    </span>
                    subscribed and started listening with
                    <span style={{ fontWeight: "700" }}>
                      {" "}
                      QoS{" "}
                      {
                        item._resubscribeTopics[
                          Object.keys(item._resubscribeTopics)[0]
                        ].qos
                      }{" "}
                    </span>{" "}
                    and topic{" "}
                    <span style={{ fontWeight: "700" }}>
                      {Object.keys(item._resubscribeTopics)[0]}{" "}
                    </span>
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Button
                  variant="contained"
                  color="info"
                  onClick={() => disconnectSubscriber(item)}
                >
                  Disconnect
                </Button>
              </Grid>
            </Grid>
            <Box sx={{ textAlign: "left" }}>
              <textarea
                name="result"
                cols="70"
                rows="5"
                id={item.options.clientId}
                defaultValue=""
              ></textarea>
            </Box>
          </div>
        );
      })}
    </Box>
  );
}

export default Subscriber;
