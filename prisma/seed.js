import { PrismaClient } from "@prisma/client";
import fs from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  const dataDir = path.resolve("prisma", "data");
  const files = await fs.readdir(dataDir);

  for (const file of files) {
    if (file.endsWith(".json")) {
      const filePath = path.join(dataDir, file);
      const data = await fs.readFile(filePath, "utf-8");
      const characters = JSON.parse(data);

      await prisma.character.createMany({
        data: characters,
        skipDuplicates: true,
      });

      console.log(`✅ Populado: ${file}`);
    }
  }

  console.log("🌱 Todos os personagens foram adicionados ao banco!");
}

main()
  .catch((e) => {
    console.error("❌ Erro ao popular o banco:", e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
