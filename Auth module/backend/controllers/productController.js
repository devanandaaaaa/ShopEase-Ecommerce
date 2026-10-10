import Product from '../models/Product.js';

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({})
      .sort({ createdAt: -1 });

      const formattedProducts = products.map((product) => ({
        id: product._id.toString(),
        name: product.name,
        category: product.category,
        price: product.price,
        image: product.image,
        rating: product.rating ?? 0,
        stock: product.stock ?? true,
      }));

    res.status(200).json(formattedProducts);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to get products',
      error: error.message,
    });
  }
};

export {
  getProducts,
};