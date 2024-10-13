import ProductModel, { ProductSequelizeModel } from '../database/models/product.model'; // Importa o modelo de produto do banco de dados
import { Product } from '../types/Product'; // Importa o tipo de produto

// Função assíncrona para criar um novo produto
const createProduct = async (product: Product): Promise<Product> => {
  await ProductModel.create(product); // Cria um novo registro de produto no banco de dados
  const nextID = await ProductModel.count(); // Obtém o próximo ID disponível
  // Retorna o produto criado com o próximo ID disponível
  return {
    id: nextID,
    name: product.name,
    price: product.price,
    userId: product.userId,
  };
};

// Função assíncrona para obter todos os produtos
const getAllProducts = async (): Promise<Product[]> => {
  const products = await ProductModel.findAll(); // Busca todos os produtos no banco de dados
  console.log(products); // Exibe os produtos no console (para fins de depuração)
  // Mapeia os produtos para extrair apenas os dados relevantes e os retorna
  const results: Product[] = products.map((product: ProductSequelizeModel) => product.dataValues);
  return results;
};

// Exporta as funções para criar um novo produto e obter todos os produtos
export default { createProduct, getAllProducts };
