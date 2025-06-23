import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.character.deleteMany({})
  console.log('Todos os personagens foram removidos!')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())