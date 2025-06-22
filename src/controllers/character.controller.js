import { findAllCharacters, findCharacterById, createNewCharacter, updateCharacterById, deleteCharacterById } from "../services/character.service.js";

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

export async function updateCharacter(req, res) {
  const id = parseInt(req.params.id);
  const data = req.body;

  try {
    const updated = await updateCharacterById(id, data);
    if (!updated) return res.status(404).json({ error: "Personagem não encontrado" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar personagem" });
  }
}

export async function deleteCharacter(req, res) {
  const id = parseInt(req.params.id);

  try {
    await deleteCharacterById(id);
    res.json({ message: "Personagem removido com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao remover personagem" });
  }
}