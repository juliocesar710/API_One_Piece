import { PrismaClient } from "@prisma/client";
import fs from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  const filePath = path.resolve("prisma", "characters.json");
  const data = await fs.readFile(filePath, "utf-8");
  const characters = JSON.parse(data);

  await prisma.character.createMany({
    data: characters,
    skipDuplicates: true, // ignora se já existir
  });

  console.log("🌟 Banco populado com personagens iniciais!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
