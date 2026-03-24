const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const noteRoutes = require("./routes/noteRoutes");

const app = express();

app.use(cors());
app.use(express.json());

require("./schema/Note");
app.use("/api/v1/notes", noteRoutes);

const port = process.env.PORT || 5000;
sequelize.sync().then(() => {
  console.log("Database tersambung!");
  app.listen(port, () => console.log(`Server berjalan di http://localhost:${port}`));
});