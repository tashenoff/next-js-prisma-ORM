import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getServerSideProps() {
  const products = await prisma.product.findMany({
    include: { category: true },
  });
  return {
    props: {
      products,
    },
  };
}

export default function Home({ products }) {
  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <p>{product.sku}</p>
            <p>{product.categoryId}</p>
            <img src={product.image} alt={product.name} />
          </li>
        ))}
      </ul>
    </div>
  );
}
