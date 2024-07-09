import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req, res) => {
  if (req.method === 'GET') {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } else if (req.method === 'POST') {
    const { name, slug, price, sku, image, description, inStock, categoryId } = req.body;
    const newProduct = await prisma.product.create({
      data: {
        name,
        slug,
        price,
        sku,
        image,
        description,
        inStock,
        categoryId,
      },
    });
    res.status(201).json(newProduct);
  } else {
    res.status(405).end();
  }
};
