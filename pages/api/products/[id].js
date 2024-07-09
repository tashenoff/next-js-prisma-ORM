import prisma from '../../../prisma/client';

export default async function handler(req, res) {
  const productId = req.query.id;

  if (req.method === 'PUT') {
    const { name, price, description, inStock } = req.body;

    try {
      const updatedProduct = await prisma.product.update({
        where: { id: parseInt(productId) },
        data: {
          name,
          price: parseFloat(price),
          description,
          inStock,
        },
      });

      res.status(200).json(updatedProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error updating product' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const deletedProduct = await prisma.product.delete({
        where: { id: parseInt(productId) },
      });

      res.status(200).json(deletedProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error deleting product' });
    }
  } else {
    res.setHeader('Allow', ['PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
