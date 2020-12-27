const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(morgan("tiny"));
app.use(cors());

const bugs = [
  { id: 1, description: "Bug 1", userId: 1, resolved: true },
  { id: 2, description: "Bug 2", resolved: false },
  { id: 3, description: "Bug 3", resolved: false },
  { id: 4, description: "Bug 4", resolved: false },
  { id: 5, description: "Bug 5", resolved: false },
];

app.get("/api/bugs", (req, res) => {
  res.status(200).send(bugs);
});

const port = 5001;
app.listen(port, () => console.log(`app is listening on port: ${port}`));
