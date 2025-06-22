import prisma from "../prisma.js";

export async function findAllCharacters() {
  return await prisma.character.findMany();
}

export async function findCharacterById(id) {
  return await prisma.character.findUnique({ where: { id } });
}

export async function createNewCharacter(data) {
  return await prisma.character.create({ data });
}

export async function updateCharacterById(id, data) {
  return await prisma.character.update({
    where: { id },
    data,
  });
}

export async function deleteCharacterById(id) {
  return await prisma.character.delete({ where: { id } });
}