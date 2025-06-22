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