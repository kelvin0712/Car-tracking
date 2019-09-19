const { searchByName, searchByVehicle } = require("./dal");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/drivers/:name", async (req, res, next) => {
  try {
    res.json(await searchByName(req.params.name));
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.get("/vehicles/:id", async (req, res, next) => {
  try {
    res.json(await searchByVehicle(req.params.id));
  } catch (error) {
    res.json({ error: error.message });
  }
});

const PORT = 8080;
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
