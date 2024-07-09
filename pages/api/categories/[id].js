import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const categoryId = req.query.id;

  if (req.method === 'DELETE') {
    try {
      await prisma.category.delete({
        where: { id: parseInt(categoryId) },
      });
      res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error deleting category' });
    }
  } else {
    res.status(405).end();
  }
}
