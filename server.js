const { searchByName } = require("./dal");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.get("/:query", async (req, res, next) => {
  try {
    res.json(await searchByName(req.params.query));
  } catch (error) {
    res.json({ error: error.message });
  }
});

const PORT = 8080;
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
