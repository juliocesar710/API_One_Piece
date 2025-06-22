import express from "express";
import characterRoutes from "./routes/character.routes.js";

const app = express();
app.use(express.json());

app.use("/characters", characterRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
