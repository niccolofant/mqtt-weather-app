import Publisher from "./components/Publisher";
import Subscriber from "./components/Subscriber";
import { Grid, Alert } from "@mui/material";
import { useState } from "react";

const socket = new WebSocket("ws://localhost:8888");

function App() {
  const [connected, setConnected] = useState(false);

  socket.onopen = function () {
    setConnected(true);
  };
  socket.onerror = function () {
    setConnected(false);
  };

  return (
    <div className="App" style={{ padding: "1vw", fontFamily: "Nunito Sans" }}>
      <Grid container sx={{ dipslay: "flex", alignItems: "center" }}>
        <Grid item xs={9} sx={{ padding: " 1vw 0 0 3vw" }}>
          <h2 style={{ textAlign: "left", fontFamily: "Nunito Sans" }}>
            MQTT Store and Forward system
          </h2>
        </Grid>
        <Grid item xs={3} sx={{ padding: " 1vw 3vw 0 0" }}>
          {connected ? (
            <Alert severity="success">MQTT Broker connected</Alert>
          ) : (
            <Alert severity="error">MQTT Broker disconnected</Alert>
          )}
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={5} sx={{ padding: "2vw" }}>
          <Publisher />
        </Grid>
        <Grid item xs={7} sx={{ padding: "2vw" }}>
          <Subscriber />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
