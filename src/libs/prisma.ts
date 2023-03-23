import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export { prisma };

export default {
  async start() {
    await prisma.$connect();
  },
  async stop() {
    await prisma.$disconnect();
  }
};
