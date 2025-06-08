const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/ai", require("./routes/ai"));
app.use("/api/characters", require("./routes/characters"));
app.use("/api/venue", require("./routes/venue"));

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
