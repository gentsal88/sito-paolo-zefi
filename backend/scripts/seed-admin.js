const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

async function seed() {
  const prisma = new PrismaClient();
  const password = process.env.ADMIN_PWD || 'Admin123!';
  const email = process.env.ADMIN_EMAIL || 'admin@example.com';
  const hash = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, password: hash, role: 'ADMIN' },
  });

  console.log(`Seeded admin user: ${email} (password: ${password})`);
  await prisma.$disconnect();
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
