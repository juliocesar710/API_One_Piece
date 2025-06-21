import express from "express";
import prisma from "./prisma.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "OnePiece API está viva!",
  });
}
);

app.get("characters", async (req, res) => {
  try {
    const characters = await prisma.character.findMany();
    res.json(characters);
  } catch (error) {
    console.error("Erro ao buscar personagens:", error);
    res.status(500).json({ error: "Erro ao buscar personagens" });
  }
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});