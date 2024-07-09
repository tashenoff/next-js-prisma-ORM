// Import required modules using require syntax
const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Initialize Prisma client
const prisma = new PrismaClient();

async function main() {
  await prisma.$connect();

  try {
    // Adding logic to seed data
    const category = await prisma.category.create({
      data: {
        name: 'Test Category',
      },
    });

    const product = await prisma.product.create({
      data: {
        name: 'Test Product',
        slug: 'test-product',
        price: 99.99,
        sku: 'TP001',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcud26tFzQRho7uUQ76zK7aKoaDIyUdpxsKQ&s',
        description: 'This is a test product',
        inStock: true,
        categoryId: category.id,
      },
    });

    console.log('Seed data added:', { category, product });
  } catch (error) {
    console.error('Error adding seed data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
