const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const noteRoutes = require("./routes/noteRoutes");

const app = express();

app.use(cors()); // Biar frontend bisa ngobrol sama backend
app.use(express.json()); // Biar bisa baca data JSON

require("./schema/Note"); // Generate Tabel otomatis
app.use("/api/v1/notes", noteRoutes);

const port = process.env.PORT || 3000;
sequelize.sync().then(() => {
  console.log("Database nyambung bro!");
  app.listen(port, () => console.log(`Server jalan di http://localhost:${port}`));
});