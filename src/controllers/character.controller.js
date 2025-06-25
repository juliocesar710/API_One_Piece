import {
  findAllCharacters,
  findCharacterById,
  createNewCharacter,
  updateCharacterById,
  deleteCharacterById,
  findCharactersByName,
  findCharactersByFilters,
} from "../services/character.service.js";

export async function getAllCharacters(req, res) {
  try {
    const characters = await findAllCharacters();

    // Converte BigInt para Number
    const parsedCharacters = characters.map((char) => ({
      ...char,
      bounty: char.bounty !== null ? Number(char.bounty) : null,
    }));

    res.json(parsedCharacters);
  } catch (error) {
    console.error("Erro ao buscar personagens:", error);
    res.status(500).json({ error: "Erro ao buscar personagens" });
  }
}

export async function getCharacterById(req, res) {
  const { id } = req.params;
  try {
    const character = await findCharacterById(parseInt(id));

    if (!character) return res.status(404).json({ error: "Não encontrado" });

    // Converte o BigInt
    const parsedCharacter = {
      ...character,
      bounty: character.bounty !== null ? Number(character.bounty) : null,
    };

    res.json(parsedCharacter);
  } catch {
    res.status(500).json({ error: "Erro ao buscar personagem" });
  }
}


export async function searchCharacterByName(req, res) {
  const name = req.query.name;

  if (!name) {
    return res.status(400).json({ error: "Nome não informado" });
  }

  try {
    const results = await findCharactersByName(name);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: "Erro na busca por nome" });
  }
}

export async function searchCharacters(req, res) {
  const { name, crew, minBounty, maxBounty, origin, fruit, role, status } =
    req.query;

  try {
    // Se nenhum parâmetro foi fornecido
    if (
      !name &&
      !crew &&
      !minBounty &&
      !maxBounty &&
      !origin &&
      !fruit &&
      !role &&
      !status
    ) {
      return res.status(400).json({
        error: "Pelo menos um parâmetro de busca deve ser fornecido",
        availableFilters: [
          "name",
          "crew",
          "minBounty",
          "maxBounty",
          "origin",
          "fruit",
          "role",
          "status",
        ],
      });
    }

    const results = await findCharactersByFilters({
      name,
      crew,
      minBounty: minBounty ? BigInt(minBounty) : undefined,
      maxBounty: maxBounty ? BigInt(maxBounty) : undefined,
      origin,
      fruit,
      role,
      status,
    });

    const parsedResults = results.map((char) => ({
      ...char,
      bounty: char.bounty !== null ? Number(char.bounty) : null,
    }));

    res.json(parsedResults);
  } catch (error) {
    console.error("Erro na busca de personagens:", error);
    res.status(500).json({ error: "Erro na busca de personagens" });
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
    if (!updated)
      return res.status(404).json({ error: "Personagem não encontrado" });
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
