import prisma from "../prisma.js";

export async function findAllCharacters() {
  return prisma.character.findMany({
    select: {
      id: true,
      name: true,
      imageUrl: true,
      bounty: true,
      crew: true,
    },
  });
}


export async function findCharacterById(id) {
  return await prisma.character.findUnique({ where: { id } });
}

export async function findCharactersByName(name) {
  return await prisma.character.findMany({
    where: {
      name: {
        contains: name,
        mode: "insensitive",
      },
    },
    select: {
      id: true,
      name: true,
      imageUrl: true,
      bounty: true,
      crew: true,
    },
  });
}

export async function findCharactersByFilters(filters) {
  const whereClause = {};

  // Montagem dinâmica da cláusula WHERE
  if (filters.name) {
    whereClause.name = {
      contains: filters.name,
      mode: 'insensitive'
    };
  }

  if (filters.crew) {
    whereClause.crew = {
      contains: filters.crew,
      mode: 'insensitive'
    };
  }

  if (filters.origin) {
    whereClause.origin = {
      contains: filters.origin,
      mode: 'insensitive'
    };
  }

  if (filters.fruit) {
    whereClause.fruit = {
      contains: filters.fruit,
      mode: 'insensitive'
    };
  }

  if (filters.role) {
    whereClause.role = {
      contains: filters.role,
      mode: 'insensitive'
    };
  }

  if (filters.status) {
    whereClause.status = {
      contains: filters.status,
      mode: 'insensitive'
    };
  }

  // Filtro de bounty (pode usar min, max ou ambos)
  if (filters.minBounty || filters.maxBounty) {
    whereClause.bounty = {};
    
    if (filters.minBounty) {
      whereClause.bounty.gte = filters.minBounty;
    }
    
    if (filters.maxBounty) {
      whereClause.bounty.lte = filters.maxBounty;
    }
  }

  return await prisma.character.findMany({
    where: whereClause,
    select: {
      id: true,
      name: true,
      imageUrl: true,
      bounty: true,
      crew: true,
      // Adicione outros campos se quiser retornar mais informações
    },
    // Opcional: adicionar ordenação padrão
    orderBy: {
      bounty: 'desc' // Ordena por recompensa (maior primeiro)
    }
  });
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

