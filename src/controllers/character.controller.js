import { findAllCharacters, findCharacterById, createNewCharacter } from "../services/character.service.js";

export async function getAllCharacters(req, res) {
  try {
    const characters = await findAllCharacters();
    res.json(characters);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar personagens" });
  }
}

export async function getCharacterById(req, res) {
  const { id } = req.params;
  try {
    const character = await findCharacterById(parseInt(id));
    if (!character) return res.status(404).json({ error: "Não encontrado" });
    res.json(character);
  } catch {
    res.status(500).json({ error: "Erro ao buscar personagem" });
  }
}

export async function createCharacter(req, res) {
  const { name, bounty, crew } = req.body;
  try {
    const newChar = await createNewCharacter({ name, bounty, crew });
    res.status(201).json(newChar);
  } catch (e) {
    res.status(500).json({ error: "Erro ao criar personagem" });
    console.error(e);
  }
}